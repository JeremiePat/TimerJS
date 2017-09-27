(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _timerstate = __webpack_require__(1);

var _timerstate2 = _interopRequireDefault(_timerstate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
  function Timer(config) {
    _classCallCheck(this, Timer);

    // Clean config
    if (config === +config) {
      config = { duration: config };
    }
    config = Object.assign({ constrain: true }, config);

    // You access that property at your own risk
    Object.defineProperty(this, '__STATE__', {
      value: new _timerstate2.default(),
      enumerable: false
    });

    // Initialize the object
    this.__STATE__.duration = config.duration;
    this.__STATE__.delay = config.delay;
    this.__STATE__.easing = config.easing;
    this.__STATE__.speed = config.speed;
    this.__STATE__.loopLength = config.loops;
    this.__STATE__.steps = config.steps;
    this.__STATE__.constrain = config.constrain;
  }

  // PROPERTIES
  // --------------------------------------------------------------------------

  // Timer.startTime


  _createClass(Timer, [{
    key: 'play',


    // METHODS
    // --------------------------------------------------------------------------

    value: function play() {
      if (this.__STATE__.userTime === null) {
        this.__STATE__.userTime = Date.now();
      } else if (this.__STATE__.speed === 0) {
        this.__STATE__.speed = this.__STATE__.prevSpeed;
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.speed = 0;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.__STATE__.userTime = null;
    }
  }, {
    key: 'freeze',
    value: function freeze() {
      if (arguments.length < 2 && this.startTime === null) {
        throw new Error('The timer must be started with the play() function first');
      }

      var begin = (arguments.length > 1 ? arguments[0] : this.startTime) + this.delay,
          now = arguments[1] || arguments[0] || Date.now(),
          end = begin + this.duration,
          step = this.steps.position === "end" ? "floor" : "ceil",
          time = this.__STATE__.easing.getTime(begin, end, now),
          value = this.__STATE__.easing.getValue(begin, end, now);

      if (this.steps.length > 0) {
        var stepVal = Math[step](time * this.steps.length);
        value = this.__STATE__.easing.ease(stepVal / this.steps.length);
      }

      if (this.constrain) {
        if (time < 0) {
          return { time: 0, value: 0 };
        }
        if (time > 1) {
          return { time: 1, value: 1 };
        }
      }

      return { time: time, value: value };
    }
  }, {
    key: 'startTime',
    set: function set(value) {
      throw new Error("Timer.startTime is a readonly property");
    },
    get: function get() {
      return this.__STATE__.userTime;
    }

    // Timer.delay

  }, {
    key: 'delay',
    set: function set(value) {
      this.__STATE__.delay = value;
    },
    get: function get() {
      return this.__STATE__.delay;
    }

    // Timer.speed

  }, {
    key: 'speed',
    set: function set(value) {
      this.__STATE__.speed = value;
    },
    get: function get() {
      return this.__STATE__.speed;
    }

    // Timer.duration

  }, {
    key: 'duration',
    set: function set(value) {
      this.__STATE__.duration = value;
    },
    get: function get() {
      return this.__STATE__.duration;
    }

    // Timer.easing

  }, {
    key: 'easing',
    set: function set(value) {
      this.__STATE__.easing = value;
    },
    get: function get() {
      return this.__STATE__.easing.ease;
    }

    // Timer.constrain

  }, {
    key: 'constrain',
    set: function set(value) {
      this.__STATE__.constrain = value;
    },
    get: function get() {
      return this.__STATE__.constrain;
    }

    // Timer.loops

  }, {
    key: 'loops',
    set: function set(value) {
      this.__STATE__.loopLength = value;
    },
    get: function get() {
      return this.__STATE__.loopLength;
    }

    // Timer.steps.length
    // Timer.steps.position

  }, {
    key: 'steps',
    set: function set(value) {
      this.__STATE__.steps = value;
    },
    get: function get() {
      var timer = this;

      return {
        set length(value) {
          timer.__STATE__.steps = { length: value };
        },
        get length() {
          return timer.__STATE__.steps.length;
        },

        set position(value) {
          timer.__STATE__.steps = { position: value };
        },
        get position() {
          return timer.__STATE__.steps.position;
        }
      };
    }

    // Timer.is.playing
    // Timer.is.paused

  }, {
    key: 'is',
    set: function set(value) {
      throw new Error("Timer.is is a readonly property");
    },
    get: function get() {
      var startTime = this.__STATE__.startTime,
          speed = this.__STATE__.speed,
          output = {
        playing: startTime !== null,
        paused: startTime !== null && speed === 0
      };

      if (this.constrain) {
        if (speed > 0 && this.position.time >= 1) {
          this.stop();
        }
        if (speed < 0 && this.position.time <= 0) {
          this.stop();
        }
      }

      return Object.freeze(output);
    }

    // Timer.position.time
    // Timer.position.value
    // Timer.position.loop

  }, {
    key: 'position',
    set: function set(value) {
      throw new Error("Timer.position is a readonly property");
    },
    get: function get() {
      var begin,
          end,
          now,
          ease,
          speed,
          dur,
          pos,
          startTime = this.__STATE__.startTime,
          output = {
        value: 0,
        time: 0,
        loop: 1
      };

      if (startTime === null) {
        return output;
      }

      speed = this.__STATE__.speed;
      dur = this.__STATE__.duration;
      now = Date.now();

      if (speed === 0) {
        now = this.__STATE__.pauseTime;
      } else if (speed < 0) {
        now = this.__STATE__.backTime * 2 - now;
      }

      begin = this.__STATE__.begin;
      end = this.__STATE__.end;

      pos = Math.ceil((now - begin) / dur);

      if (pos < 1) {
        pos = 1;
      }
      if (this.loops > 0 && pos > this.loops) {
        pos = this.loops;
      }

      begin += (pos - 1) * dur;
      end += (pos - 1) * dur;
      output.loop = pos;

      if (this.constrain) {
        if (now <= begin) {
          return output;
        }
        if (now > end) {
          this.stop();return output;
        }
      }

      ease = this.__STATE__.easing;

      output.time = ease.getTime(begin, end, now);

      if (this.steps.length > 0) {
        var fn = this.steps.position === "end" ? "floor" : "ceil";
        var step = Math[fn](output.time * this.steps.length);
        output.value = ease.ease(step / this.steps.length);
      } else {
        output.value = ease.getValue(begin, end, now);
      }

      return Object.freeze(output);
    }
  }]);

  return Timer;
}();

Object.defineProperties(Timer.prototype, {
  'startTime': { enumerable: true },
  'delay': { enumerable: true },
  'speed': { enumerable: true },
  'duration': { enumerable: true },
  'easing': { enumerable: true },
  'constrain': { enumerable: true },
  'loops': { enumerable: true },
  'steps': { enumerable: true },
  'is': { enumerable: true },
  'position': { enumerable: true }
});

exports.Timer = Timer;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(2);

var _easing = __webpack_require__(3);

var _easing2 = _interopRequireDefault(_easing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TimerState = function () {
  function TimerState() {
    _classCallCheck(this, TimerState);

    this.data = {
      userTime: null,
      startTime: null,
      easing: new _easing2.default(),
      loopLength: 1,
      constrain: true,
      speed: 1,
      steps: {
        length: 0,
        position: "end"
      }
    };
  }

  // User data
  // --------------------------------------------------------------------------

  // Accessor to the delay set by the user


  _createClass(TimerState, [{
    key: 'delay',
    get: function get() {
      return this.data.delay;
    },
    set: function set(value) {
      var newVal = (0, _utils.toInt)(value, 0),
          oldVal = this.delay;

      if (this.begin) {
        this.begin = this.begin - oldVal + newVal;
      }

      this.data.delay = newVal;
    }

    // Accessor to the start time set by the user

  }, {
    key: 'userTime',
    get: function get() {
      return this.data.userTime;
    },
    set: function set(isNull) {
      this.data.userTime = (0, _utils.toNullTime)(isNull);
      this.startTime = this.data.userTime;
    }

    // Accessor to the duration set by the user

  }, {
    key: 'duration',
    get: function get() {
      return this.data.duration;
    },
    set: function set(value) {
      // NEED TO INVESTIGATE IF IT'S THE RIGHT BEHAVIOR

      // var now    = +new Date(),
      //     shift  = this.easing.getTime(this.begin, this.end, now),
      //     newVal = toPosInt(value, 0),
      //     oldVal = this.duration

      // if (this.begin && this.end - oldVal + newVal > now) {
      //     this.begin -= Math.round(shift * (newVal - oldVal))
      // }

      // this.data.duration = newVal

      this.data.duration = (0, _utils.toPosInt)(value, 0);
    }

    // Accessor to the constrain set by the user

  }, {
    key: 'constrain',
    get: function get() {
      return this.data.constrain;
    },
    set: function set(value) {
      this.data.constrain = !!value;
    }

    // Accessor to the number of loops set by the user

  }, {
    key: 'loopLength',
    get: function get() {
      return this.data.loopLength;
    },
    set: function set(value) {
      this.data.loopLength = (0, _utils.toPosInt)(value, 1);
    }

    // Accessor to the steps set by the user

  }, {
    key: 'steps',
    get: function get() {
      return this.data.steps;
    },
    set: function set(value) {
      if (value && (value.length || value === +value)) {
        this.data.steps.length = (0, _utils.toPosInt)(value.length || value, 0);
      }

      if (value && value.position) {
        this.data.steps.position = value.position === "start" || value.position === "end" ? value.position : "end";
      }
    }

    // Easing computation
    // --------------------------------------------------------------------------

  }, {
    key: 'easing',
    get: function get() {
      return this.data.easing;
    },
    set: function set(value) {
      this.data.easing = new _easing2.default(value);
    }

    // Animation speed factor
    // --------------------------------------------------------------------------

    // Current speed factor

  }, {
    key: 'speed',
    get: function get() {
      return this.data.speed;
    },
    set: function set(value) {
      var shift,
          now = +new Date(),
          newVal = (0, _utils.toInt)(value, 1),
          factor = Math.abs(newVal);

      this.pauseTime = null;
      this.backTime = null;

      if (newVal === 0) {
        this.pauseTime = now;
      }
      if (newVal < 0) {
        this.backTime = now;
      }

      this.prevSpeed = this.data.speed;
      this.data.speed = newVal;

      shift = now - this.begin;
      this.begin = now - shift / (factor === 0 ? 1 : factor);
    }

    // Previous speed factor

  }, {
    key: 'prevSpeed',
    get: function get() {
      return this.data.prevSpeed;
    },
    set: function set(value) {
      this.data.prevSpeed = (0, _utils.toInt)(value, 1);
    }

    // Internal time position
    // --------------------------------------------------------------------------

    // Keep the first time the Timer is played

  }, {
    key: 'startTime',
    get: function get() {
      return this.data.startTime;
    },
    set: function set(isNull) {
      this.data.startTime = (0, _utils.toNullTime)(isNull);

      // When the value is set (meaning, the Timer start)
      // The pause and back times MUST be reinitialized
      if (this.startTime !== null && this.pauseTime !== null) {
        this.pauseTime = this.startTime;
      }

      if (this.startTime !== null && this.backTime !== null) {
        this.backTime = this.startTime;
      }

      this.begin = this.startTime + this.delay;
    }

    // Keep the last time the Timer has been paused

  }, {
    key: 'pauseTime',
    get: function get() {
      return this.data.pauseTime;
    },
    set: function set(isNull) {
      var now = Date.now(),
          newVal = (0, _utils.toNullTime)(isNull),
          oldVal = this.pauseTime;

      if (oldVal !== null && newVal === null) {
        this.begin += now - oldVal;
      }

      this.data.pauseTime = newVal;
    }

    // Keep the last time the Timer has gone backward

  }, {
    key: 'backTime',
    get: function get() {
      return this.data.backTime;
    },
    set: function set(isNull) {
      var now = Date.now(),
          newVal = (0, _utils.toNullTime)(isNull),
          oldVal = this.backTime;

      if (oldVal !== null && newVal === null) {
        this.begin += (now - oldVal) * 2;
      }

      this.data.backTime = newVal;
    }

    // Absolute position of the timer
    // --------------------------------------------------------------------------

    // Begin time

  }, {
    key: 'begin',
    get: function get() {
      return this.data.begin;
    },
    set: function set(value) {
      this.data.begin = (0, _utils.toPosInt)(value, 0);
    }

    // End time (readonly)

  }, {
    key: 'end',
    get: function get() {
      var speed = Math.abs(this.data.speed);

      return this.begin + this.duration / (speed === 0 ? 1 : speed);
    }
  }]);

  return TimerState;
}();

exports.default = TimerState;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// CONVERTION UTILS
// ----------------------------------------------------------------------------

// Convert value to INT, if the result is NaN, return alt instead of value
function toInt(value, alt) {
  value = +value;

  return value === +value ? value : alt;
}

// Convert value to INT, if the result is NaN or a negative value, return alt instead of value
function toPosInt(value, alt) {
  value = toInt(value, alt);
  return value >= 0 ? value : alt;
}

// Check value and return either null is value was null or a valide timestamp otherwise
function toNullTime(value) {
  if (value === null) {
    return null;
  }
  if (value === +value && value >= 0) {
    return value;
  }
  return Date.now();
}

// Export utilities
// ----------------------------------------------------------------------------
exports.toInt = toInt;
exports.toPosInt = toPosInt;
exports.toNullTime = toNullTime;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Utils to bezier conversion
// assuming cubic bezier with control points (0, 0), (x1, y1), (x2, y2), and (1, 1).
var BEZIER = {
  n_for_t: function n_for_t(t, n1, n2) {
    var nt = 1 - t;
    return 3 * Math.pow(nt, 2) * t * n1 + 3 * nt * Math.pow(t, 2) * n2 + Math.pow(t, 3);
  },
  t_for_n: function t_for_n(n, n1, n2) {
    var gn,
        gt,
        i = 0,
        mint = 0,
        maxt = 1;

    while (i < 30) {
      gt = (mint + maxt) / 2;
      gn = BEZIER.n_for_t(gt, n1, n2);

      if (n < gn) {
        maxt = gt;
      } else {
        mint = gt;
      }

      i++;
    }

    return (mint + maxt) / 2;
  },
  makeFunction: function makeFunction(x1, y1, x2, y2) {
    if (x1 > 1) {
      x1 = 1;
    }
    if (x1 < 0) {
      x1 = 0;
    }
    if (x2 > 1) {
      x2 = 1;
    }
    if (x2 < 0) {
      x2 = 0;
    }

    return function (t) {
      if (t === 0) {
        return 0;
      }
      if (t === 1) {
        return 1;
      }
      return BEZIER.n_for_t(BEZIER.t_for_n(t, x1, x2), y1, y2);
    };
  }
};

var Easing = function () {
  function Easing(easing) {
    _classCallCheck(this, Easing);

    if (Array.isArray(easing) && easing.length === 4) {
      easing = BEZIER.makeFunction.apply(BEZIER, _toConsumableArray(easing));
    }

    this.ease = typeof easing === 'function' && easing || Easing.fn[easing] || Easing.fn.linear;
  }

  _createClass(Easing, [{
    key: 'getValue',
    value: function getValue(begin, end, now) {
      if (begin === end) {
        throw new Error('A zero time animation as no meaning!');
      }

      return this.ease(this.getTime(begin, end, now));
    }
  }, {
    key: 'getTime',
    value: function getTime(begin, end, now) {
      if (begin === end) {
        throw new Error('A zero time animation as no meaning!');
      }

      return (now - begin) / (end - begin);
    }
  }]);

  return Easing;
}();

Easing.fn = {
  // t : current time: 0 < t < 1 on the time axis

  linear: function linear(t) {
    return t;
  },
  easeInQuad: function easeInQuad(t) {
    return Math.pow(t, 2);
  },
  easeOutQuad: function easeOutQuad(t) {
    return -1 * t * (t - 2);
  },
  easeInOutQuad: function easeInOutQuad(t) {
    t = t * 2;
    if (t < 1) {
      return Math.pow(t, 2) / 2;
    }
    t = t - 1;
    return (t * (t - 2) - 1) / -2;
  },
  easeInCubic: function easeInCubic(t) {
    return Math.pow(t, 3);
  },
  easeOutCubic: function easeOutCubic(t) {
    t = t - 1;
    return Math.pow(t, 3) + 1;
  },
  easeInOutCubic: function easeInOutCubic(t) {
    t = t * 2;
    if (t < 1) {
      return Math.pow(t, 3) / 2;
    }
    t = t - 2;
    return (Math.pow(t, 3) + 2) / 2;
  },
  easeInQuart: function easeInQuart(t) {
    return Math.pow(t, 4);
  },
  easeOutQuart: function easeOutQuart(t) {
    t = t - 1;
    return -1 * Math.pow(t, 4) + 1;
  },
  easeInOutQuart: function easeInOutQuart(t) {
    t = t * 2;
    if (t < 1) {
      return Math.pow(t, 4) / 2;
    }
    t = t - 2;
    return (Math.pow(t, 4) - 2) / -2;
  },
  easeInQuint: function easeInQuint(t) {
    return Math.pow(t, 5);
  },
  easeOutQuint: function easeOutQuint(t) {
    t = t - 1;
    return Math.pow(t, 5) + 1;
  },
  easeInOutQuint: function easeInOutQuint(t) {
    t = t * 2;
    if (t < 1) {
      return Math.pow(t, 5) / 2;
    }
    t = t - 2;
    return (Math.pow(t, 5) + 2) / 2;
  },
  easeInSine: function easeInSine(t) {
    return -1 * Math.cos(t * (Math.PI / 2)) + 1;
  },
  easeOutSine: function easeOutSine(t) {
    return Math.sin(t * Math.PI / 2);
  },
  easeInOutSine: function easeInOutSine(t) {
    return (Math.cos(t * Math.PI) - 1) / -2;
  },
  easeInExpo: function easeInExpo(t) {
    return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
  },
  easeOutExpo: function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  },
  easeInOutExpo: function easeInOutExpo(t) {
    if (t === 0) {
      return 0;
    }
    if (t === 1) {
      return 1;
    }
    t = t * 2;
    if (t < 1) {
      return Math.pow(2, 10 * (t - 1)) / 2;
    }
    t = t - 1;
    return (2 - Math.pow(2, -10 * t)) / 2;
  },
  easeInCirc: function easeInCirc(t) {
    return -1 * (Math.sqrt(1 - Math.pow(t, 2)) - 1);
  },
  easeOutCirc: function easeOutCirc(t) {
    t = t - 1;
    return Math.sqrt(1 - Math.pow(t, 2));
  },
  easeInOutCirc: function easeInOutCirc(t) {
    t = t * 2;
    if (t < 1) {
      return (Math.sqrt(1 - Math.pow(t, 2)) - 1) / -2;
    }
    t = t - 2;
    return (Math.sqrt(1 - Math.pow(t, 2)) + 1) / 2;
  },
  easeInElastic: function easeInElastic(t) {
    var p = 0.3,
        s = p / (2 * Math.PI) * Math.asin(1);
    if (t === 0) {
      return 0;
    }
    if (t === 1) {
      return 1;
    }
    t = t - 1;
    return -(Math.pow(2, 10 * t) * Math.sin((t - s) * (2 * Math.PI) / p));
  },
  easeOutElastic: function easeOutElastic(t) {
    var p = 0.3,
        s = p / (2 * Math.PI) * Math.asin(1);
    if (t === 0) {
      return 0;
    }
    if (t === 1) {
      return 1;
    }
    return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
  },
  easeInOutElastic: function easeInOutElastic(t) {
    var p = 1.5 * 0.3,
        s = p / (2 * Math.PI) * Math.asin(1);
    if (t === 0) {
      return 0;
    }
    t = t * 2;
    if (t === 2) {
      return 1;
    }
    t = t - 1;
    if (t < 0) {
      return -0.5 * (Math.pow(2, 10 * t) * Math.sin((t - s) * (2 * Math.PI) / p));
    }
    return 0.5 * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
  },
  easeInBack: function easeInBack(t) {
    var s = 1.70158;
    return Math.pow(t, 2) * ((s + 1) * t - s);
  },
  easeOutBack: function easeOutBack(t) {
    var s = 1.70158;
    t = t - 1;
    return Math.pow(t, 2) * ((s + 1) * t + s) + 1;
  },
  easeInOutBack: function easeInOutBack(t) {
    var s = 1.70158 * 1.525;
    t = t * 2;
    if (t < 1) {
      return Math.pow(t, 2) * (s * t + t - s) / 2;
    }
    t = t - 2;
    return (Math.pow(t, 2) * (s * t + t + s) + 2) / 2;
  },
  easeInBounce: function easeInBounce(t) {
    return 1 - Easing.fn.easeOutBounce(1 - t);
  },
  easeOutBounce: function easeOutBounce(t) {
    var a = 2.625,
        b = 0.984375,
        c = 2.75;
    if (t < 1 / c) {
      a = 0;b = 0;
    } else if (t < 2 / c) {
      a = 1.5;b = 0.75;
    } else if (t < 2.5 / c) {
      a = 2.25;b = 0.9375;
    }
    t = t - a / c;
    return 7.5625 * Math.pow(t, 2) + b;
  },
  easeInOutBounce: function easeInOutBounce(t) {
    if (t < 0.5) {
      return Easing.fn.easeInBounce(t * 2) * 0.5;
    }
    return Easing.fn.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
  }
};

exports.default = Easing;

/***/ })
/******/ ]);
});