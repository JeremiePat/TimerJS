const { expect } = require('chai')
const mDate = require('./mock/date.js')
const { Timer } = require('../../timer.umd.js')

function buildStepTest(dur, index, step, definition) {
  var i = index,
      s = step,
      t = definition.time ? definition.time : definition.results,
      r = definition.results;

  it(String(i*s).padStart(4, ' ') + 'ms: Timer.position === { time: ' + String(t[i]).padEnd(3, ' ') + ', value: ' + String(r[i]).padEnd(13, ' ') + ' }', function () {
    var k, timer,
        d = dur,
        r = definition.results,
        p = definition.params,
        n = +new Date();

    mDate.mock();
    mDate.setTime(n);
    timer = new Timer(d);

    for(k in r) {
      if (k > i) { break; }

      mDate.setTime(n + k*s);

      if(p[k]) {
        Object.keys(p[k]).forEach((key) => {
          if (key === 'speed') { timer.play() }
          timer[key] = p[k][key]
        })
      }
    }

    mDate.setTime(n + i*s);

    expect(Number(timer.position.value.toPrecision(8))).to.be.equal(r[i]);
    expect(Number(timer.position.time.toPrecision(8))).to.be.equal(t[i]);

    mDate.unmock();
  });
}

function buildAnimationTest(duration, step, definition) {
  describe(definition.title, function () {
    for (let i = 0, l = definition.results.length; i < l; i++) {
      buildStepTest(duration, i, step, definition);
    }
  })
}

module.exports = { buildAnimationTest }
