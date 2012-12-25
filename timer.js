/*
    Copyright (c) 2012 Jérémie Patonnier
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
*/

(function (window) {
    "use strict";

    // ------------------ //
    // UTILITIES          //
    // ------------------ //
    
    function isNumber(value) {
        return Object.prototype.toString.call(value) === '[object Number]';
    }

    function isFunction(value) {
        return typeof value === "function";
    }

    function isNaN(value) {
        return isNumber(value) && window.isNaN(value);
    }

    function toInt(value, alt) {
        return isNaN(+value) ? alt : +value;
    }

    function toPosInt(value) {
        return +value >= 0 ? +value : 0;
    }

    function toNullTime(isNull) {
        if (isNull === null)  { return null; }
        if (isNumber(isNull) && isNull > 0) { return isNull; }
        return +new Date();
    }

    function Easing(name) {
        this.easeFx = (isFunction(name) && name) || this.func[name] || this.func.linear;
    }
    
    Easing.prototype = {
        getValue : function (begin, end, now) {
            if (begin === end) {
                throw new Error('A zero time animation as no meaning!');
            }

            var time = (now - begin) / (end - begin);

            return this.easeFx(time, 0, 1, 1);
        },

        getTime  : function (begin, end, now) {
            if (begin === end) {
                throw new Error('A zero time animation as no meaning!');
            }

            return (now - begin) / (end - begin);
        },

        func : {
            // t : current time: 0 < t < 1 on the time axis
            linear: function linear(t) {
                return t;
            },

            easeInQuad: function easeInQuad(t) {
                return Math.pow(t, 2);
            },

            easeOutQuad: function easeOutQuad(t) {
                return -1*t*(t-2);
            },

            easeInOutQuad: function easeInOutQuad(t) {
                t = t * 2;
                if (t < 1) { return Math.pow(t, 2) / 2; }
                t = t - 1;
                return (t*(t-2) - 1) / -2;
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
                if (t < 1) { return Math.pow(t, 3) / 2; }
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
                if (t < 1) { return Math.pow(t, 4) / 2; }
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
                if (t < 1) { return Math.pow(t, 5) / 2; }
                t = t - 2;
                return (Math.pow(t, 5) + 2) / 2;
            },

            easeInSine: function easeInSine(t) {
                return -1 * Math.cos(t * (Math.PI/2)) + 1;
            },

            easeOutSine: function easeOutSine(t) {
                return Math.sin(t*Math.PI/2);
            },

            easeInOutSine: function easeInOutSine(t) {
                return (Math.cos(t*Math.PI) - 1) / -2;
            },

            easeInExpo: function easeInExpo(t) {
                return (t===0) ? 0 : Math.pow(2, 10 * (t - 1));
            },

            easeOutExpo: function easeOutExpo(t) {
                return (t===1) ? 1 : 1 - Math.pow(2, -10 * t);
            },

            easeInOutExpo: function easeInOutExpo(t) {
                if (t===0) { return 0; }
                if (t===1) { return 1; }
                t = t * 2;
                if (t < 1) { return Math.pow(2, 10 * (t - 1)) / 2; }
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
                if (t < 1) { return (Math.sqrt(1 - Math.pow(t, 2)) - 1) / -2; }
                t = t - 2;
                return (Math.sqrt(1 - Math.pow(t, 2)) + 1) / 2;
            },

            easeInElastic: function easeInElastic(t) {
                var p=0.3, s=p/(2*Math.PI) * Math.asin(1);
                if (t===0) { return 0; }
                if (t===1) { return 1; }
                t = t - 1;
                return -(Math.pow(2,10*t) * Math.sin((t-s)*(2*Math.PI)/p));
            },

            easeOutElastic: function easeOutElastic(t) {
                var p=0.3, s=p/(2*Math.PI) * Math.asin(1);
                if (t===0) { return 0; }
                if (t===1) { return 1; }
                return Math.pow(2,-10*t) * Math.sin((t-s)*(2*Math.PI)/p) + 1;
            },

            easeInOutElastic: function easeInOutElastic(t) {
                var p=1.5*0.3, s=p/(2*Math.PI) * Math.asin(1);
                if (t===0) {return 0;}
                t = t * 2;
                if (t===2) {return 1;}
                t = t - 1;
                if (t < 0) {return -0.5*(Math.pow(2,10*t) * Math.sin((t-s)*(2*Math.PI)/p));}
                return Math.pow(2,-10*t) * Math.sin((t-s)*(2*Math.PI)/p)*0.5 + 1;
            },

            easeInBack: function easeInBack(t) {
                var s=1.70158;
                return Math.pow(t, 2)*((s+1)*t - s);
            },

            easeOutBack: function easeOutBack(t) {
                var s=1.70158;
                t = t - 1;
                return Math.pow(t, 2)*((s+1)*t + s) + 1;
            },

            easeInOutBack: function easeInOutBack(t) {
                var s=1.70158*1.525;
                t = t * 2;
                if (t < 1) { return (Math.pow(t, 2)*(s*t + t - s)) / 2; }
                t = t - 2;
                return (Math.pow(t, 2)*(s*t + t + s) + 2) / 2;
            },

            easeInBounce: function easeInBounce(t) {
                return 1 - Easing.prototype.func.easeOutBounce (1-t);
            },

            easeOutBounce: function easeOutBounce(t) {
                var a=2.625, b=0.984375, c=2.75;
                if (t < (1/c)) { a=0; b=0; }
                else if (t < (2/c)) { a=1.5; b=0.75; }
                else if (t < (2.5/c)) { a=2.25; b=0.9375; }
                t = t - a/c;
                return 7.5625*Math.pow(t, 2) + b;
            },

            easeInOutBounce: function easeInOutBounce(t) {
                if (t < 0.5) { return Easing.prototype.func.easeInBounce (t*2) * 0.5; }
                return Easing.prototype.func.easeOutBounce (t*2-1) * 0.5 + 0.5;
            }
        }
    };

    // ------------------ //
    // CORE               //
    // ------------------ //

    function Timer(config) {
        // Sefely keep the internal properties of the object
        var closed = {
            // Specific data for users
            userDelay : {
                value : 0,
                set   : function (value) {
                    this.value = toInt(value, 0);
                }
            },

            userTime  : {
                value : null,
                set   : function (isNull) {
                    this.value = toNullTime(isNull);
                    closed.startTime.set(this.value);
                }
            },

            // Keep the first time the Timer is played
            startTime : {
                value : null,
                set   : function (isNull) {
                    this.value = toNullTime(isNull);
                    
                    // When the value is set (mening, the Timer start)
                    // The pause and back times MUST be reinitialized
                    if(this.value !== null && closed.pauseTime.value !== null) {
                        closed.pauseTime.value = this.value;
                    }
                    
                    if(this.value !== null && closed.backTime.value !== null) {
                        closed.backTime.value = this.value;
                    }
                    
                    closed.delay.value = 0;

                    closed.begin.set();
                    closed.end.set();
                }
            },

            // Keep the last time the Timer is paused
            pauseTime : {
                value : null,
                set   : function (isNull) {
                    var now    = +new Date(),
                        newVal = toNullTime(isNull),
                        oldVal = this.value;

                    if(oldVal !== null && newVal === null) {
                        closed.delay.set(closed.delay.value + (now - oldVal));
                    }

                    this.value = newVal;
                }
            },

            // Keep the last time the Timer is going backward
            backTime : {
                value : null,
                set   : function (isNull) {
                    var now    = +new Date(),
                        newVal = toNullTime(isNull),
                        oldVal = this.value;

                    if(oldVal !== null && newVal === null) {
                        closed.delay.set(closed.delay.value + (now - oldVal)*2);
                    }

                    this.value = newVal;
                }
            },

            delay : {
                value : 0,
                set   : function (value) {
                    this.value = toInt(value, 0);
                    closed.begin.set();
                    closed.end.set();
                }
            },

            duration : {
                value : 0,
                set   : function (value) {
                    this.value = toPosInt(value);
                    closed.end.set();
                }
            },

            easing : {
                value: new Easing('linear'),
                set : function (value) {
                    this.value = new Easing(value);
                }
            },

            speedFactor : {
                value : 1,
                set : function (value) {
                    var now    = +new Date(),
                        newVal = toInt(value, 1),
                        oldVal = this.value;

                    closed.pauseTime.set(null);
                    closed.backTime.set(null);

                    if (newVal === 0) { closed.pauseTime.set(now); }
                    if (newVal   < 0) { closed.backTime.set(now); }

                    closed.prevSpeed.set(oldVal);
                    this.value = newVal;
                    closed.end.set();
                }
            },

            prevSpeed : {
                value : 1,
                set : function (value) {
                    this.value = toInt(value, 1);
                }
            },

            begin : {
                value : 0,
                set : function () {
                    this.value = closed.startTime.value
                               + closed.userDelay.value
                               + closed.delay.value;
                }
            },

            end : {
                value : 0,
                set : function () {
                    var sf = closed.speedFactor.value;
                    sf *= sf < 0 ? -1 : 1;

                    this.value = closed.startTime.value
                               + closed.userDelay.value
                               + closed.delay.value
                               + (sf === 0 ? closed.duration.value
                                           : closed.duration.value / sf);
                }
            }
        };

        // Accessor to closed statement
        // You use those methods at your own risk

        Object.defineProperty(this, "set", {
            value : function(property, value) {
                closed[property].set(value);
                return closed[property].value;
            },
            writable     : false,
            enumerable   : false,
            configurable : false
        });

        Object.defineProperty(this, "get", {
            value : function(property) {
                return closed[property].value;
            },
            writable     : false,
            enumerable   : false,
            configurable : false
        });

        // Truly initialize the object
        this.set("duration",  (isNumber(config) && config) || (config && config.duration));
        this.set("userDelay",  config && config.delay );
        this.set("easing",     config && config.easing);
        this.set("speedFactor",config && config.speed );
    }

    // ------------------------- //
    // PROPERIES
    // ------------------------- //
    // Timer.startTime
    Object.defineProperty(Timer.prototype, "startTime", {
        set : function () {
            throw new Error("Timer.startTime is a readonly property");
        },
        get : function () {
            return this.get("userTime");
        },
        enumerable   : true,
        configurable : false
    });

    // Timer.delay
    Object.defineProperty(Timer.prototype, "delay", {
        set : function (value) {
            if(this.is.playing){
                throw new Error("Timer.delay can not be set while it's playing");
            }

            this.set("userDelay", value);
        },
        get : function () {
            return this.get("userDelay");
        },
        enumerable   : true,
        configurable : false
    });

    // Timer.speed
    Object.defineProperty(Timer.prototype, "speed", {
        set : function (speedFactor) {
            var shift, factor,
                speed = this.get("speedFactor"),
                now   = +new Date(),
                delay = this.get("delay"),
                time  = this.position.time;

            speedFactor = this.set('speedFactor', speedFactor);

            speedFactor *= speedFactor < 0 ? -1 : 1;
            speed       *= speed       < 0 ? -1 : 1;
            
            // The following handle the shift when the speed ratio change
            if (speed !== speedFactor) {
                shift  = now - this.get("userTime") - delay - this.get("userDelay");
                factor = speedFactor === 0 ? this.get("duration")*time
                                           : this.get("duration")*time/speedFactor;
                    
                this.set("delay", delay + shift - factor);
            }
        },
        get : function () {
            return this.get("speedFactor");
        },
        enumerable   : true,
        configurable : false
    });

    // Timer.duration
    Object.defineProperty(Timer.prototype, "duration", {
        set : function (value) {
            this.set("duration", value);
        },
        get : function () {
            return this.get("duration");
        },
        enumerable   : true,
        configurable : false
    });

    // Timer.easing
    Object.defineProperty(Timer.prototype, "easing", {
        set : function (value) {
            this.set("easing", value);
        },
        get : function () {
            return this.get("easing").easeFx;
        },
        enumerable   : true,
        configurable : false
    });

    // Timer.is
    //         .playing
    //         .paused
    Object.defineProperty(Timer.prototype, "is", {
        set : function () {
            throw new Error("Timer.is is a readonly property");
        },
        get : function () {
            var startTime   = this.get("startTime"),
                speedFactor = this.get("speedFactor"),
                output      = {
                    playing: startTime !== null,
                    paused : startTime !== null && speedFactor === 0
                };

            if (speedFactor > 0 && this.position.time >= 1) { this.stop(); }
            if (speedFactor < 0 && this.position.time <= 0) { this.stop(); }

            return output;
        },
        enumerable   : true,
        configurable : false
    });

    //Timer.position
    Object.defineProperty(Timer.prototype, "position", {
        set : function () {
            throw new Error("Timer.position is a readonly property");
        },
        get : function () {
            var begin, end, now, ease, speedFactor,
                startTime   = this.get("startTime"),
                output      = {
                    value : 0,
                    time  : 0
                };

            if (startTime === null) { return output; }

            speedFactor = this.get("speedFactor");
            now = +new Date();

            if (speedFactor === 0) {
                now = this.get("pauseTime");
            }
            else if (speedFactor < 0) {
                now = this.get("backTime") * 2 - now;
            }

            begin = this.get("begin");
            end   = this.get("end");

            if (now <= begin) { return output; }
            if (now > end)   { this.stop(); return output; }

            ease = this.get("easing");

            output = {
                value: ease.getValue(begin, end, now),
                time : ease.getTime(begin, end, now)
            };

            return output;
        },
        enumerable   : true,
        configurable : false
    });

    // ------------------------- //
    // METHOD
    // ------------------------- //
    Timer.prototype.play = function play() {
        if(this.get("userTime") === null) {
            this.set("userTime");
        
        } else if (this.get("speedFactor") === 0) {
            // FIXEME: To test
            this.set("speedFactor", this.get("prevSpeed"));
        }
    };

    Timer.prototype.pause = function pause() {
        this.speed = 0;
    };

    Timer.prototype.stop = function stop() {
        this.set("userTime",    null);
        this.set("delay",       0);
    };

    window.Timer = Timer;
})(this);