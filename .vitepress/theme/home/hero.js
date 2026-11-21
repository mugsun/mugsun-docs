// Behaviour of the first screen of the home page: the globe and the three things it can show.
// The markup comes from components/HomeLanding.vue; the words come from the page frontmatter.

import { createGlobe } from './globe.js'

const DEG = Math.PI / 180
const fmt = (n) => n.toLocaleString('en-US')
const pad2 = (n) => String(n).padStart(2, '0')
const latText = (v) => `${Math.abs(v).toFixed(4)}°${v >= 0 ? 'N' : 'S'}`
const lonText = (v) => `${Math.abs(v).toFixed(4)}°${v >= 0 ? 'E' : 'W'}`
const pairText = (lat, lon) => `${lat.toFixed(4)}, ${lon.toFixed(4)}`
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const fill = (tpl, values) => tpl.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? '')

// demo places, and the event names of the demo shop
const HOT = [
  [39.9087, 116.3975, 1],
  [31.2304, 121.4737, 0.9],
  [23.1291, 113.2644, 0.8],
  [30.5728, 104.0668, 0.7],
  [30.5928, 114.3055, 0.6],
  [34.3416, 108.9398, 0.5]
]
const NAMES = ['$pageview', '$pageview', '$pageview', 'view', 'submit', 'done', 'order_submit', 'store_checkin']

// the shape the GIS mode draws
const POLY = [
  [41.5, 99],
  [43, 108.5],
  [39.5, 115.5],
  [33.5, 114],
  [30.5, 105.5],
  [34.5, 98.5]
]
const STEP = 0.42

// where the four steps of the AI app sit on the orbit, and when the light moves between them
const THETA = [-152, -113, -67, -28].map((d) => d * DEG)
const RUN = [
  { t0: 0.0, t1: 0.7, move: [0, 1] },
  { t0: 0.7, t1: 2.0, work: 1 },
  { t0: 2.0, t1: 2.7, move: [1, 2] },
  { t0: 2.7, t1: 4.4, work: 2 },
  { t0: 4.4, t1: 5.1, move: [2, 3] }
]
const RUN_END = 5.1
const RUN_LOOP = 8.6

const ORDER = ['track', 'gis', 'ai']
const SECONDS = { track: 11, gis: 10, ai: 11 }

// area of a polygon on the sphere, in square kilometres
function sphereArea(points) {
  let sum = 0
  for (let i = 0; i < points.length; i++) {
    const [lat1, lon1] = points[i]
    const [lat2, lon2] = points[(i + 1) % points.length]
    sum += (lon2 - lon1) * DEG * (2 + Math.sin(lat1 * DEG) + Math.sin(lat2 * DEG))
  }
  return Math.abs((sum * 6371.0088 * 6371.0088) / 2)
}

/**
 * @param {HTMLElement} root the .ms-home element
 * @param {{ landUrl: string, dark: boolean, text: Record<string, string> }} opts
 *   text: vertex, shape, area, idle, running, step, done, thinking
 */
export function mountHero(root, opts) {
  const $ = (s, el = root) => el.querySelector(s)
  const $$ = (s, el = root) => [...el.querySelectorAll(s)]
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const text = opts.text
  const timers = new Set()
  const later = (fn, ms) => {
    const id = setTimeout(() => {
      timers.delete(id)
      fn()
    }, ms)
    timers.add(id)
    return id
  }
  let dead = false

  const hero = $('#hero')
  const canvas = $('.hero-gl')
  const anchor = $('.globe-anchor')
  const stage = $('.stage')
  const pin = $('#pin')
  const nodes = $$('.node')
  const chain = $$('#chain li')
  const chainState = $('#chain-state')
  const streamEl = $('#stream')
  const areaEl = $('#gis-area')

  let globe = null
  try {
    globe = createGlobe(canvas, {
      // ?land=0 shows the planet without coastlines
      landUrl: new URLSearchParams(location.search).get('land') === '0' ? '' : opts.landUrl,
      sunAzimuth: 118,
      lat: 31,
      lon: 108,
      reducedMotion: reduced,
      dark: opts.dark
    })
  } catch (err) {
    console.error(err)
  }
  hero.classList.toggle('no-gl', !globe)
  if (!globe) {
    // a picture stands in for the globe: it cannot be turned, and its layers cannot be switched
    anchor.removeAttribute('title')
    $$('.sw[data-layer]').forEach((sw) => (sw.disabled = true))
  }

  let off = { x: 0, y: 0 }
  function layout() {
    if (!globe) return
    const c = canvas.getBoundingClientRect()
    const a = anchor.getBoundingClientRect()
    const s = stage.getBoundingClientRect()
    off = { x: c.left - s.left, y: c.top - s.top }
    globe.resize()
    globe.place(a.left - c.left + a.width / 2, a.top - c.top + a.height / 2, a.width / 2)
  }

  // seconds, advancing only while the first screen is on screen
  let now = 0
  let heroVisible = true
  const seen = new IntersectionObserver((entries) => {
    heroVisible = entries[0].isIntersecting
  })
  seen.observe(hero)

  /* ----- coordinates readout: the pointer when it is on the globe, otherwise the latest subject ----- */

  const hudLat = $('#hud-lat')
  const hudLon = $('#hud-lon')
  const hudSrc = $('#hud-src')
  let subject = { lat: 39.9087, lon: 116.3975, src: 'EVENT' }
  let pointer = null
  function showCoord() {
    const c = pointer || subject
    hudLat.textContent = latText(c.lat)
    hudLon.textContent = lonText(c.lon)
    hudSrc.textContent = pointer ? 'POINTER' : subject.src
  }

  /* ----- a label pinned to a place on the globe ----- */

  let pinAt = null
  function setPin(lat, lon, title, sub, seconds = Infinity) {
    pinAt = { lat, lon, until: now + seconds }
    pin.querySelector('b').textContent = title
    pin.querySelector('span').textContent = sub
  }
  function clearPin() {
    pinAt = null
    pin.classList.remove('on')
  }

  /* ----- 01 tracking: events arrive, the counters and the stream follow ----- */

  // the counters start from the numbers printed in the page
  const kpi = { pv: $('#k-pv'), ev: $('#k-ev') }
  const counts = {
    pv: Number(kpi.pv.textContent.replace(/\D/g, '')),
    ev: Number(kpi.ev.textContent.replace(/\D/g, ''))
  }
  let nextEvent = 0

  function bump(key) {
    counts[key] += 1
    kpi[key].textContent = fmt(counts[key])
    kpi[key].classList.add('tick')
    later(() => kpi[key].classList.remove('tick'), 80)
  }

  function addRow(name, lat, lon, date = new Date()) {
    const li = document.createElement('li')
    const time = document.createElement('time')
    time.textContent = `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`
    const b = document.createElement('b')
    b.textContent = name
    const span = document.createElement('span')
    span.textContent = pairText(lat, lon)
    li.append(time, b, span)
    streamEl.prepend(li)
    while (streamEl.children.length > 4) streamEl.lastElementChild.remove()
  }

  function emit(name, lat, lon) {
    addRow(name, lat, lon)
    bump('ev')
    if (name === '$pageview') bump('pv')
    if (globe) globe.addEvent(lat, lon)
    subject = { lat, lon, src: 'EVENT' }
    showCoord()
    setPin(lat, lon, name, pairText(lat, lon), 2.6)
  }

  function randomEvent() {
    const total = HOT.reduce((s, h) => s + h[2], 0)
    let r = Math.random() * total
    let spot = HOT[0]
    for (const h of HOT) {
      r -= h[2]
      if (r <= 0) {
        spot = h
        break
      }
    }
    const g = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5
    const lat = +(spot[0] + g() * 1.5).toFixed(4)
    const lon = +(spot[1] + g() * 1.9).toFixed(4)
    emit(NAMES[Math.floor(Math.random() * NAMES.length)], lat, lon)
  }

  // what is already in the stream when the page opens
  streamEl.textContent = ''
  ;[
    ['$pageview', 31.2304, 121.4737, 9],
    ['view', 23.1291, 113.2644, 6],
    ['order_submit', 30.5728, 104.0668, 4],
    ['store_checkin', 39.9087, 116.3975, 1]
  ].forEach(([name, lat, lon, ago]) => addRow(name, lat, lon, new Date(Date.now() - ago * 1000)))

  /* ----- 02 GIS: a shape is drawn vertex by vertex, layers can be switched ----- */

  const area = sphereArea(POLY)
  const areaText = fill(text.area, { wan: Math.round(area / 10000), million: (area / 1e6).toFixed(2) })
  const centre = POLY.reduce((s, p) => [s[0] + p[0] / POLY.length, s[1] + p[1] / POLY.length], [0, 0])
  let polyT0 = 0
  let polyStep = -1

  function startDrawing(delay) {
    polyT0 = now + delay
    polyStep = -1
    areaEl.textContent = '—'
    clearPin()
    if (globe) globe.clearPolygon()
  }

  function drawingFrame() {
    if (now < polyT0) return
    const k = Math.min(Math.floor((now - polyT0) / STEP), 7)
    if (k === polyStep) return
    if (polyStep === -1 && globe) globe.playPolygon()
    polyStep = k
    if (k < 6) {
      const [lat, lon] = POLY[k]
      subject = { lat, lon, src: 'VERTEX' }
      showCoord()
      setPin(lat, lon, fill(text.vertex, { n: k + 1 }), pairText(lat, lon))
    } else if (k === 7 || reduced) {
      areaEl.textContent = areaText
      setPin(centre[0], centre[1], text.shape, areaText)
    }
  }

  $$('.sw[data-layer]').forEach((sw) => {
    sw.addEventListener('click', () => {
      const on = sw.getAttribute('aria-pressed') !== 'true'
      sw.setAttribute('aria-pressed', String(on))
      if (globe) globe.setLayer(+sw.dataset.layer, on)
      hold = 16
    })
  })
  $('#redraw').addEventListener('click', () => {
    startDrawing(0.1)
    hold = 16
  })

  /* ----- 03 AI: the app runs step by step along the orbit; questions about the data ----- */

  const labels = chain.map((li) => li.dataset.name)
  let aiT0 = 0
  let aiKey = ''

  function setChain(done, running) {
    const key = `${done}/${running}`
    if (key === aiKey) return
    aiKey = key
    ;[nodes, chain].forEach((list) => {
      list.forEach((el, i) => {
        el.classList.toggle('done', i <= done)
        el.classList.toggle('run', i === running)
      })
    })
    chainState.textContent =
      running >= 0 ? fill(text.step, { name: labels[running] }) : done >= 3 ? text.done : done >= 0 ? text.running : text.idle
  }

  function aiFrame() {
    let t = now - aiT0
    if (t > RUN_LOOP) {
      aiT0 = now
      t = 0
    }
    if (t < 0) {
      setChain(-1, -1)
      if (globe) globe.setRingHead(THETA[0])
      return
    }
    if (reduced || t >= RUN_END) {
      setChain(3, -1)
      if (globe) globe.setRingHead(THETA[3])
      return
    }
    const seg = RUN.find((s) => t >= s.t0 && t < s.t1)
    if (seg.move) {
      const k = easeInOut((t - seg.t0) / (seg.t1 - seg.t0))
      if (globe) globe.setRingHead(THETA[seg.move[0]] + (THETA[seg.move[1]] - THETA[seg.move[0]]) * k)
      setChain(seg.move[0], -1)
    } else {
      if (globe) globe.setRingHead(THETA[seg.work])
      setChain(seg.work - 1, seg.work)
    }
  }

  // An answer is written as "近 7 天：浏览量 {2,123}"; the parts in braces are set in bold.
  const answer = $('#answer')
  const chips = $$('.chip')
  function dim(message) {
    const span = document.createElement('span')
    span.className = 'dim'
    span.textContent = message
    answer.replaceChildren(span)
  }
  function showAnswer(chip) {
    const code = document.createElement('code')
    code.textContent = chip.dataset.intent
    const parts = chip.dataset.a.split(/\{([^}]*)\}/).map((part, i) => {
      if (i % 2 === 0) return part
      const b = document.createElement('b')
      b.textContent = part
      return b
    })
    answer.replaceChildren(code, ...parts)
  }
  let askTimer = 0
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)))
      dim(text.thinking)
      clearTimeout(askTimer)
      timers.delete(askTimer)
      askTimer = later(() => showAnswer(chip), reduced ? 0 : 520)
      hold = 20
    })
  })

  /* ----- switching between the three ----- */

  const tabs = $$('.con-tab')
  const kws = $$('.kw')
  let mode = ''
  let prog = 0
  let hold = 0
  let hover = false

  function activate(name, byUser) {
    if (byUser) hold = 16
    if (name === mode) return
    mode = name
    prog = 0
    hero.dataset.mod = name
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.mod === name)))
    kws.forEach((k) => k.setAttribute('aria-pressed', String(k.dataset.mod === name)))
    clearPin()
    if (globe) globe.setMode(+(name === 'track'), +(name === 'gis'), +(name === 'ai'))
    if (name === 'track') {
      if (globe) globe.lookAt(31, 108)
      nextEvent = now + 0.5
    } else if (name === 'gis') {
      if (globe) globe.lookAt(37, 108)
      startDrawing(0.8)
    } else {
      if (globe) globe.lookAt(24, 104)
      aiT0 = now + 0.6
      aiKey = ''
    }
  }

  tabs.forEach((t) => t.addEventListener('click', () => activate(t.dataset.mod, true)))
  kws.forEach((k) => {
    let timer = 0
    k.addEventListener('click', () => activate(k.dataset.mod, true))
    k.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return
      hover = true
      timer = later(() => activate(k.dataset.mod, true), 110)
    })
    k.addEventListener('pointerleave', () => {
      hover = false
      clearTimeout(timer)
      timers.delete(timer)
    })
  })
  const consoleEl = $('#console')
  consoleEl.addEventListener('pointerenter', () => (hover = true))
  consoleEl.addEventListener('pointerleave', () => (hover = false))
  consoleEl.addEventListener('focusin', () => (hold = 20))

  /* ----- the globe under the pointer: read coordinates, drag to turn, click to send an event ----- */

  let drag = null
  function pickAt(e) {
    const r = canvas.getBoundingClientRect()
    return globe.pick(e.clientX - r.left, e.clientY - r.top)
  }
  if (globe) {
    anchor.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || !pickAt(e)) return
      drag = { x: e.clientX, y: e.clientY, t: performance.now(), moved: 0 }
      anchor.setPointerCapture(e.pointerId)
      anchor.classList.add('dragging')
      globe.setDragging(true)
    })
    anchor.addEventListener('pointermove', (e) => {
      if (drag) {
        const t = performance.now()
        const dx = e.clientX - drag.x
        const dy = e.clientY - drag.y
        drag.moved += Math.abs(dx) + Math.abs(dy)
        globe.drag(dx, dy, (t - drag.t) / 1000)
        drag.x = e.clientX
        drag.y = e.clientY
        drag.t = t
        hold = 16
      }
      const hit = pickAt(e)
      globe.setPointer(hit)
      pointer = hit ? { lat: hit.lat, lon: hit.lon } : null
      showCoord()
    })
    const release = (e) => {
      if (!drag) return
      const clicked = drag.moved < 5
      drag = null
      anchor.classList.remove('dragging')
      globe.setDragging(false)
      if (clicked && mode === 'track' && e.type === 'pointerup') {
        const hit = pickAt(e)
        if (hit) {
          emit('store_checkin', +hit.lat.toFixed(4), +hit.lon.toFixed(4))
          nextEvent = now + 1.6
          hold = 16
        }
      }
    }
    anchor.addEventListener('pointerup', release)
    anchor.addEventListener('pointercancel', release)
    anchor.addEventListener('pointerleave', () => {
      if (drag) return
      globe.setPointer(null)
      pointer = null
      showCoord()
    })
  }

  /* ----- one clock for everything on the first screen ----- */

  let last = performance.now()
  function tick(ts) {
    if (dead) return
    requestAnimationFrame(tick)
    const dt = Math.min((ts - last) / 1000, 0.05)
    last = ts
    if (document.hidden || !heroVisible) return
    now += dt

    if (!reduced) {
      if (hold > 0) hold -= dt
      else if (!hover) prog += dt / SECONDS[mode]
      if (prog >= 1) activate(ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length], false)
    }
    hero.style.setProperty('--p', prog.toFixed(4))

    if (mode === 'track') {
      if (!reduced && now >= nextEvent) {
        randomEvent()
        nextEvent = now + 0.8 + Math.random()
      }
    } else if (mode === 'gis') {
      drawingFrame()
    } else {
      aiFrame()
    }

    if (globe) {
      if (pinAt) {
        const p = globe.project(pinAt.lat, pinAt.lon)
        const on = p.visible && now < pinAt.until
        pin.classList.toggle('on', on)
        if (on) pin.style.transform = `translate(${(p.x + off.x).toFixed(1)}px, ${(p.y + off.y).toFixed(1)}px)`
      }
      if (mode === 'ai') {
        nodes.forEach((el, i) => {
          const p = globe.ringPoint(THETA[i])
          el.style.transform = `translate(${(p.x + off.x).toFixed(1)}px, ${(p.y + off.y).toFixed(1)}px) translate(-50%, calc(-100% - 14px))`
        })
      }
    }
  }

  let sizes = null
  if (globe) {
    globe.setHot(HOT)
    globe.setPolygon(POLY)
    layout()
    sizes = new ResizeObserver(layout)
    sizes.observe(hero)
    addEventListener('resize', layout)
    globe.start()
    later(() => globe.sunrise(), 250)
  }
  showCoord()
  activate('track', false)
  requestAnimationFrame(tick)

  return {
    activate,
    hold: (seconds) => (hold = seconds),
    setTheme(dark) {
      if (globe) globe.setTheme(dark)
    },
    destroy() {
      dead = true
      timers.forEach(clearTimeout)
      seen.disconnect()
      if (sizes) sizes.disconnect()
      removeEventListener('resize', layout)
      if (globe) globe.destroy()
    }
  }
}
