// Behaviour of the home page sections after the first screen.
// The markup comes from components/HomeLanding.vue; the words come from the page frontmatter.

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const fill = (tpl, values) => tpl.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? '')
// "核心加GIS" -> "核心加 GIS": a space where Chinese meets Latin
const spaced = (s) => s.replace(/([\u4e00-\u9fff])([A-Za-z0-9])/g, '$1 $2').replace(/([A-Za-z0-9])([\u4e00-\u9fff])/g, '$1 $2')

function el(tag, cls, text) {
  const n = document.createElement(tag)
  if (cls) n.className = cls
  if (text != null) n.textContent = text
  return n
}

// Types text into a node, with a caret after it. Stops when alive() turns false.
async function typeText(node, text, speed, alive) {
  const tn = document.createTextNode('')
  const caret = el('i', 'caret')
  node.textContent = ''
  node.append(tn, caret)
  for (let i = 1; i <= text.length; i++) {
    if (!alive()) return false
    tn.data = text.slice(0, i)
    await sleep(speed + Math.random() * speed * 0.7)
  }
  caret.remove()
  return true
}

const PACK = './mvnw -pl mugsun-boot-server -am package -DskipTests'
const ENV = { track: 'MUGSUN_TRACK_ENABLED', gis: 'MUGSUN_GIS_ENABLED', ai: 'MUGSUN_AI_ENABLED' }
const KEYS = Object.keys(ENV)
const WIN_SECONDS = 7

/**
 * @param {HTMLElement} root the .ms-home element
 * @param {{
 *   dark: boolean,
 *   ui: { copy: string, copied: string, copyFailed: string },
 *   shots: { path: string, light: string, dark?: string, alt: string, contain?: boolean, link?: string }[],
 *   mods: { names: Record<string, string>, cmd: string, cmdRun: string, notes: Record<string, string>, comments: Record<string, string> },
 *   term: { c?: string, cmd?: string, step: number }[]
 * }} opts
 */
export function mountSections(root, opts) {
  const $ = (s, node = root) => node.querySelector(s)
  const $$ = (s, node = root) => [...node.querySelectorAll(s)]
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const watchers = []
  let dead = false

  function watch(target, options, fn) {
    const io = new IntersectionObserver(fn, options)
    io.observe(target)
    watchers.push(io)
    return io
  }

  async function copyText(text, btn) {
    let ok = true
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = el('textarea')
      ta.value = text
      ta.style.cssText = 'position:fixed;opacity:0'
      document.body.append(ta)
      ta.select()
      try {
        ok = document.execCommand('copy')
      } catch {
        ok = false
      }
      ta.remove()
    }
    btn.textContent = ok ? opts.ui.copied : opts.ui.copyFailed
    clearTimeout(btn.timer)
    btn.timer = setTimeout(() => (btn.textContent = opts.ui.copy), 1400)
  }

  /* ----- things come in as they are scrolled to ----- */

  const seen = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.classList.add('in')
        seen.unobserve(e.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
  )
  watchers.push(seen)
  for (const node of $$('[data-rv]')) {
    const group = [...node.parentElement.children].filter((c) => c.hasAttribute('data-rv'))
    node.style.setProperty('--rv-d', `${(group.indexOf(node) * 0.08).toFixed(2)}s`)
    seen.observe(node)
  }

  /* ----- four facts: the numbers count up ----- */

  const facts = $('#facts')

  function countUp(node, to) {
    if (reduced || to < 2) return
    node.style.display = 'inline-block'
    node.style.minWidth = `${node.offsetWidth}px`
    const dur = 500 + Math.min(900, to * 9)
    const t0 = performance.now()
    node.textContent = '0'
    const step = (t) => {
      const k = clamp((t - t0) / dur, 0, 1)
      node.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 4))))
      if (k < 1 && !dead) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  watch(facts, { threshold: 0.35 }, (entries, io) => {
    if (!entries.some((e) => e.isIntersecting)) return
    io.disconnect()
    facts.classList.add('in')
    $$('b[data-to]', facts).forEach((b, i) => setTimeout(() => countUp(b, Number(b.dataset.to)), 100 + i * 80))
  })

  /* ----- the product window ----- */

  const shots = opts.shots
  const win = $('#window')
  const tabs = $$('.win-tab', win)
  const winMain = $('.win-main')
  const frame = $('#win-frame')
  const layers = $$('#win-view img')
  const pathEl = $('#win-path')
  const docEl = $('#win-doc')
  const themeBtns = $$('#win-theme button')

  let cur = 0
  let theme = opts.dark ? 'dark' : 'light'
  let front = 0
  let swapNo = 0
  let winVisible = false
  let winHover = false
  let winHold = 0
  let winElapsed = 0
  let winLast = 0

  // a shot without a dark version is shown light
  const toneOf = (i) => (theme === 'dark' && shots[i].dark ? 'dark' : 'light')
  const srcOf = (i) => shots[i][toneOf(i)]

  function swap(i) {
    const shot = shots[i]
    const src = srcOf(i)
    const no = ++swapNo
    const probe = new Image()
    const done = () => {
      if (dead || no !== swapNo) return
      const old = layers[front]
      const next = layers[1 - front]
      if (old.getAttribute('src') === src) return
      next.classList.remove('leave')
      next.src = src
      next.alt = shot.alt
      next.classList.toggle('contain', !!shot.contain)
      requestAnimationFrame(() => {
        if (no !== swapNo) return
        old.classList.add('leave')
        old.classList.remove('on')
        next.classList.add('on')
        front = 1 - front
        setTimeout(() => old.classList.remove('leave'), 620)
      })
    }
    probe.src = src
    if (probe.decode) probe.decode().then(done, done)
    else probe.onload = done
  }

  function show(i, byUser) {
    cur = (i + shots.length) % shots.length
    const shot = shots[cur]
    const tone = toneOf(cur)
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === cur))
      t.tabIndex = k === cur ? 0 : -1
      t.style.setProperty('--p', '0')
    })
    pathEl.textContent = shot.path
    docEl.hidden = !shot.link
    if (shot.link) docEl.href = shot.link
    themeBtns.forEach((b) => {
      b.disabled = b.dataset.theme === 'dark' && !shot.dark
      b.setAttribute('aria-pressed', String(b.dataset.theme === tone))
    })
    // the window itself goes dark or light with the screenshot in it
    frame.classList.toggle('tone-dark', tone === 'dark')
    frame.classList.toggle('tone-light', tone === 'light')
    swap(cur)
    winElapsed = 0
    if (byUser) winHold = performance.now() + 12000
    new Image().src = srcOf((cur + 1) % shots.length)
  }

  tabs.forEach((t, k) => t.addEventListener('click', () => show(k, true)))

  $('#win-list').addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    show(cur + (e.key === 'ArrowDown' ? 1 : -1), true)
    tabs[cur].focus()
  })

  themeBtns.forEach((b) =>
    b.addEventListener('click', () => {
      theme = b.dataset.theme
      show(cur, true)
    })
  )

  const winGrid = $('.win-grid')
  winGrid.addEventListener('pointerenter', () => (winHover = true))
  winGrid.addEventListener('pointerleave', () => (winHover = false))

  function winTick(t) {
    const dt = Math.min(0.1, (t - winLast) / 1000)
    winLast = t
    if (dead || !winVisible) return
    if (!winHover && !reduced && t > winHold) {
      winElapsed += dt
      if (winElapsed >= WIN_SECONDS) show(cur + 1, false)
    }
    tabs[cur].style.setProperty('--p', clamp(winElapsed / WIN_SECONDS, 0, 1).toFixed(4))
    requestAnimationFrame(winTick)
  }

  watch(win, { threshold: 0.25 }, ([e]) => {
    const was = winVisible
    winVisible = e.isIntersecting
    if (winVisible && !was) {
      winLast = performance.now()
      requestAnimationFrame(winTick)
    }
  })

  // the window leans towards the pointer a little, and its edge lights up there
  if (!reduced && matchMedia('(hover: hover)').matches) {
    winMain.addEventListener('pointermove', (e) => {
      const r = winMain.getBoundingClientRect()
      const x = clamp((e.clientX - r.left) / r.width, 0, 1)
      const y = clamp((e.clientY - r.top) / r.height, 0, 1)
      frame.style.setProperty('--ry', `${((x - 0.5) * 3).toFixed(2)}deg`)
      frame.style.setProperty('--rx', `${((0.5 - y) * 2.2).toFixed(2)}deg`)
      frame.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
      frame.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
    })
    winMain.addEventListener('pointerleave', () => {
      for (const k of ['--rx', '--ry', '--mx', '--my']) frame.style.removeProperty(k)
    })
  }

  // it stands up as it scrolls into view
  function winEnter() {
    if (reduced) return
    const r = winMain.getBoundingClientRect()
    const p = easeOut(clamp((innerHeight - r.top) / (innerHeight * 0.72), 0, 1))
    frame.style.setProperty('--tilt', `${((1 - p) * 16).toFixed(2)}deg`)
    frame.style.setProperty('--sc', (0.92 + 0.08 * p).toFixed(4))
  }

  show(0, false)

  /* ----- the three optional modules ----- */

  const mods = opts.mods
  const modOn = { track: true, gis: true, ai: true }
  const cmdEl = $('#mod-cmd')
  const jarNote = $('#jar-note')
  const cmdTitle = $('#cmd-title')
  let cmdNo = 0
  let modTouched = false

  // What to run for the chosen modules. The profiles are the ones the backend really has:
  // full (default), basic, and one "-only" profile per module. Two modules: full package,
  // then one switch at startup.
  function plan() {
    const on = KEYS.filter((k) => modOn[k])
    const comment = (key, values) => `# ${spaced(fill(mods.comments[key], values || {}))}`
    if (on.length === 3) {
      return {
        title: mods.cmd,
        note: mods.notes.all,
        copy: PACK,
        lines: [{ c: comment('all') }, { pre: '$ ', text: PACK }]
      }
    }
    if (on.length === 0) {
      return {
        title: mods.cmd,
        note: mods.notes.none,
        copy: `${PACK} -Pbasic,'!full'`,
        lines: [{ c: comment('none') }, { pre: '$ ', text: `${PACK} \\` }, { pad: '    ', hl: "-Pbasic,'!full'" }]
      }
    }
    if (on.length === 1) {
      return {
        title: mods.cmd,
        note: fill(mods.notes.one, { key: on[0] }),
        copy: `${PACK} -P${on[0]}-only,'!full'`,
        lines: [
          { c: comment('one', { name: mods.names[on[0]] }) },
          { pre: '$ ', text: `${PACK} \\` },
          { pad: '    ', hl: `-P${on[0]}-only,'!full'` }
        ]
      }
    }
    const off = KEYS.find((k) => !modOn[k])
    return {
      title: mods.cmdRun,
      note: fill(mods.notes.two, { key: off }),
      idle: off,
      copy: `${PACK}\n${ENV[off]}=false`,
      lines: [
        { c: comment('two') },
        { pre: '$ ', text: PACK },
        { c: comment('off', { name: mods.names[off] }) },
        { pad: '', hl: `${ENV[off]}=false` }
      ]
    }
  }

  function renderMods(animate) {
    const p = plan()
    for (const k of KEYS) {
      $(`.mod[data-mod="${k}"]`).setAttribute('aria-pressed', String(modOn[k]))
      const seg = $(`.jar-seg[data-mod="${k}"]`)
      seg.classList.toggle('off', !modOn[k] && p.idle !== k)
      seg.classList.toggle('idle', p.idle === k)
      $$(`.mm-i[data-mod="${k}"]`).forEach((item) => item.classList.toggle('off', !modOn[k]))
    }
    jarNote.textContent = p.note
    cmdTitle.textContent = p.title
    cmdEl.dataset.copy = p.copy

    const no = ++cmdNo
    cmdEl.textContent = ''
    let typed = null
    p.lines.forEach((ln, i) => {
      if (i) cmdEl.append('\n')
      if (ln.c) {
        cmdEl.append(el('span', 'c', ln.c))
      } else if (ln.text) {
        cmdEl.append(el('span', 'p', ln.pre), ln.text)
      } else {
        typed = el('span', 'hl', ln.hl)
        cmdEl.append(ln.pad, typed)
      }
    })
    if (typed && animate && !reduced) typeText(typed, typed.textContent, 16, () => !dead && no === cmdNo)
  }

  $$('button.mod').forEach((b) =>
    b.addEventListener('click', () => {
      modTouched = true
      modOn[b.dataset.mod] = !modOn[b.dataset.mod]
      renderMods(true)
    })
  )
  renderMods(false)

  // the first time it is scrolled to, it switches one module off and on by itself
  watch($('#mods-out'), { threshold: 0.6 }, async (entries, io) => {
    if (!entries.some((e) => e.isIntersecting)) return
    io.disconnect()
    if (reduced) return
    await sleep(1300)
    if (dead || modTouched) return
    modOn.ai = false
    renderMods(true)
    await sleep(2600)
    if (dead || modTouched) return
    modOn.ai = true
    renderMods(true)
  })

  $$('[data-copy]').forEach((b) => b.addEventListener('click', () => copyText($(`#${b.dataset.copy}`).dataset.copy, b)))

  /* ----- three commands, typed out ----- */

  const termBody = $('#term-body')
  const stepEls = $$('#steps li')
  let termNo = 0

  function setStep(n) {
    stepEls.forEach((li, i) => {
      li.classList.toggle('done', i < n)
      li.classList.toggle('on', i === n)
    })
  }

  async function playTerm(instant) {
    const no = ++termNo
    const alive = () => !dead && no === termNo
    termBody.textContent = ''
    setStep(-1)
    if (!instant) await sleep(300)
    for (const item of opts.term) {
      if (!alive()) return
      setStep(item.step)
      const row = el('div', item.c ? 't-line c' : 't-line')
      const x = el('span', 'x')
      if (item.c) {
        x.textContent = item.c
        row.append(x)
        termBody.append(row)
        if (!instant) await sleep(460)
        continue
      }
      row.append(el('span', 'p', '$'), x)
      termBody.append(row)
      if (instant) x.textContent = item.cmd
      else if (!(await typeText(x, item.cmd, 13, alive))) return
      const btn = el('button', 'mini', opts.ui.copy)
      btn.type = 'button'
      btn.addEventListener('click', () => copyText(item.cmd, btn))
      row.append(btn)
      if (!instant) await sleep(560)
    }
    if (!alive()) return
    const last = el('div', 't-line')
    last.append(el('span', 'p', '$'), el('i', 'caret'))
    termBody.append(last)
  }

  watch($('#term'), { threshold: 0.45 }, (entries, io) => {
    if (!entries.some((e) => e.isIntersecting)) return
    io.disconnect()
    playTerm(reduced)
  })

  $('#term-replay').addEventListener('click', () => playTerm(false))

  /* ----- reading routes: pick what you want to do, get three pages in order ----- */

  const routeTabs = $$('.route-tab')
  const routePanels = $$('.route-panel')
  let routeTimer = 0

  function pickRoute(i) {
    routeTabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === i))
      t.tabIndex = k === i ? 0 : -1
    })
    // un-hiding a panel restarts the animations of the line and its three stops
    routePanels.forEach((p, k) => (p.hidden = k !== i))
  }

  routeTabs.forEach((t, i) => {
    t.addEventListener('click', () => pickRoute(i))
    // with a mouse, resting on a tab is enough
    t.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return
      clearTimeout(routeTimer)
      routeTimer = setTimeout(() => pickRoute(i), 110)
    })
    t.addEventListener('pointerleave', () => clearTimeout(routeTimer))
    t.addEventListener('keydown', (e) => {
      const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
      if (!step) return
      e.preventDefault()
      const next = (i + step + routeTabs.length) % routeTabs.length
      pickRoute(next)
      routeTabs[next].focus()
    })
  })

  /* ----- closing: the light on the horizon follows the pointer ----- */

  const band = $('#cta-band')
  band.addEventListener('pointermove', (e) => {
    const r = band.getBoundingClientRect()
    band.style.setProperty('--sx', `${clamp(((e.clientX - r.left) / r.width) * 100, 16, 84).toFixed(1)}%`)
  })
  band.addEventListener('pointerleave', () => band.style.removeProperty('--sx'))

  /* ----- one scroll handler ----- */

  let queued = false
  function onScroll() {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      if (!dead) winEnter()
    })
  }
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('resize', onScroll)
  winEnter()

  return {
    show,
    playTerm,
    /** The page went dark or light: the product window follows. */
    setTheme(dark) {
      theme = dark ? 'dark' : 'light'
      show(cur, false)
    },
    destroy() {
      dead = true
      clearTimeout(routeTimer)
      watchers.forEach((io) => io.disconnect())
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
    }
  }
}
