// Utils to bezier conversion
// assuming cubic bezier with control points (0, 0), (x1, y1), (x2, y2), and (1, 1).
const BEZIER = {
  n_for_t (t, n1, n2) {
    var nt = 1 - t
    return 3 * Math.pow(nt, 2) * t * n1 + 3 * nt * Math.pow(t, 2) * n2 + Math.pow(t, 3)
  },

  t_for_n (n, n1, n2) {
    var gn, gt, i = 0,
        mint = 0,
        maxt = 1

    while (i < 30) {
      gt = (mint + maxt) / 2
      gn = BEZIER.n_for_t(gt, n1, n2)

      if (n < gn) { maxt = gt }
      else        { mint = gt }

      i++
    }

    return (mint + maxt) / 2
  },

  makeFunction (x1, y1, x2, y2) {
    if (x1 > 1) { x1 = 1 }
    if (x1 < 0) { x1 = 0 }
    if (x2 > 1) { x2 = 1 }
    if (x2 < 0) { x2 = 0 }

    return function (t) {
      if (t === 0) { return 0 }
      if (t === 1) { return 1 }
      return BEZIER.n_for_t(BEZIER.t_for_n(t, x1, x2), y1, y2)
    }
  }
}

class Easing {
  constructor (easing) {
    if (Array.isArray(easing) && easing.length === 4) {
      easing = BEZIER.makeFunction(...easing)
    }

    this.ease = (typeof easing === 'function' && easing) || Easing.fn[easing] || Easing.fn.linear
  }

  getValue (begin, end, now) {
    if (begin === end) {
      throw new Error('A zero time animation as no meaning!')
    }

    return this.ease(this.getTime(begin, end, now))
  }

  getTime (begin, end, now) {
    if (begin === end) {
      throw new Error('A zero time animation as no meaning!')
    }

    return (now - begin) / (end - begin)
  }
}

Easing.fn = {
  // t : current time: 0 < t < 1 on the time axis

  linear (t) {
    return t
  },

  easeInQuad (t) {
    return Math.pow(t, 2)
  },

  easeOutQuad (t) {
    return -1 * t * (t - 2)
  },

  easeInOutQuad (t) {
    t = t * 2
    if (t < 1) { return Math.pow(t, 2) / 2 }
    t = t - 1
    return (t * (t - 2) - 1) / -2
  },

  easeInCubic (t) {
    return Math.pow(t, 3)
  },

  easeOutCubic (t) {
    t = t - 1
    return Math.pow(t, 3) + 1
  },

  easeInOutCubic (t) {
    t = t * 2
    if (t < 1) { return Math.pow(t, 3) / 2 }
    t = t - 2
    return (Math.pow(t, 3) + 2) / 2
  },

  easeInQuart (t) {
    return Math.pow(t, 4)
  },

  easeOutQuart (t) {
    t = t - 1
    return -1 * Math.pow(t, 4) + 1
  },

  easeInOutQuart (t) {
    t = t * 2
    if (t < 1) { return Math.pow(t, 4) / 2 }
    t = t - 2
    return (Math.pow(t, 4) - 2) / -2
  },

  easeInQuint (t) {
    return Math.pow(t, 5)
  },

  easeOutQuint (t) {
    t = t - 1
    return Math.pow(t, 5) + 1
  },

  easeInOutQuint (t) {
    t = t * 2
    if (t < 1) { return Math.pow(t, 5) / 2 }
    t = t - 2
    return (Math.pow(t, 5) + 2) / 2
  },

  easeInSine (t) {
    return -1 * Math.cos(t * (Math.PI/2)) + 1
  },

  easeOutSine (t) {
    return Math.sin(t * Math.PI/2)
  },

  easeInOutSine (t) {
    return (Math.cos(t * Math.PI) - 1) / -2
  },

  easeInExpo (t) {
    return (t === 0) ? 0 : Math.pow(2, 10 * (t - 1))
  },

  easeOutExpo (t) {
    return (t === 1) ? 1 : 1 - Math.pow(2, -10 * t)
  },

  easeInOutExpo (t) {
    if (t === 0) { return 0 }
    if (t === 1) { return 1 }
    t = t * 2
    if (t < 1) { return Math.pow(2, 10 * (t - 1)) / 2 }
    t = t - 1
    return (2 - Math.pow(2, -10 * t)) / 2
  },

  easeInCirc (t) {
    return -1 * (Math.sqrt(1 - Math.pow(t, 2)) - 1)
  },

  easeOutCirc (t) {
    t = t - 1
    return Math.sqrt(1 - Math.pow(t, 2))
  },

  easeInOutCirc (t) {
    t = t * 2
    if (t < 1) { return (Math.sqrt(1 - Math.pow(t, 2)) - 1) / -2 }
    t = t - 2
    return (Math.sqrt(1 - Math.pow(t, 2)) + 1) / 2
  },

  easeInElastic (t) {
    var p = 0.3, s = p / (2 * Math.PI) * Math.asin(1)
    if (t === 0) { return 0 }
    if (t === 1) { return 1 }
    t = t - 1
    return -(Math.pow(2, 10 * t) * Math.sin((t - s) * (2 * Math.PI) / p))
  },

  easeOutElastic (t) {
    var p = 0.3, s = p / (2 * Math.PI) * Math.asin(1)
    if (t === 0) { return 0 }
    if (t === 1) { return 1 }
    return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1
  },

  easeInOutElastic (t) {
      var p = 1.5 * 0.3, s = p / (2 * Math.PI) * Math.asin(1)
      if (t === 0) { return 0 }
      t = t * 2
      if (t === 2) { return 1 }
      t = t - 1
      if (t < 0) { return -0.5 * (Math.pow(2, 10 * t) * Math.sin((t - s) * (2 * Math.PI) / p)) }
      return 0.5 * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1
  },

  easeInBack (t) {
    var s = 1.70158
    return Math.pow(t, 2) * ((s + 1) * t - s)
  },

  easeOutBack (t) {
    var s = 1.70158
    t = t - 1
    return Math.pow(t, 2) * ((s + 1) * t + s) + 1
  },

  easeInOutBack (t) {
    var s = 1.70158 * 1.525
    t = t * 2
    if (t < 1) { return (Math.pow(t, 2) * (s * t + t - s)) / 2 }
    t = t - 2
    return (Math.pow(t, 2) * (s * t + t + s) + 2) / 2
  },

  easeInBounce (t) {
    return 1 - Easing.fn.easeOutBounce (1 - t)
  },

  easeOutBounce (t) {
    var a = 2.625, b = 0.984375, c = 2.75
    if (t < (1/c)) { a = 0; b = 0 }
    else if (t < (2/c)) { a = 1.5; b = 0.75 }
    else if (t < (2.5/c)) { a = 2.25; b = 0.9375 }
    t = t - a/c
    return 7.5625 * Math.pow(t, 2) + b
  },

  easeInOutBounce(t) {
    if (t < 0.5) { return Easing.fn.easeInBounce (t * 2) * 0.5 }
    return Easing.fn.easeOutBounce (t * 2 - 1) * 0.5 + 0.5
  }
}

export default Easing
