import TimerState from './lib/timerstate.js'

class Timer {
  constructor (config) {
    // Clean config
    if (config === +config) { config = { duration: config }}
    config = Object.assign({ constrain: true }, config)

    // You access that property at your own risk
    Object.defineProperty(this, '__STATE__', {
      value: new TimerState(),
      enumerable: false
    })

    // Initialize the object
    this.__STATE__.duration   = config.duration
    this.__STATE__.delay      = config.delay
    this.__STATE__.easing     = config.easing
    this.__STATE__.speed      = config.speed
    this.__STATE__.loopLength = config.loops
    this.__STATE__.steps      = config.steps
    this.__STATE__.constrain  = config.constrain
  }


  // PROPERTIES
  // --------------------------------------------------------------------------

  // Timer.startTime
  set startTime (value) { throw new Error("Timer.startTime is a readonly property") }
  get startTime () { return this.__STATE__.userTime }

  // Timer.delay
  set delay (value) { this.__STATE__.delay = value }
  get delay () { return this.__STATE__.delay }

  // Timer.speed
  set speed (value) { this.__STATE__.speed = value }
  get speed () { return this.__STATE__.speed }

  // Timer.duration
  set duration (value) { this.__STATE__.duration = value }
  get duration () { return this.__STATE__.duration }

  // Timer.easing
  set easing (value) { this.__STATE__.easing = value }
  get easing () { return this.__STATE__.easing.ease }

  // Timer.constrain
  set constrain (value) { this.__STATE__.constrain = value }
  get constrain () { return this.__STATE__.constrain }

  // Timer.loops
  set loops (value) { this.__STATE__.loopLength = value }
  get loops () { return this.__STATE__.loopLength }

  // Timer.steps.length
  // Timer.steps.position
  set steps (value) { this.__STATE__.steps = value }
  get steps () {
    var timer = this

    return {
      set length(value) { timer.__STATE__.steps = { length: value } },
      get length() { return timer.__STATE__.steps.length },

      set position(value) { timer.__STATE__.steps = { position: value } },
      get position() { return timer.__STATE__.steps.position }
    }
  }

  // Timer.is.playing
  // Timer.is.paused
  set is (value) { throw new Error("Timer.is is a readonly property") }
  get is () {
    var startTime = this.__STATE__.startTime,
        speed     = this.__STATE__.speed,
        output    = {
          playing: startTime !== null,
          paused : startTime !== null && speed === 0
        }

    if (this.constrain) {
      if (speed > 0 && this.position.time >= 1) { this.stop() }
      if (speed < 0 && this.position.time <= 0) { this.stop() }
    }

    return Object.freeze(output)
  }

  // Timer.position.time
  // Timer.position.value
  // Timer.position.loop
  set position (value) { throw new Error("Timer.position is a readonly property") }
  get position () {
    var begin, end, now, ease, speed, dur, pos,
        startTime = this.__STATE__.startTime,
        output    = {
          value : 0,
          time  : 0,
          loop  : 1
        }

    if (startTime === null) { return output }

    speed = this.__STATE__.speed
    dur   = this.__STATE__.duration
    now   = Date.now()

    if (speed === 0) {
      now = this.__STATE__.pauseTime
    }
    else if (speed < 0) {
      now = this.__STATE__.backTime * 2 - now
    }

    begin = this.__STATE__.begin
    end   = this.__STATE__.end

    pos   = Math.ceil((now - begin) / dur)

    if (pos < 1) { pos = 1 }
    if (this.loops > 0 && pos > this.loops) { pos = this.loops }

    begin += (pos - 1) * dur
    end   += (pos - 1) * dur
    output.loop = pos

    if (this.constrain) {
      if (now <= begin) { return output }
      if (now > end) { this.stop(); return output }
    }

    ease = this.__STATE__.easing

    output.time  = ease.getTime(begin, end, now)

    if (this.steps.length > 0) {
      let fn = this.steps.position === "end" ? "floor" : "ceil"
      let step = Math[fn](output.time * this.steps.length)
      output.value = ease.ease(step / this.steps.length)
    } else {
      output.value = ease.getValue(begin, end, now)
    }

    return Object.freeze(output)
  }


  // METHODS
  // --------------------------------------------------------------------------

  play () {
    if (this.__STATE__.userTime === null) {
      this.__STATE__.userTime = Date.now()
    } else if (this.__STATE__.speed === 0) {
      this.__STATE__.speed = this.__STATE__.prevSpeed
    }
  }

  pause () {
    this.speed = 0
  }

  stop () {
    this.__STATE__.userTime = null
  }

  freeze() {
    if (arguments.length < 2 && this.startTime === null) {
      throw new Error('The timer must be started with the play() function first')
    }

    var begin = (arguments.length > 1 ? arguments[0] : this.startTime) + this.delay,
        now   = arguments[1] || arguments[0] || Date.now(),
        end   = begin + this.duration,
        step  = this.steps.position === "end" ? "floor" : "ceil",
        time  = this.__STATE__.easing.getTime(begin, end, now),
        value = this.__STATE__.easing.getValue(begin, end, now)

    if (this.steps.length > 0) {
      let stepVal = Math[step](time * this.steps.length)
      value = this.__STATE__.easing.ease(stepVal / this.steps.length)
    }

    if (this.constrain) {
      if (time < 0) { return { time: 0, value: 0 } }
      if (time > 1) { return { time: 1, value: 1 } }
    }

    return { time, value }
  }
}

Object.defineProperties(Timer.prototype, {
  'startTime': { enumerable: true },
  'delay'    : { enumerable: true },
  'speed'    : { enumerable: true },
  'duration' : { enumerable: true },
  'easing'   : { enumerable: true },
  'constrain': { enumerable: true },
  'loops'    : { enumerable: true },
  'steps'    : { enumerable: true },
  'is'       : { enumerable: true },
  'position' : { enumerable: true }
})

export { Timer }
