// The six small diagrams in the "built in" section of the home page.
// One plays at a time: they take turns while the section is on screen, and the one under the
// pointer (or holding the focus) takes over. What a diagram does while it plays is in home.css,
// keyed on .is-on; this file only decides whose turn it is and feeds the values that change.

const HEX = '0123456789abcdef'
// how long each diagram plays; the line along the top of the cell in home.css takes the same time
const TURN = 4200

function noise(n, group) {
  let s = ''
  for (let i = 0; i < n; i++) {
    if (group && i && i % group === 0) s += ' '
    s += HEX[Math.floor(Math.random() * 16)]
  }
  return s
}

/**
 * @param {HTMLElement} root the .ms-home element
 */
export function mountFeatures(root) {
  const grid = root.querySelector('#feats')
  const cells = grid ? [...grid.querySelectorAll('.feat')] : []
  if (!cells.length) return { setTheme() {}, destroy() {} }

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  let on = -1
  let visible = false
  let held = false
  let turnTimer = 0
  let flipTimer = 0
  let noiseTimer = 0

  function quiet() {
    clearInterval(flipTimer)
    clearInterval(noiseTimer)
    flipTimer = noiseTimer = 0
  }

  function play(i) {
    if (i === on) return
    quiet()
    if (on >= 0) {
      cells[on].classList.remove('is-on')
      cells[on].querySelector('.fx').dataset.v = '0'
    }
    on = i
    if (i < 0) return
    const cell = cells[i]
    const fx = cell.querySelector('.fx')
    cell.classList.add('is-on')
    if (reduced) return

    // permissions and tenants have two states and go back and forth between them
    if (fx.matches('.fx-perm, .fx-tenant')) {
      flipTimer = setInterval(() => (fx.dataset.v = fx.dataset.v === '0' ? '1' : '0'), 1500)
    }

    const codes = [...fx.querySelectorAll('[data-hex]')]
    if (!codes.length) return
    const draw = (c) => (c.textContent = noise(Number(c.dataset.hex), Number(c.dataset.group) || 0))
    if (fx.matches('.fx-gm')) {
      // ciphertext: it never repeats, one row changes at a time
      let n = 0
      noiseTimer = setInterval(() => draw(codes[n++ % codes.length]), 130)
      return
    }
    // a signed request: the three values are new on every call, then they stay
    let n = 0
    noiseTimer = setInterval(() => {
      n++
      for (const c of codes) {
        if (n >= 7 && c.dataset.hex === 'time') c.textContent = String(Date.now())
        else if (c.dataset.hex === 'time') c.textContent = String(Date.now() - Math.floor(Math.random() * 9e5))
        else draw(c)
      }
      if (n >= 7) {
        clearInterval(noiseTimer)
        noiseTimer = 0
      }
    }, 70)
  }

  function turns(run) {
    clearInterval(turnTimer)
    turnTimer = 0
    if (run && !reduced) {
      turnTimer = setInterval(() => {
        if (!held) play((on + 1) % cells.length)
      }, TURN)
    }
  }

  cells.forEach((cell, i) => {
    const take = () => {
      held = true
      play(i)
    }
    // once it is let go, the cell keeps its turn for a full round before the next one starts
    const leave = () => {
      held = false
      turns(visible)
    }
    cell.addEventListener('pointerenter', take)
    cell.addEventListener('pointerleave', leave)
    cell.addEventListener('focus', take)
    cell.addEventListener('blur', leave)
  })

  const io = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting
      if (visible && on < 0 && !reduced) play(0)
      if (!visible && !held) play(-1)
      turns(visible)
    },
    { threshold: 0.2 }
  )
  io.observe(grid)

  return {
    setTheme() {},
    destroy() {
      io.disconnect()
      quiet()
      clearInterval(turnTimer)
    }
  }
}
