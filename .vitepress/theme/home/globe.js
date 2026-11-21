// The globe on the first screen of the home page: one full-canvas fragment shader, no dependencies.
// The sphere is drawn in orthographic projection, so a point (lat, lon) maps to the screen with the same
// rotation matrix the shader gets. project() and pick() use it to place HTML labels and read coordinates.

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uRes;       // drawing buffer size
uniform vec2 uC;         // globe centre in buffer pixels, y down
uniform float uR;        // globe radius in buffer pixels
uniform float uPx;       // device pixel ratio
uniform mat3 uRot;       // object space -> view space
uniform vec3 uSun;       // direction to the sun, view space
uniform float uT;        // seconds
uniform float uRise;     // 0..1, how far the sunrise has come
uniform vec3 uMode;      // weights: track, gis, ai
uniform vec3 uLayers;    // switches: land, graticule, drawn shape
uniform sampler2D uLand; // equirectangular land mask
uniform float uHasLand;
uniform float uRows;     // rows of dots from pole to pole
uniform vec4 uEv[16];    // events: xyz direction, w start time
uniform vec4 uHot[6];    // hot spots: xyz direction, w strength
uniform vec4 uCur;       // pointer: xyz direction, w strength
uniform vec3 uPoly[6];   // drawn shape, vertices
uniform float uPolyP;    // 0..6 edges drawn, 6..7 fill
uniform float uPolySign;
uniform vec4 uRing;      // radius, minor ratio, roll, head angle
uniform float uLight;    // 0 on a dark page, 1 on a light one
out vec4 outColor;

const float PI = 3.14159265359;
const float TAU = 6.28318530718;
const vec3 PALE = vec3(1.0, 0.88, 0.66);
const vec3 AMBER = vec3(0.976, 0.565, 0.122);
const vec3 EMBER = vec3(0.78, 0.26, 0.04);
const vec3 HOTWHITE = vec3(1.0, 0.95, 0.86);

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float ang(vec3 a, vec3 b) {
  return acos(clamp(dot(a, b), -1.0, 1.0));
}

// angular distance from v to the great-circle arc a -> b
float arcDist(vec3 v, vec3 a, vec3 b) {
  vec3 n = normalize(cross(a, b));
  vec3 q = normalize(v - n * dot(v, n));
  float ab = ang(a, b);
  float aq = ang(a, q);
  float side = dot(cross(a, q), n);
  float t = side >= 0.0 ? aq / ab : -aq / ab;
  if (t >= 0.0 && t <= 1.0) return asin(clamp(abs(dot(v, n)), 0.0, 1.0));
  return min(ang(v, a), ang(v, b));
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 p = (frag - uC) / uR;
  p.y = -p.y;
  float d = length(p);
  vec2 dir = p / max(d, 1e-4);
  vec2 sd = normalize(uSun.xy);
  float az = dot(dir, sd);
  float lim = pow(clamp(0.5 + 0.5 * az, 0.0, 1.0), 2.4);

  // light around the disc: a thin bright layer, a halo, and the glare where the sun comes up
  float h = max(d - 1.0, 0.0);
  float gd = length(p - sd);
  float glare = exp(-gd * 10.0) * 1.5 + exp(-gd * 3.0) * 0.42;
  vec3 sky = PALE * exp(-h * 70.0) * (lim * 1.5 + 0.04)
           + AMBER * exp(-h * 11.0) * lim * 0.55
           + EMBER * exp(-h * 3.4) * lim * 0.15
           + mix(AMBER, HOTWHITE, 0.6) * glare;
  sky *= uRise;

  // a few faint stars
  vec2 cs = vec2(3.0 * uPx);
  vec2 sg = floor(frag / cs);
  float sh = hash21(sg);
  float star = step(0.9989, sh) * smoothstep(0.42, 0.05, length(fract(frag / cs) - 0.5));
  star *= 0.25 + 0.75 * hash21(sg + 9.1);
  star *= 0.75 + 0.25 * sin(uT * (0.6 + 2.0 * hash21(sg + 3.7)) + sh * 90.0);
  vec3 stars = vec3(0.8, 0.84, 0.95) * star * 0.5 * (1.0 - clamp(glare * 2.0, 0.0, 1.0)) * (1.0 - uLight);

  vec3 s = vec3(0.0);    // the surface and what is drawn on it
  vec3 rim = vec3(0.0);  // sunlight on the edge of the disc
  float disc = 0.0;

  // derivatives have to be taken outside the branch
  float z = sqrt(max(1.0 - d * d, 0.0));
  vec3 n = vec3(p, z);
  vec3 v = transpose(uRot) * n;
  float apx = max(length(fwidth(v)), 1e-5) * 0.75;   // radians per pixel

  if (d < 1.0) {
    float lat = asin(clamp(v.y, -1.0, 1.0));
    float lon = atan(v.x, v.z);
    float ndl = dot(n, uSun);
    float day = smoothstep(-0.1, 0.25, ndl) * uRise;
    float fres = 1.0 - z;
    float face = smoothstep(0.0, 0.3, z);

    s = vec3(0.012, 0.013, 0.016);

    // a soft light from the side the sun is on gives the ball its volume
    float vol = pow(max(dot(n, normalize(vec3(sd * 0.75, 0.66))), 0.0), 1.6) * uRise;
    s += vec3(0.046, 0.04, 0.034) * vol;

    // the continents, as a faint fill under the dots
    float landHere = textureLod(uLand, vec2(lon / TAU + 0.5, 0.5 - lat / PI), 0.0).r * uHasLand * uLayers.x;
    s += vec3(0.03, 0.029, 0.028) * landHere * face * (0.55 + 0.9 * vol);

    // lattice of dots, as many per row as fit at that latitude
    float latF = (lat / PI + 0.5) * uRows;
    float row = floor(latF);
    float latC = ((row + 0.5) / uRows - 0.5) * PI;
    float cols = max(floor(uRows * 2.0 * cos(latC) + 0.5), 1.0);
    float lonF = (lon / TAU + 0.5) * cols;
    float colI = floor(lonF);
    float lonC = ((colI + 0.5) / cols - 0.5) * TAU;
    vec2 cf = vec2(fract(lonF), fract(latF)) - 0.5;
    float aa = apx / (PI / uRows);
    float land = textureLod(uLand, vec2(lonC / TAU + 0.5, 0.5 - latC / PI), 0.0).r;
    float isLand = mix(1.0, step(0.5, land), uHasLand) * uLayers.x;

    vec3 cdir = vec3(cos(latC) * sin(lonC), sin(latC), cos(latC) * cos(lonC));
    float heat = 0.0;
    float glow = 0.0;
    for (int i = 0; i < 6; i++) {
      float a1 = ang(cdir, uHot[i].xyz);
      float a2 = ang(v, uHot[i].xyz);
      heat += uHot[i].w * exp(-a1 * a1 / 0.0032);
      glow += uHot[i].w * exp(-a2 * a2 / 0.0075);
    }
    heat = clamp(heat, 0.0, 1.0);
    float hot = step(hash21(vec2(colI, row)), heat * 1.2) * uMode.x;

    float rad = mix(0.27, 0.4, hot);
    float dotm = smoothstep(rad + aa, rad - aa, length(cf)) * isLand;
    vec3 dc = mix(vec3(0.6, 0.62, 0.68) * mix(0.1, 0.2, uHasLand), AMBER * (0.5 + 1.0 * heat), hot);
    dc = mix(dc * (0.8 + 1.1 * vol), dc, hot);
    dc = mix(dc, vec3(1.0, 0.9, 0.74), day);
    s += dc * dotm * face;
    s += AMBER * clamp(glow, 0.0, 1.0) * 0.07 * uMode.x * face;

    // graticule every 15 degrees
    float latD = degrees(lat);
    float lonD = degrees(lon);
    float pxDeg = degrees(apx);
    float gLat = abs(fract(latD / 15.0 + 0.5) - 0.5) * 15.0;
    float gLon = abs(fract(lonD / 15.0 + 0.5) - 0.5) * 15.0 * cos(lat);
    float grat = 1.0 - smoothstep(0.0, pxDeg * 1.4, min(gLat, gLon));
    grat *= step(abs(latD), 82.0);
    s += vec3(0.9, 0.92, 1.0) * grat * (0.04 + 0.13 * uMode.y) * uLayers.y * face;

    // events: a point and a ring that widens and fades
    for (int i = 0; i < 16; i++) {
      float age = uT - uEv[i].w;
      if (age < 0.0 || age > 3.0) continue;
      float a = ang(v, uEv[i].xyz);
      float k = age / 3.0;
      float rr = 0.012 + 0.075 * (1.0 - pow(1.0 - k, 3.0));
      float ring = 1.0 - smoothstep(0.0, apx * 1.6, abs(a - rr));
      float core = 1.0 - smoothstep(apx * 2.0, apx * 3.4, a);
      s += (AMBER * ring * (1.0 - k) * 1.3 + PALE * core * (1.0 - k * k)) * uMode.x * face;
    }

    // the shape being drawn
    if (uLayers.z > 0.001 && uPolyP > 0.0) {
      float inside = 1.0;
      float dmin = 10.0;
      float vert = 0.0;
      for (int i = 0; i < 6; i++) {
        vec3 a = uPoly[i];
        vec3 b = uPoly[(i + 1) % 6];
        float prog = clamp(uPolyP - float(i), 0.0, 1.0);
        if (prog > 0.0) dmin = min(dmin, arcDist(v, a, normalize(mix(a, b, prog))));
        inside = min(inside, step(0.0, dot(v, cross(a, b)) * uPolySign));
        float shown = step(float(i), uPolyP + 0.999);
        vert = max(vert, (1.0 - smoothstep(apx * 2.4, apx * 3.4, ang(v, a))) * shown);
      }
      float line = 1.0 - smoothstep(0.0, apx * 1.5, dmin);
      float fill = inside * smoothstep(6.0, 7.0, uPolyP);
      s += (PALE * line * 0.95 + AMBER * fill * 0.13 + vec3(1.0) * vert) * uLayers.z * uMode.y * face;
    }

    // pointer: the meridian and the parallel through it, and a small ring
    if (uCur.w > 0.001) {
      float a = ang(v, uCur.xyz);
      float cl = asin(clamp(uCur.y, -1.0, 1.0));
      float co = atan(uCur.x, uCur.z);
      float dl = abs(lat - cl);
      float dO = abs(mod(lon - co + PI, TAU) - PI) * cos(lat);
      float line = 1.0 - smoothstep(0.0, apx * 1.3, min(dl, dO));
      float ring = 1.0 - smoothstep(0.0, apx * 1.4, abs(a - 11.0 * uPx / uR));
      s += mix(AMBER, PALE, 0.4) * (line * exp(-a * 3.2) * 0.7 + ring * 0.9) * uCur.w * face;
    }

    // sunlight on the edge, and the air glowing above it
    vec3 lit = mix(vec3(0.95, 0.42, 0.08), vec3(1.0, 0.94, 0.82), smoothstep(0.0, 0.5, ndl));
    rim = lit * day * 0.85
        + AMBER * pow(fres, 2.2) * lim * 0.9 * uRise
        + PALE * pow(fres, 7.0) * lim * 1.2 * uRise
        + mix(AMBER, HOTWHITE, 0.6) * glare * 0.7 * uRise;
    s += vec3(0.55, 0.6, 0.72) * pow(fres, 4.0) * 0.07;

    disc = smoothstep(1.0, 1.0 - 1.5 / uR, d);
  }

  // orbit with a light running along it; the near half crosses in front of the
  // globe below its middle, the far half passes behind it
  float ringLine = 0.0;
  float ringHead = 0.0;
  float ringGlow = 0.0;
  if (uMode.z > 0.001) {
    float cr = cos(uRing.z);
    float sr = sin(uRing.z);
    vec2 q = vec2(cr * p.x + sr * p.y, -sr * p.x + cr * p.y);
    vec2 ab = vec2(uRing.x, uRing.x * uRing.y);
    float k = length(q / ab);
    float dist = abs(k - 1.0) * k / max(length(q / (ab * ab)), 1e-4);
    float line = 1.0 - smoothstep(0.0, 1.4 / uR, dist);
    float vis = (q.y < 0.0 || d >= 1.0) ? 1.0 : 0.0;
    float th = atan(q.y / ab.y, q.x / ab.x);
    float dth = abs(mod(th - uRing.w + PI, TAU) - PI);
    float head = exp(-dth * dth * 26.0);
    ringLine = line * uMode.z * vis;
    ringHead = head;
    ringGlow = exp(-dist * uR / 9.0) * head * 0.42 * uMode.z * vis;
  }
  vec3 ringAdd = vec3(1.0, 0.92, 0.8) * ringLine * (0.26 + 1.3 * ringHead) + AMBER * ringGlow;
  float dither = (hash21(frag + fract(uT) * 61.0) - 0.5) / 255.0;

  // On a dark page everything is light added to black.
  if (uLight < 0.5) {
    vec3 col = mix(sky + stars, s + rim, disc) + ringAdd;
    col = max(1.0 - exp(-col * 1.15) + dither, 0.0);
    outColor = vec4(col, max(disc, max(col.r, max(col.g, col.b))));
    return;
  }

  // On a light page the planet stays black. Sunlight is kept amber, because anything that
  // burns out to white would read as a piece missing from the picture; around the disc the
  // light is amber ink and the orbit is black ink.
  vec3 inner = s + rim + ringAdd;
  float share = clamp(dot(rim, vec3(1.0)) / max(dot(inner, vec3(1.0)), 1e-4), 0.0, 1.0);
  inner = 1.0 - exp(-inner * 1.15);
  inner = mix(inner, vec3(inner.r, min(inner.g, inner.r * 0.66), min(inner.b, inner.r * 0.2)), share);

  vec3 g = 1.0 - exp(-sky * 1.15);
  float ga = max(g.r, max(g.g, g.b));
  vec4 o = vec4(ga, ga * 0.58, ga * 0.13, ga);
  float ink = ringLine * 0.34;
  o = o * (1.0 - ink) + vec4(vec3(0.05), 1.0) * ink;
  float lamp = clamp(ringLine * ringHead * 1.3 + ringGlow, 0.0, 1.0);
  o = o * (1.0 - lamp) + vec4(AMBER, 1.0) * lamp;
  o = mix(o, vec4(inner, 1.0), disc);
  o.rgb = max(o.rgb + dither * o.a, 0.0);
  outColor = o;
}`

const DEG = Math.PI / 180

export function dirOf(lat, lon) {
  const a = lat * DEG
  const o = lon * DEG
  return [Math.cos(a) * Math.sin(o), Math.sin(a), Math.cos(a) * Math.cos(o)]
}

function compile(gl, type, src) {
  const sh = gl.createShader(type)
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh)
    gl.deleteShader(sh)
    throw new Error(`globe shader: ${log}`)
  }
  return sh
}

const ease = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3)

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ landUrl?: string, sunAzimuth?: number, lat?: number, lon?: number, reducedMotion?: boolean, dark?: boolean }} opts
 */
export function createGlobe(canvas, opts = {}) {
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false })
  if (!gl) return null

  const prog = gl.createProgram()
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(`globe program: ${gl.getProgramInfoLog(prog)}`)
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'aPos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const U = {}
  for (const name of ['uRes', 'uC', 'uR', 'uPx', 'uRot', 'uSun', 'uT', 'uRise', 'uMode', 'uLayers', 'uLand', 'uHasLand', 'uRows', 'uEv', 'uHot', 'uCur', 'uPoly', 'uPolyP', 'uPolySign', 'uRing', 'uLight']) {
    U[name] = gl.getUniformLocation(prog, name)
  }

  const tex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, 1, 1, 0, gl.RED, gl.UNSIGNED_BYTE, new Uint8Array([255]))
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  const reduced = !!opts.reducedMotion
  const state = {
    cx: 0,
    cy: 0,
    r: 100,
    dpr: 1,
    lat: opts.lat ?? 30,
    lon: opts.lon ?? 108,
    from: null,
    drift: 0,
    driftT0: 0,
    vel: 0,
    dragging: false,
    hasLand: 0,
    rise: reduced ? 1 : 0,
    riseAt: null,
    mode: [1, 0, 0],
    modeTo: [1, 0, 0],
    layers: [1, 1, 1],
    layersTo: [1, 1, 1],
    cur: [0, 0, 1, 0],
    curTo: 0,
    polyP: 0,
    polyAt: null,
    ringHead: 0,
    light: opts.dark === false ? 1 : 0,
    t: 0,
    visible: true,
    running: false
  }
  const ev = new Float32Array(64)
  for (let i = 0; i < 16; i++) ev[i * 4 + 3] = -100
  let evNext = 0
  const hot = new Float32Array(24)
  const poly = new Float32Array(18)
  let polySign = 1
  const ring = { radius: 1.12, minor: 0.26, roll: 0.26 }
  const frameCbs = []
  const R = new Float32Array(9)
  const sunAz = (opts.sunAzimuth ?? 62) * DEG

  if (opts.landUrl) {
    const img = new Image()
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, gl.RED, gl.UNSIGNED_BYTE, img)
      state.hasLand = 1
      if (!state.running) draw()
    }
    img.src = opts.landUrl
  }

  function rotation() {
    const a = -(state.lon + state.drift) * DEG
    const b = state.lat * DEG
    const ca = Math.cos(a)
    const sa = Math.sin(a)
    const cb = Math.cos(b)
    const sb = Math.sin(b)
    // rows of Rx(b) * Ry(a)
    return [ca, 0, sa, sb * sa, cb, -sb * ca, -cb * sa, sb, cb * ca]
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }
    state.dpr = dpr
    gl.viewport(0, 0, w, h)
    if (!state.running) draw()
  }

  /** Centre and radius of the globe, in CSS pixels relative to the canvas. */
  function place(cx, cy, r) {
    state.cx = cx
    state.cy = cy
    state.r = r
    if (!state.running) draw()
  }

  function project(lat, lon) {
    const m = rotation()
    const v = dirOf(lat, lon)
    const x = m[0] * v[0] + m[1] * v[1] + m[2] * v[2]
    const y = m[3] * v[0] + m[4] * v[1] + m[5] * v[2]
    const z = m[6] * v[0] + m[7] * v[1] + m[8] * v[2]
    return { x: state.cx + state.r * x, y: state.cy - state.r * y, z, visible: z > 0.08 }
  }

  /** The (lat, lon) under a point given in CSS pixels relative to the canvas, or null off the globe. */
  function pick(px, py) {
    const x = (px - state.cx) / state.r
    const y = -(py - state.cy) / state.r
    const d2 = x * x + y * y
    if (d2 >= 0.985) return null
    const z = Math.sqrt(1 - d2)
    const m = rotation()
    const vx = m[0] * x + m[3] * y + m[6] * z
    const vy = m[1] * x + m[4] * y + m[7] * z
    const vz = m[2] * x + m[5] * y + m[8] * z
    return { lat: Math.asin(Math.max(-1, Math.min(1, vy))) / DEG, lon: Math.atan2(vx, vz) / DEG, dir: [vx, vy, vz] }
  }

  function ringPoint(theta) {
    const qx = ring.radius * Math.cos(theta)
    const qy = ring.radius * ring.minor * Math.sin(theta)
    const c = Math.cos(ring.roll)
    const s = Math.sin(ring.roll)
    return { x: state.cx + state.r * (c * qx - s * qy), y: state.cy - state.r * (s * qx + c * qy), front: Math.sin(theta) < 0 }
  }

  function draw() {
    const m = rotation()
    // column-major for GLSL
    R.set([m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]])
    const dpr = state.dpr
    const beta = (86 - 20 * state.rise) * DEG
    gl.uniform2f(U.uRes, canvas.width, canvas.height)
    gl.uniform2f(U.uC, state.cx * dpr, state.cy * dpr)
    gl.uniform1f(U.uR, state.r * dpr)
    gl.uniform1f(U.uPx, dpr)
    gl.uniformMatrix3fv(U.uRot, false, R)
    gl.uniform3f(U.uSun, Math.cos(sunAz) * Math.cos(beta), Math.sin(sunAz) * Math.cos(beta), -Math.sin(beta))
    gl.uniform1f(U.uT, state.t)
    gl.uniform1f(U.uRise, state.rise)
    gl.uniform3fv(U.uMode, state.mode)
    gl.uniform3fv(U.uLayers, state.layers)
    gl.uniform1i(U.uLand, 0)
    gl.uniform1f(U.uHasLand, state.hasLand)
    gl.uniform1f(U.uRows, Math.round(Math.min(Math.max(state.r * 0.34, 84), 190)))
    gl.uniform4fv(U.uEv, ev)
    gl.uniform4fv(U.uHot, hot)
    gl.uniform4fv(U.uCur, state.cur)
    gl.uniform3fv(U.uPoly, poly)
    gl.uniform1f(U.uPolyP, state.polyP)
    gl.uniform1f(U.uPolySign, polySign)
    gl.uniform4f(U.uRing, ring.radius, ring.minor, ring.roll, state.ringHead)
    gl.uniform1f(U.uLight, state.light)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  let last = 0
  function frame(now) {
    if (!state.running) return
    requestAnimationFrame(frame)
    if (!state.visible || document.hidden) {
      last = now
      return
    }
    const dt = Math.min((now - last) / 1000 || 0, 0.05)
    last = now
    state.t += dt

    if (state.riseAt !== null) {
      state.rise = ease((state.t - state.riseAt) / 2.6)
      if (state.rise >= 1) state.riseAt = null
    }
    if (state.from) {
      const k = ease((state.t - state.from.t0) / state.from.dur)
      state.lat = state.from.lat + (state.from.toLat - state.from.lat) * k
      state.lon = state.from.lon + state.from.dLon * k
      if (k >= 1) state.from = null
    }
    if (!state.dragging) {
      if (Math.abs(state.vel) > 0.01) {
        state.lon -= state.vel * dt
        state.vel *= Math.pow(0.04, dt)
      }
      if (!reduced) state.drift = 16 * Math.sin(((state.t - state.driftT0) / 64) * Math.PI * 2)
    }
    for (let i = 0; i < 3; i++) {
      state.mode[i] += (state.modeTo[i] - state.mode[i]) * Math.min(1, dt * 5)
      state.layers[i] += (state.layersTo[i] - state.layers[i]) * Math.min(1, dt * 7)
    }
    state.cur[3] += (state.curTo - state.cur[3]) * Math.min(1, dt * 9)
    if (state.polyAt !== null) {
      state.polyP = Math.min(7, (state.t - state.polyAt) / 0.42)
      if (state.polyP >= 7) state.polyAt = null
    }
    for (const cb of frameCbs) cb(state.t, dt)
    draw()
  }

  const io = new IntersectionObserver((entries) => {
    state.visible = entries[0].isIntersecting
  })
  io.observe(canvas)

  return {
    resize,
    place,
    project,
    pick,
    ringPoint,
    get time() {
      return state.t
    },
    start() {
      if (state.running) return
      state.running = true
      last = performance.now()
      requestAnimationFrame(frame)
    },
    stop() {
      state.running = false
    },
    /** Stops drawing and gives the WebGL context back. */
    destroy() {
      state.running = false
      io.disconnect()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
    /** The page went dark or light. */
    setTheme(dark) {
      state.light = dark ? 0 : 1
      if (!state.running) draw()
    },
    sunrise() {
      if (reduced) return
      state.rise = 0
      state.riseAt = state.t
    },
    /** Weights for the three modes; each is 0 or 1 and the globe fades between them. */
    setMode(track, gis, ai) {
      state.modeTo = [track, gis, ai]
      if (reduced) state.mode = [track, gis, ai]
    },
    setLayer(index, on) {
      state.layersTo[index] = on ? 1 : 0
      if (reduced) state.layers[index] = on ? 1 : 0
    },
    lookAt(lat, lon, dur = 1.6) {
      let dLon = lon - state.lon
      dLon = ((((dLon + 180) % 360) + 360) % 360) - 180
      if (reduced) {
        state.lat = lat
        state.lon += dLon
        return
      }
      state.from = { t0: state.t, dur, lat: state.lat, toLat: lat, lon: state.lon, dLon }
      state.vel = 0
    },
    addEvent(lat, lon) {
      const v = dirOf(lat, lon)
      ev.set([v[0], v[1], v[2], state.t], evNext * 4)
      evNext = (evNext + 1) % 16
    },
    setHot(list) {
      hot.fill(0)
      list.slice(0, 6).forEach(([lat, lon, w], i) => {
        const v = dirOf(lat, lon)
        hot.set([v[0], v[1], v[2], w], i * 4)
      })
    },
    setPolygon(points) {
      const dirs = points.slice(0, 6).map(([lat, lon]) => dirOf(lat, lon))
      dirs.forEach((v, i) => poly.set(v, i * 3))
      // which way the shape winds, seen from outside
      const c = dirs.reduce((s, v) => [s[0] + v[0], s[1] + v[1], s[2] + v[2]], [0, 0, 0])
      const [a, b] = dirs
      const n = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
      polySign = n[0] * c[0] + n[1] * c[1] + n[2] * c[2] >= 0 ? 1 : -1
    },
    /** Draw the shape edge by edge; with false it shows at once. */
    playPolygon(animate = true) {
      if (reduced || !animate) {
        state.polyP = 7
        state.polyAt = null
      } else {
        state.polyP = 0.001
        state.polyAt = state.t
      }
    },
    clearPolygon() {
      state.polyP = 0
      state.polyAt = null
    },
    setRingHead(theta) {
      state.ringHead = theta
    },
    setPointer(hit) {
      if (hit) {
        state.cur[0] = hit.dir[0]
        state.cur[1] = hit.dir[1]
        state.cur[2] = hit.dir[2]
        state.curTo = 1
      } else {
        state.curTo = 0
      }
    },
    /** Turn the globe by a drag of dx, dy CSS pixels. */
    drag(dx, dy, dt) {
      const k = 57.3 / state.r
      state.lon -= dx * k
      state.lat = Math.max(-55, Math.min(70, state.lat + dy * k))
      state.from = null
      if (dt > 0) state.vel = (dx * k) / dt
    },
    setDragging(on) {
      state.dragging = on
      if (on) {
        // fold the slow drift into the position so the globe does not jump
        state.lon += state.drift
        state.drift = 0
        state.vel = 0
      } else {
        state.driftT0 = state.t
      }
    },
    onFrame(cb) {
      frameCbs.push(cb)
    },
    draw,
    state
  }
}
