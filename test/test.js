const { expect } = require('chai');

const mDate = require('./helpers/mock/date.js')
const { buildAnimationTest } = require('./helpers/animation.js')
const { Timer } = require('../timer.umd.js')


describe('API basic testing', function () {
  describe('Timer instantiation', function () {
    it('if new Timer(1000), timer.duration === 1000', function () {
      var timer = new Timer(1000);

      expect(timer.duration).to.be.equal(1000);
    });

    it('if new Timer({duration:1000}), timer.duration === 1000', function () {
      var timer = new Timer({duration:1000});

      expect(timer.duration).to.be.equal(1000);
    });

    it('if new Timer({delay:1000}), timer.delay === 1000', function () {
      var timer = new Timer({delay:1000});

      expect(timer.delay).to.be.equal(1000);
    });

    it('if new Timer({speed:2}), timer.speed === 2', function () {
      var timer = new Timer({speed:2});

      expect(timer.speed).to.be.equal(2);
    });

    it('if new Timer({easing:function foo(){}}), timer.easing === foo', function () {
      var foo   = function () {},
          timer = new Timer({easing:foo});

      expect(timer.easing).to.be.equal(foo);
    });

    it('if new Timer({constrain:true}), timer.constrain === true', function () {
      var timer = new Timer({constrain:true});

      expect(timer.constrain).to.be.equal(true);
    });

    it('if new Timer({constrain:false}), timer.constrain === false', function () {
      var timer = new Timer({constrain:false});

      expect(timer.constrain).to.be.equal(false);
    });

    it('if new Timer({loops:2}), timer.loops === 2', function () {
      var timer = new Timer({loops:2});

      expect(timer.loops).to.be.equal(2);
    });

    it('if new Timer({steps:2}), timer.steps == {length:2, position:"end"}', function () {
      var timer = new Timer({steps:2});

      expect(timer.steps.length  ).to.be.equal(2);
      expect(timer.steps.position).to.be.equal("end");
    });

    it('if new Timer({steps:{length:2,position:"start"}}), timer.steps == {length:2, position:"start"}', function () {
      var timer = new Timer({
        steps:{
          length  : 2,
          position: "start"
        }
      });

      expect(timer.steps.length  ).to.be.equal(2);
      expect(timer.steps.position).to.be.equal("start");
    });
  });

  describe('Timer instance default state', function() {
    var timer;

    beforeEach(function() {
      timer = new Timer();
    });

    // it('Timer.play() exists', function () {
    //   expect(timer.play).to.be.a('function');
    // });

    // it('Timer.stop() exists', function () {
    //   expect(timer.stop).to.be.a('function');
    // });

    it('Timer.startTime is null and read-only', function () {
      expect(timer).to.have.a.property('startTime')
      expect(timer.startTime).to.be.a('null')
      expect(() => { timer.startTime = 0 }).to.throw()
    });

    it('Timer.delay has a default value of 0', function () {
      expect(timer).to.have.a.property('delay')
      expect(timer.delay).to.be.equal(0);
    });

    it('Timer.speed has a default value of 1', function () {
      expect(timer).to.have.a.property('speed');
      expect(timer.speed).to.be.equal(1);
    });

    it('Timer.duration has a default value of 0', function () {
      expect(timer).to.have.a.property('duration');
      expect(timer.duration).to.be.equal(0);
    });

    it('Timer.easing is a function', function () {
      expect(timer).to.have.a.property('easing');
      expect(timer.easing).to.be.a('function');
    });

    it('Timer.constrain has a default value of true', function () {
      expect(timer).to.have.a.property('constrain');
      expect(timer.constrain).to.be.equal(true);
    });

    it('Timer.loops has a default value of 1', function () {
      expect(timer).to.have.a.property('loops');
      expect(timer.loops).to.be.equal(1)
    })

    it('Timer.steps has 0 steps positioned at end', function () {
      expect(timer).to.have.a.property('steps')
      expect(timer.steps).to.be.a('object')

      expect(timer.steps).to.have.a.property('length')
      expect(timer.steps.length).to.be.equal(0)

      expect(timer.steps).to.have.a.property('position')
      expect(timer.steps.position).to.be.equal('end')
    })

    it('Timer.is is read-only and return a frozen object {playing: false, paused:false}', function () {
      expect(timer).to.have.a.property('is')
      expect(timer.is).to.be.a('object')
      expect(() => { time.is = 0 }).to.throw()

      expect(timer.is).to.have.a.property('playing')
      expect(timer.is.playing).to.be.equal(false)
      expect(() => { time.is.playing = 0 }).to.throw()

      expect(timer.is).to.have.a.property('paused')
      expect(timer.is.paused).to.be.equal(false)
      expect(() => { time.is.paused = 0 }).to.throw()
    });

    it('Timer.position is read-only and return a frozen object {value:0, time:0, loop:1}', function () {
      expect(timer).to.have.a.property('position');
      expect(timer.position).to.be.an('object');
      expect(() => { timer.position = 0 }).to.throw()

      expect(timer.position).to.have.a.property('value');
      expect(timer.position.value).to.be.equal(0);
      expect(() => { time.position.value = 0 }).to.throw()

      expect(timer.position).to.have.a.property('time');
      expect(timer.position.time).to.be.equal(0);
      expect(() => { time.position.time = 0 }).to.throw()

      expect(timer.position).to.have.a.property('loop');
      expect(timer.position.loop).to.be.equal(1);
      expect(() => { time.position.loop = 0 }).to.throw()
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

    it('Timer.play() exist', function () {
      expect(timer).to.have.a.property('play')
      expect(timer.play).to.be.a('function')
    })

    it('when Timer.play() the player change state accordingly', function () {
      timer.play()

      expect(timer.startTime).to.be.above(0);
      expect(timer.speed).to.be.not.equal(0);
      expect(timer.is.playing).to.be.equal(true);
      expect(timer.is.paused).to.be.equal(false);
    })
  })

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

    it('Timer.pause() exist', function () {
      expect(timer).to.have.a.property('pause')
      expect(timer.pause).to.be.a('function')
    })

    it('when Timer.pause() the player change state accordingly', function () {
      timer.pause();

      expect(timer.speed).to.be.equal(0);
      expect(timer.is.playing).to.be.equal(true);
      expect(timer.is.paused).to.be.equal(true);
    });

    it('when Timer.play() after Timer.pause(), Timer.speed === speed before pause', function () {
      mDate.setTime(now + 200);
      timer.speed = 2;
      expect(timer.speed).to.be.equal(2);

      mDate.setTime(now + 400);
      timer.pause();
      expect(timer.speed).to.be.equal(0);

      mDate.setTime(now + 600);
      timer.play();
      expect(timer.speed).to.be.equal(2);
    });
  })

  describe('Testing Timer.stop()', function () {
    beforeEach(function () {
      timer = new Timer(1000);
      timer.play();
    });

    it('when Timer.stop() the player change state accordingly', function () {
      timer.stop();

      expect(timer.startTime).to.be.a('null');
      expect(timer.is.playing).to.be.equal(false);
      expect(timer.is.paused).to.be.equal(false);
    });
  })

  describe('Testing Timer.freeze()', function () {
    var timer,
        now = Date.now(),
        dur = 1000;

    beforeEach(function () {
      mDate.mock();
      mDate.setTime(now);
      timer = new Timer(dur);
    });

    afterEach(function () {
      mDate.unmock();
    });

    it('On a timer which is stopped and constrain', function () {
      timer.stop()
      timer.constrain = true

      expect(() => { timer.freeze() }).to.throw()
      expect(() => { timer.freeze(now) }).to.throw()
      expect(timer.freeze(now, now - dur * 0.5)).to.be.deep.equal({time:0,   value:0  });
      expect(timer.freeze(now, now            )).to.be.deep.equal({time:0,   value:0  });
      expect(timer.freeze(now, now + dur * 0.5)).to.be.deep.equal({time:0.5, value:0.5});
      expect(timer.freeze(now, now + dur      )).to.be.deep.equal({time:1,   value:1  });
      expect(timer.freeze(now, now + dur * 1.5)).to.be.deep.equal({time:1,   value:1  });
    })

    it('On a timer which is running and constrain', function () {
      timer.play()
      timer.constrain = true
      mDate.setTime(now + dur * 0.5);

      expect(timer.freeze()).to.be.deep.equal({time:0.5,   value:0.5  });
      expect(timer.freeze(now - dur * 0.5)).to.be.deep.equal({time:0,   value:0  });
      expect(timer.freeze(now            )).to.be.deep.equal({time:0,   value:0  });
      expect(timer.freeze(now + dur * 0.5)).to.be.deep.equal({time:0.5, value:0.5});
      expect(timer.freeze(now + dur      )).to.be.deep.equal({time:1,   value:1  });
      expect(timer.freeze(now + dur * 1.5)).to.be.deep.equal({time:1,   value:1  });
    })

    it('On a timer which is stopped and not constrain', function () {
      timer.stop()
      timer.constrain = false

      expect(() => { timer.freeze() }).to.throw()
      expect(() => { timer.freeze(now) }).to.throw()
      expect(timer.freeze(now, now - dur * 0.5)).to.be.deep.equal({time:-0.5, value:-0.5  });
      expect(timer.freeze(now, now            )).to.be.deep.equal({time: 0,   value: 0    });
      expect(timer.freeze(now, now + dur * 0.5)).to.be.deep.equal({time: 0.5, value: 0.5  });
      expect(timer.freeze(now, now + dur      )).to.be.deep.equal({time: 1,   value: 1    });
      expect(timer.freeze(now, now + dur * 1.5)).to.be.deep.equal({time: 1.5, value: 1.5  });
    })

    it('On a timer which is running and not constrain', function () {
      timer.play()
      timer.constrain = false
      mDate.setTime(now + dur * 0.5);

      expect(timer.freeze()).to.be.deep.equal({time:0.5,   value:0.5  });
      expect(timer.freeze(now - dur * 0.5)).to.be.deep.equal({time:-0.5, value:-0.5});
      expect(timer.freeze(now            )).to.be.deep.equal({time: 0,   value: 0  });
      expect(timer.freeze(now + dur * 0.5)).to.be.deep.equal({time: 0.5, value: 0.5});
      expect(timer.freeze(now + dur      )).to.be.deep.equal({time: 1,   value: 1  });
      expect(timer.freeze(now + dur * 1.5)).to.be.deep.equal({time: 1.5, value: 1.5});
    })

    it('On a timer with 2 steps positioned to start', function () {
      timer.steps = {length  : 2, position: 'start'}

      expect(timer.freeze(now, now       ).value).to.be.equal(0)
      expect(timer.freeze(now, now +    1).value).to.be.equal(0.5)
      expect(timer.freeze(now, now +  499).value).to.be.equal(0.5)
      expect(timer.freeze(now, now +  500).value).to.be.equal(0.5)
      expect(timer.freeze(now, now +  501).value).to.be.equal(1)
      expect(timer.freeze(now, now +  999).value).to.be.equal(1)
      expect(timer.freeze(now, now + 1000).value).to.be.equal(1)
    })

    it('On a timer with 2 steps positioned to end', function () {
      timer.steps = {length  : 2, position: 'end'}

      expect(timer.freeze(now, now       ).value).to.be.equal(0)
      expect(timer.freeze(now, now +    1).value).to.be.equal(0)
      expect(timer.freeze(now, now +  499).value).to.be.equal(0)
      expect(timer.freeze(now, now +  500).value).to.be.equal(0.5)
      expect(timer.freeze(now, now +  501).value).to.be.equal(0.5)
      expect(timer.freeze(now, now +  999).value).to.be.equal(0.5)
      expect(timer.freeze(now, now + 1000).value).to.be.equal(1)
    })
  })
})

describe('Testing variation in a 2s linear animation', function () {
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
        //   title  : 'A 2s forward animation that turn to a 4s animation after 1s',
        //   results: [0,0.1,0.2,0.3,0.4,0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1,0],
        //   params : [{speed:1},0,0,0,0,{duration:4000}]
        // },
        {
          title  : 'A 2s forward animation that turn to a 1s animation after 1.4s',
          results: [0,0.1,0.2,0.3,0.4,0.5,0.6,0],
          params : [{speed:1},0,0,0,0,0,0,{duration:1000}]
        },
        {
          title  : 'A 2s forward animation that loop 2 times',
          results: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
          params : [{speed:1, loops:2}]
        },
        {
          title  : 'A 2s forward animation that loop 2 times after a 1s delay',
          results: [0,0,0,0,0,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
          params : [{speed:1, delay: 1000, loops:2}]
        },
        {
          title  : 'A 2s forward animation with 5 steps positioned to "end"',
          time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
          results: [0,0  ,0.2,0.2,0.4,0.4,0.6,0.6,0.8,0.8,1,0],
          params : [{speed:1, steps:5}]
        },
        {
          title  : 'A 2s forward animation with 5 steps positioned to "start"',
          time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
          results: [0,0.2,0.2,0.4,0.4,0.6,0.6,0.8,0.8,1  ,1,0],
          params : [{speed:1, steps:{length:5,position:"start"}}]
        }
      ];

  for (d in definition) {
    buildAnimationTest(dur, step, definition[d]);
  }
});

describe('Testing easing function on a 2s animation', function () {
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
        },
        {
          title  : 'Bezier [0, 0, 1, 1] (CSS linear)',
          time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
          results: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
          params : [{speed:1, easing:[0,0,1,1]}]
        },
        {
          title  : 'Bezier [0.25, 0.1, 0.25, 1] (CSS ease)',
          time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
          results: [0,0.094796306,0.29524433,0.51331516,0.68254051,0.80240339,0.88522931,0.94076461,0.97562536,0.99431648,1,0],
          params : [{speed:1, easing:[0.25,0.1,0.25,1]}]
        }//,
        // {
        //   title  : 'Bezier [0.42, 0, 1, 1] (CSS ease-in)',
        //   time   : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,0],
        //   results: [0,0.01702661,0.062282,0.12957676,0.21486094,0.31535681,0.42911977,0.55481403,0.69163393,0.83942785,1,0],
        //   params : [{speed:1, easing:[0.42,0,1,1]}]
        // }
      ];

  for (d in definition) {
    buildAnimationTest(dur, step, definition[d]);
  }
})
