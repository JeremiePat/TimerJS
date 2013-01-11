/*global jasmine:true describe:true it:true xit:true expect:true beforeEach:true afterEach:true mDate:true buildAnimationTest:true Timer:true*/

describe('API basic testing', function () {
    "use strict";

    var timer;

    describe('Timer instantiation', function () {
        it('if new Timer(1000), timer.duration === 1000', function () {
            var timer = new Timer(1000);

            expect(timer.duration).toBe(1000);
        });

        it('if new Timer({duration:1000}), timer.duration === 1000', function () {
            var timer = new Timer({duration:1000});

            expect(timer.duration).toBe(1000);
        });

        it('if new Timer({delay:1000}), timer.delay === 1000', function () {
            var timer = new Timer({delay:1000});

            expect(timer.delay).toBe(1000);
        });

        it('if new Timer({speed:2}), timer.speed === 2', function () {
            var timer = new Timer({speed:2});

            expect(timer.speed).toBe(2);
        });

        it('if new Timer({easing:function foo(){}}), timer.easing === foo', function () {
            var foo   = function () {},
                timer = new Timer({easing:foo});

            expect(timer.easing).toBe(foo);
        });

        it('if new Timer({constrain:true}), timer.constrain === true', function () {
            var timer = new Timer({constrain:true});

            expect(timer.constrain).toBe(true);
        });

        it('if new Timer({constrain:false}), timer.constrain === false', function () {
            var timer = new Timer({constrain:false});

            expect(timer.constrain).toBe(false);
        });

        it('if new Timer({loops:2}), timer.loops === 2', function () {
            var timer = new Timer({loops:2});

            expect(timer.loops).toBe(2);
        });
    });

    describe('Timer instance default state', function() {
        beforeEach(function() {
            timer = new Timer();
        });

        it('Timer.play() exists', function () {
            expect(timer.play).toEqual(jasmine.any(Function));
        });

        it('Timer.stop() exists', function () {
            expect(timer.stop).toEqual(jasmine.any(Function));
        });

        it('Timer.startTime exists', function () {
            expect(timer.startTime).not.toBeUndefined();
        });

        it('Timer.startTime is read-only', function () {
            expect(timer).toHaveAReadOnlyPropertyNamed('startTime');
        });

        it('Timer.startTime default value is null,', function () {
            expect(timer.startTime).toBeNull();
        });

        it('Timer.delay exists', function () {
            expect(timer.delay).not.toBeUndefined();
        });

        it('Timer.delay default value is 0,', function () {
            expect(timer.delay).toBe(0);
        });

        it('Timer.speed exists', function () {
            expect(timer.speed).not.toBeUndefined();
        });

        it('Timer.speed default value is 1,', function () {
            expect(timer.speed).toBe(1);
        });

        it('Timer.duration exists', function () {
            expect(timer.duration).not.toBeUndefined();
        });

        it('Timer.duration default value is 0,', function () {
            expect(timer.duration).toBe(0);
        });

        it('Timer.easing exists', function () {
            expect(timer.easing).not.toBeUndefined();
        });

        it('Timer.constrain exists', function () {
            expect(timer.constrain).not.toBeUndefined();
        });

        it('Timer.constrain default value is true,', function () {
            expect(timer.constrain).toBe(true);
        });

        it('Timer.loops exists', function () {
            expect(timer.loops).not.toBeUndefined();
        });

        it('Timer.loops default value is 1,', function () {
            expect(timer.loops).toBe(1);
        });

        it('Timer.is exists', function () {
            expect(timer.is).not.toBeUndefined();
        });

        it('Timer.is is read-only', function () {
            expect(timer).toHaveAReadOnlyPropertyNamed('is');
        });

        it('Timer.is is an object', function () {
            expect(timer.is).toEqual(jasmine.any(Object));
        });

        it('Timer.is.playing exists', function () {
            expect(timer.is.playing).not.toBeUndefined();
        });

        it('Timer.is.playing is read-only', function () {
            var origine = timer.is.playing;
            timer.is.playing = !origine;

            expect(timer.is.playing).toBe(origine);
        });

        it('Timer.is.playing default value is false,', function () {
            expect(timer.is.playing).toBe(false);
        });

        it('Timer.is.paused exists', function () {
            expect(timer.is.paused).not.toBeUndefined();
        });

        it('Timer.is.paused is read-only', function () {
            var origine = timer.is.paused;
            timer.is.paused = !origine;

            expect(timer.is.paused).toBe(origine);
        });

        it('Timer.is.paused default value is false,', function () {
            expect(timer.is.paused).toBe(false);
        });

        it('Timer.position exists', function () {
            expect(timer.position).not.toBeUndefined();
        });

        it('Timer.position is read-only', function () {
            expect(timer).toHaveAReadOnlyPropertyNamed('position');
        });

        it('Timer.position is an object', function () {
            expect(timer.position).toEqual(jasmine.any(Object));
        });

        it('Timer.position.value exists', function () {
            expect(timer.position.value).not.toBeUndefined();
        });

        it('Timer.position.value is read-only', function () {
            var origine = timer.position.value;
            timer.position.value = !origine;

            expect(timer.position.value).toBe(origine);
        });

        it('Timer.position.value default value is 0,', function () {
            expect(timer.position.value).toBe(0);
        });

        it('Timer.position.time exists', function () {
            expect(timer.position.time).not.toBeUndefined();
        });

        it('Timer.position.time is read-only', function () {
            var origine = timer.position.time;
            timer.position.time = !origine;

            expect(timer.position.time).toBe(origine);
        });

        it('Timer.position.time default value is 0,', function () {
            expect(timer.position.time).toBe(0);
        });

        it('Timer.position.loop exists', function () {
            expect(timer.position.loop).not.toBeUndefined();
        });

        it('Timer.position.loop is read-only', function () {
            var origine = timer.position.loop;
            timer.position.loop = !origine;

            expect(timer.position.loop).toBe(origine);
        });

        it('Timer.position.loop default value is 1,', function () {
            expect(timer.position.loop).toBe(1);
        });
    });

    describe('While the timer is playing', function () {
        beforeEach(function() {
            timer = new Timer({duration:1000});
            timer.play();
        });

        it('Timer.is.playing is true', function () {
            expect(timer.is.playing).toBe(true);
        });

        it('Timer.is.paused  is false', function () {
            expect(timer.is.paused).toBe(false);
        });
    });
    
    describe('While the timer is paused', function () {
        beforeEach(function() {
            timer = new Timer({duration:1000});
            timer.play();
            timer.speed = 0;
        });

        it('Timer.is.playing is true', function () {
            expect(timer.is.playing).toBe(true);
        });

        it('Timer.is.paused  is true', function () {
            expect(timer.is.paused).toBe(true);
        });
    });

    describe('Testing Timer.play()', function () {
        var timer,
            dur = 1000;

        beforeEach(function() {
            var now = +new Date();
            mDate.mock();
            mDate.setTime(now);
            timer = new Timer(dur);
        });

        afterEach(function() {
            mDate.unmock();
        });

        it('when Timer.play(), Timer.startTime > 0', function () {
            timer.play();
            expect(timer.startTime).toBeGreaterThan(0);
        });

        it('when Timer.play(), Timer.speed === 1', function () {
            timer.play();
            expect(timer.speed).toBe(1);
        });
    });

    describe('Testing Timer.pause()', function () {
        var timer,
            now = +new Date(),
            dur = 1000;

        beforeEach(function () {
            mDate.mock();
            mDate.setTime(now);
            timer = new Timer(dur);
            timer.play();
        });

        afterEach(function () {
            mDate.unmock();
        });

        it('when Timer.pause(), Timer.speed === 0', function () {
            timer.pause();

            expect(timer.speed).toBe(0);
        });

        it('when Timer.play() after Timer.pause(), Timer.speed === speed before pause', function () {
            mDate.setTime(now + 200);
            timer.speed = 2;
            expect(timer.speed).toBe(2);

            mDate.setTime(now + 400);
            timer.pause();
            expect(timer.speed).toBe(0);

            mDate.setTime(now + 600);
            timer.play();
            expect(timer.speed).toBe(2);
        });
    });

    describe('Testing Timer.stop()', function () {
        beforeEach(function () {
            timer = new Timer(1000);
        });

        it('when Timer.stop(), Timer.startTime === null', function () {
            timer.play();
            timer.stop();

            expect(timer.startTime).toBeNull();
        });
    });

    describe('Testing Timer.freeze() with Timer.constrain === true', function () {
        var timer,
            now = +new Date(),
            dur = 1000;

        beforeEach(function () {
            mDate.mock();
            mDate.setTime(now);
            timer = new Timer(dur);
        });

        afterEach(function () {
            mDate.unmock();
        });

        it('when Timer.freeze() on a stopped timer, an exception is raised', function () {
            var ok = false;

            try {
                timer.freeze();
            } catch (e) {
                ok = true;
            }

            expect(ok).toBe(true);
        });

        it('when Timer.freeze(whatever) on a stopped timer, an exception is raised', function () {
            var ok = false;

            try {
                timer.freeze(now);
            } catch (e) {
                ok = true;
            }

            expect(ok).toBe(true);
        });

        it('when Timer.play(), Timer.freeze(now - dur/2)   === {time:0,   value:0}', function () {
            timer.play();
            var position = timer.freeze(now - dur/2);

            expect(position).toEqual({time:0, value:0});
        });

        it('when Timer.play(), Timer.freeze(now)           === {time:0,   value:0}', function () {
            timer.play();
            var position = timer.freeze(now);

            expect(position).toEqual({time:0, value:0});
        });

        it('when Timer.play(), Timer.freeze(now + dur/2)   === {time:0.5, value:0.5}', function () {
            timer.play();
            var position = timer.freeze(now + dur/2);

            expect(position).toEqual({time:0.5, value:0.5});
        });

        it('when Timer.play(), Timer.freeze(now + dur)     === {time:1,   value:1}', function () {
            timer.play();
            var position = timer.freeze(now + dur);

            expect(position).toEqual({time:1, value:1});
        });

        it('when Timer.play(), Timer.freeze(now + dur*3/2) === {time:1,   value:1}', function () {
            timer.play();
            var position = timer.freeze(now + dur*3/2);

            expect(position).toEqual({time:1, value:1});
        });

        it('when Timer.freeze(now, now - dur/2)   === {time:0,   value:0}', function () {
            var position = timer.freeze(now, now - dur/2);

            expect(position).toEqual({time:0, value:0});
        });

        it('when Timer.freeze(now, now)           === {time:0,   value:0}', function () {
            var position = timer.freeze(now, now);

            expect(position).toEqual({time:0, value:0});
        });

        it('when Timer.freeze(now, now + dur/2)   === {time:0.5, value:0.5}', function () {
            var position = timer.freeze(now, now + dur/2);

            expect(position).toEqual({time:0.5, value:0.5});
        });

        it('when Timer.freeze(now, now + dur)     === {time:1,   value:1}', function () {
            var position = timer.freeze(now, now + dur);

            expect(position).toEqual({time:1, value:1});
        });

        it('when Timer.freeze(now, now + dur*3/2) === {time:1, value:1}', function () {
            var position = timer.freeze(now, now + dur*3/2);

            expect(position).toEqual({time:1, value:1});
        });
    });

    describe('Testing Timer.freeze() with Timer.constrain === false', function () {
        var timer,
            now = +new Date(),
            dur = 1000;

        beforeEach(function () {
            mDate.mock();
            mDate.setTime(now);
            timer = new Timer({
                duration:dur,
                constrain:false
            });
        });

        afterEach(function () {
            mDate.unmock();
        });

        it('when Timer.play(), Timer.freeze(now - dur/2)   === {time:-0.5, value:-0.5}', function () {
            timer.play();
            var position = timer.freeze(now - dur/2);

            expect(position).toEqual({time:-0.5, value:-0.5});
        });

        it('when Timer.play(), Timer.freeze(now)           === {time:0,   value:0}', function () {
            timer.play();
            var position = timer.freeze(now);

            expect(position).toEqual({time:0, value:0});
        });

        it('when Timer.play(), Timer.freeze(now + dur/2)   === {time:0.5, value:0.5}', function () {
            timer.play();
            var position = timer.freeze(now + dur/2);

            expect(position).toEqual({time:0.5, value:0.5});
        });

        it('when Timer.play(), Timer.freeze(now + dur)     === {time:1,   value:1}', function () {
            timer.play();
            var position = timer.freeze(now + dur);

            expect(position).toEqual({time:1, value:1});
        });

        it('when Timer.play(), Timer.freeze(now + dur*3/2) === {time:1.5, value:1.5}', function () {
            timer.play();
            var position = timer.freeze(now + dur*3/2);

            expect(position).toEqual({time:1.5, value:1.5});
        });

        it('when Timer.freeze(now, now - dur/2)   === {time:-0.5, value:-0.5}', function () {
            var position = timer.freeze(now, now - dur/2);

            expect(position).toEqual({time:-0.5, value:-0.5});
        });

        it('when Timer.freeze(now, now)           === {time:0,   value:0}', function () {
            var position = timer.freeze(now, now);

            expect(position).toEqual({time:0, value:0});
        });

        it('when Timer.freeze(now, now + dur/2)   === {time:0.5, value:0.5}', function () {
            var position = timer.freeze(now, now + dur/2);

            expect(position).toEqual({time:0.5, value:0.5});
        });

        it('when Timer.freeze(now, now + dur)     === {time:1,   value:1}', function () {
            var position = timer.freeze(now, now + dur);

            expect(position).toEqual({time:1, value:1});
        });

        it('when Timer.freeze(now, now + dur*3/2) === {time:1.5, value:1.5}', function () {
            var position = timer.freeze(now, now + dur*3/2);

            expect(position).toEqual({time:1.5, value:1.5});
        });
    });
});

describe('Testing variation in a 2s linear animation', function () {
    "use strict";

    var d,
        dur  = 2000,
        step = 200,
        definition = [
            {
                title  : 'A simple forward animation',
                results: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                params : [{speed:1}]
            },
            {
                title  : 'A forward animation with a 600ms delay',
                results: [0,0,0,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                params : [{speed:1, delay:600}]
            },
            {
                title  : 'A forward animation with a 600ms delay and no time constrain',
                results: [-0.3,-0.2,-0.1,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1],
                params : [{speed:1, delay:600, constrain: false}]
            },
            {
                title  : 'A forward animation with a 1s delay after 1s',
                results: [0,0.1,0.2,0.3,0.4,0.5,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                params : [{speed:1},0,0,0,0,0,{delay:1000}]
            },
            {
                title  : 'A forward animation with a -600ms delay',
                results: [0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                params : [{speed:1, delay:-600}]
            },
            {
                title  : 'A backward animation with a -600ms delay',
                results: [0.3,0.2,0.1,0,0,0,0,0,0],
                params : [{speed:-1, delay:-600}]
            },
            {
                title  : 'A backward animation with a -600ms delay and no time constrain',
                results: [0.3,0.2,0.1,0,-0.1,-0.2,-0.3,-0.4,-0.5,-0.6],
                params : [{speed:-1, delay:-600, constrain:false}]
            },
            {
                title  : 'A forward animation with a -2s delay',
                results: [1,0,0,0,0,0,0,0,0,0,0,0],
                params : [{speed:1, delay:-2000}]
            },
            {
                title  : 'A backward animation with a -2s delay',
                results: [1,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1,0,0],
                params : [{speed:-1, delay:-2000}]
            },
            {
                title  : 'A forward animation with a x2 speed factor',
                results: [0,0.2,0.4,0.6,0.8,1,0],
                params : [{speed:2}]
            },
            {
                title  : 'A forward animation with a change of direction after 1s',
                results: [0,0.1,0.2,0.3,0.4,0.5,0.4,0.3,0.2,0.1,0,0],
                params : [{speed:1},0,0,0,0,{speed:-1}]
            },
            {
                title  : 'A forward animation with double speed after 800ms',
                results: [0,0.1,0.2,0.3,0.4,0.6,0.8,1,0],
                params : [{speed:1},0,0,0,{speed:2}]
            },
            {
                title  : 'A forward animation with a change of direction after 1.8s and again with double speed after 3.2s',
                results: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.4,0.6,0.8,1,0],
                params : [{speed:1},0,0,0,0,0,0,0,0,{speed:-1},0,0,0,0,0,0,{speed:2}]
            },
            {
                title  : 'A forward animation with a 400ms pause after 1s',
                results: [0,0.1,0.2,0.3,0.4,0.5,0.5,0.5,0.6,0.7,0.8,0.9,1,0],
                params : [{speed:1},0,0,0,0,{speed:0},0,{speed:1}]
            },
            // { // Need to investigate if it's the right behavior
            //     title  : 'A 2s forward animation that turn to a 4s animation after 1s',
            //     results: [0,0.1,0.2,0.3,0.4,0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1,0],
            //     params : [{speed:1},0,0,0,0,{duration:4000}]
            // },
            {
                title  : 'A 2s forward animation that turn to a 1s animation after 1.4s',
                results: [0,0.1,0.2,0.3,0.4,0.5,0.6,0],
                params : [{speed:1},0,0,0,0,0,0,{duration:1000}]
            },
            {
                title  : 'A 2s forward animation that loop 2 times',
                results: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                params : [{speed:1,loops:2}]
            },
            {
                title  : 'A 2s forward animation that loop 2 times after a 1s delay',
                results: [0,0,0,0,0,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                params : [{speed:1, delay: 1000,loops:2}]
            }
        ];

    for (d in definition) {
        buildAnimationTest(dur, step, definition[d]);
    }
});

describe('Testing easing function on a 2s animation', function () {
    "use strict";

    var d,
        dur  = 2000,
        step = 200,
        definition = [
            {
                title  : 'Linear',
                results: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                params : [{speed:1}]
            },
            {
                title  : 'easeInQuad',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.01,0.04,0.09,0.16,0.25,0.36,0.49,0.64,0.81,1,0],
                params : [{speed:1, easing:'easeInQuad'}]
            },
            {
                title  : 'easeOutQuad',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.19,0.36,0.51,0.64,0.75,0.84,0.91,0.96,0.99,1,0],
                params : [{speed:1, easing:'easeOutQuad'}]
            },
            {
                title  : 'easeInOutQuad',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.02,0.08,0.18,0.32,0.5,0.68,0.82,0.92,0.98,1,0],
                params : [{speed:1, easing:'easeInOutQuad'}]
            },
            {
                title  : 'easeInCubic',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.001,0.008,0.027,0.064,0.125,0.216,0.343,0.512,0.729,1,0],
                params : [{speed:1, easing:'easeInCubic'}]
            },
            {
                title  : 'easeOutCubic',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.271,0.488,0.657,0.784,0.875,0.936,0.973,0.992,0.999,1,0],
                params : [{speed:1, easing:'easeOutCubic'}]
            },
            {
                title  : 'easeInOutCubic',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.004,0.032,0.108,0.256,0.5,0.744,0.892,0.968,0.996,1,0],
                params : [{speed:1, easing:'easeInOutCubic'}]
            },
            {
                title  : 'easeInQuart',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.0001,0.0016,0.0081,0.0256,0.0625,0.1296,0.2401,0.4096,0.6561,1,0],
                params : [{speed:1, easing:'easeInQuart'}]
            },
            {
                title  : 'easeOutQuart',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.3439,0.5904,0.7599,0.8704,0.9375,0.9744,0.9919,0.9984,0.9999,1,0],
                params : [{speed:1, easing:'easeOutQuart'}]
            },
            {
                title  : 'easeInOutQuart',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.0008,0.0128,0.0648,0.2048,0.5,0.7952,0.9352,0.9872,0.9992,1,0],
                params : [{speed:1, easing:'easeInOutQuart'}]
            },
            {
                title  : 'easeInQuint',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.00001,0.00032,0.00243,0.01024,0.03125,0.07776,0.16807,0.32768,0.59049,1,0],
                params : [{speed:1, easing:'easeInQuint'}]
            },
            {
                title  : 'easeOutQuint',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.40951,0.67232,0.83193,0.92224,0.96875,0.98976,0.99757,0.99968,0.99999,1,0],
                params : [{speed:1, easing:'easeOutQuint'}]
            },
            {
                title  : 'easeInOutQuint',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.00016,0.00512,0.03888,0.16384,0.5,0.83616,0.96112,0.99488,0.99984,1,0],
                params : [{speed:1, easing:'easeInOutQuint'}]
            },
            {
                title  : 'easeInSine',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.012311659,0.048943484,0.10899348,0.19098301,0.29289322,0.41221475,0.5460095,0.69098301,0.84356553,1,0],
                params : [{speed:1, easing:'easeInSine'}]
            },
            {
                title  : 'easeOutSine',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.15643447,0.30901699,0.4539905,0.58778525,0.70710678,0.80901699,0.89100652,0.95105652,0.98768834,1,0],
                params : [{speed:1, easing:'easeOutSine'}]
            },
            {
                title  : 'easeInOutSine',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.024471742,0.095491503,0.20610737,0.3454915,0.5,0.6545085,0.79389263,0.9045085,0.97552826,1,0],
                params : [{speed:1, easing:'easeInOutSine'}]
            },
            {
                title  : 'easeInExpo',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.001953125,0.00390625,0.0078125,0.015625,0.03125,0.0625,0.125,0.25,0.5,1,0],
                params : [{speed:1, easing:'easeInExpo'}]
            },
            {
                title  : 'easeOutExpo',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.5,0.75,0.875,0.9375,0.96875,0.984375,0.9921875,0.99609375,0.99804688,1,0],
                params : [{speed:1, easing:'easeOutExpo'}]
            },
            {
                title  : 'easeInOutExpo',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.001953125,0.0078125,0.03125,0.125,0.5,0.875,0.96875,0.9921875,0.99804688,1,0],
                params : [{speed:1, easing:'easeInOutExpo'}]
            },
            {
                title  : 'easeInCirc',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.0050125629,0.020204103,0.046060799,0.083484861,0.1339746,0.2,0.28585716,0.4,0.56411011,1,0],
                params : [{speed:1, easing:'easeInCirc'}]
            },
            {
                title  : 'easeOutCirc',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.43588989,0.6,0.71414284,0.8,0.8660254,0.91651514,0.9539392,0.9797959,0.99498744,1,0],
                params : [{speed:1, easing:'easeOutCirc'}]
            },
            {
                title  : 'easeInOutCirc',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.010102051,0.041742431,0.1,0.2,0.5,0.8,0.9,0.95825757,0.98989795,1,0],
                params : [{speed:1, easing:'easeInOutCirc'}]
            },
            {
                title  : 'easeInElastic',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.001953125,-0.001953125,-0.00390625,0.015625,-0.015625,-0.03125,0.125,-0.125,-0.25,1,0],
                params : [{speed:1, easing:'easeInElastic'}]
            },
            {
                title  : 'easeOutElastic',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,1.25,1.125,0.875,1.03125,1.015625,0.984375,1.0039063,1.0019531,0.99804688,1,0],
                params : [{speed:1, easing:'easeOutElastic'}]
            },
            {
                title  : 'easeInOutElastic',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.0003391566,-0.00390625,0.023938889,-0.11746158,0.5,1.1174616,0.97606111,1.0039063,0.99966084,1,0],
                params : [{speed:1, easing:'easeInOutElastic'}]
            },
            {
                title  : 'easeInBack',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,-0.01431422,-0.04645056,-0.08019954,-0.09935168,-0.0876975,-0.02902752,0.09286774,0.29419776,0.59117202,1,0],
                params : [{speed:1, easing:'easeInBack'}]
            },
            {
                title  : 'easeOutBack',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.40882798,0.70580224,0.90713226,1.0290275,1.0876975,1.0993517,1.0801995,1.0464506,1.0143142,1,0],
                params : [{speed:1, easing:'easeOutBack'}]
            },
            {
                title  : 'easeInOutBack',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,-0.037518552,-0.092555656,-0.078833484,0.089925792,0.5,0.91007421,1.0788335,1.0925557,1.0375186,1,0],
                params : [{speed:1, easing:'easeInOutBack'}]
            },
            {
                title  : 'easeInBounce',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.011875,0.06,0.069375,0.2275,0.234375,0.09,0.319375,0.6975,0.924375,1,0],
                params : [{speed:1, easing:'easeInBounce'}]
            },
            {
                title  : 'easeOutBounce',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.075625,0.3025,0.680625,0.91,0.765625,0.7725,0.930625,0.94,0.988125,1,0],
                params : [{speed:1, easing:'easeOutBounce'}]
            },
            {
                title  : 'easeInOutBounce',
                time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
                results: [0,0.03,0.11375,0.045,0.34875,0.5,0.65125,0.955,0.88625,0.97,1,0],
                params : [{speed:1, easing:'easeInOutBounce'}]
            }
        ];

    for (d in definition) {
        buildAnimationTest(dur, step, definition[d]);
    }
});