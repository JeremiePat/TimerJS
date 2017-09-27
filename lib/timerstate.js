import { toInt, toNullTime, toPosInt } from './utils.js'
import Easing from './easing.js'

class TimerState {
  constructor() {
    this.data = {
      userTime  : null,
      startTime : null,
      easing    : new Easing(),
      loopLength: 1,
      constrain : true,
      speed     : 1,
      steps     : {
        length   : 0,
        position : "end"
      }
    }
  }

  // User data
  // --------------------------------------------------------------------------

  // Accessor to the delay set by the user
  get delay () { return this.data.delay }
  set delay (value) {
    var newVal = toInt(value, 0),
        oldVal = this.delay

    if (this.begin) {
      this.begin = this.begin - oldVal + newVal
    }

    this.data.delay = newVal
  }


  // Accessor to the start time set by the user
  get userTime () { return this.data.userTime }
  set userTime (isNull) {
    this.data.userTime = toNullTime(isNull)
    this.startTime = this.data.userTime
  }

  // Accessor to the duration set by the user
  get duration () { return this.data.duration }
  set duration (value) {
      // NEED TO INVESTIGATE IF IT'S THE RIGHT BEHAVIOR

      // var now    = +new Date(),
      //     shift  = this.easing.getTime(this.begin, this.end, now),
      //     newVal = toPosInt(value, 0),
      //     oldVal = this.duration

      // if (this.begin && this.end - oldVal + newVal > now) {
      //     this.begin -= Math.round(shift * (newVal - oldVal))
      // }

      // this.data.duration = newVal

      this.data.duration = toPosInt(value, 0)
  }

  // Accessor to the constrain set by the user
  get constrain () { return this.data.constrain }
  set constrain (value) {
    this.data.constrain = !!value
  }

  // Accessor to the number of loops set by the user
  get loopLength () { return this.data.loopLength }
  set loopLength (value) {
      this.data.loopLength = toPosInt(value, 1)
  }

  // Accessor to the steps set by the user
  get steps () { return this.data.steps }
  set steps (value) {
    if (value && (value.length || value === +value)) {
      this.data.steps.length = toPosInt(value.length || value, 0)
    }

    if (value && value.position) {
      this.data.steps.position = value.position === "start" ||
                                 value.position === "end" ?
                                 value.position : "end"
    }
  }


  // Easing computation
  // --------------------------------------------------------------------------

  get easing () { return this.data.easing }
  set easing (value) {
    this.data.easing = new Easing(value)
  }


  // Animation speed factor
  // --------------------------------------------------------------------------

  // Current speed factor
  get speed () { return this.data.speed }
  set speed (value) {
    var shift,
        now    = +new Date(),
        newVal = toInt(value, 1),
        factor = Math.abs(newVal)

    this.pauseTime = null
    this.backTime  = null

    if (newVal === 0) { this.pauseTime = now }
    if (newVal   < 0) { this.backTime  = now }

    this.prevSpeed  = this.data.speed
    this.data.speed = newVal

    shift = now - this.begin
    this.begin = now - shift / (factor === 0 ? 1 : factor)
  }

  // Previous speed factor
  get prevSpeed () { return this.data.prevSpeed }
  set prevSpeed (value) {
    this.data.prevSpeed = toInt(value, 1)
  }


  // Internal time position
  // --------------------------------------------------------------------------

  // Keep the first time the Timer is played
  get startTime () { return this.data.startTime }
  set startTime (isNull) {
    this.data.startTime = toNullTime(isNull)

    // When the value is set (meaning, the Timer start)
    // The pause and back times MUST be reinitialized
    if(this.startTime !== null && this.pauseTime !== null) {
      this.pauseTime = this.startTime
    }

    if(this.startTime !== null && this.backTime !== null) {
      this.backTime = this.startTime
    }

    this.begin = this.startTime + this.delay
  }

  // Keep the last time the Timer has been paused
  get pauseTime () { return this.data.pauseTime }
  set pauseTime (isNull) {
    var now    = Date.now(),
        newVal = toNullTime(isNull),
        oldVal = this.pauseTime

    if(oldVal !== null && newVal === null) {
      this.begin += now - oldVal
    }

    this.data.pauseTime = newVal
  }

  // Keep the last time the Timer has gone backward
  get backTime () { return this.data.backTime }
  set backTime (isNull) {
    var now    = Date.now(),
        newVal = toNullTime(isNull),
        oldVal = this.backTime

    if(oldVal !== null && newVal === null) {
      this.begin += (now - oldVal) * 2
    }

    this.data.backTime = newVal
  }

  // Absolute position of the timer
  // --------------------------------------------------------------------------

  // Begin time
  get begin () { return this.data.begin }
  set begin (value) {
    this.data.begin = toPosInt(value, 0)
  }

  // End time (readonly)
  get end() {
    var speed = Math.abs(this.data.speed)

    return this.begin + this.duration / (speed === 0 ? 1 : speed)
  }
}

export default TimerState
