/*global describe:true it:false expect:true beforeEach:true mDate:true Timer:true */

function buildStepTest(dur, index, step, definition) {
  "use strict";

  var i = index,
      s = step,
      t = definition.time ? definition.time : definition.results,
      r = definition.results;

  it(String(i*s).pad(' ', 4) + 'ms: Timer.position === { time: ' + t[i] + ', value: ' + r[i] + ' }', function () {
    var k, timer,
        i = index,
        d = dur,
        s = step,
        r = definition.results,
        t = definition.time ? definition.time : definition.results,
        p = definition.params,
        n = +new Date();

    mDate.mock();
    mDate.setTime(n);
    timer = new Timer(d);

    for(k in r) {
      if (k > i) { break; }

      mDate.setTime(n + k*s);

      if(p[k] && p[k].easing) { timer.easing = p[k].easing; }
      if(p[k] && typeof p[k].delay === 'number') { timer.delay = p[k].delay; }
      //if(p[k] && typeof p[k].speed === 'number') { timer.play(p[k].speed); }
      if(p[k] && typeof p[k].speed === 'number') { timer.play(); timer.speed = p[k].speed; }
    }

    mDate.setTime(n + i*s);

    expect(Number(timer.position.value.toPrecision(8))).toBe(r[i]);
    expect(Number(timer.position.time.toPrecision(8))).toBe(t[i]);

    mDate.unmock();
  });
}

function buildAnimationTest(dur, step, definition) {
  "use strict";

  var u = dur,
      s = step,
      d = definition;

  describe(definition.title, function () {
    var i;

    for (i=0; i<d.results.length; i++) {
        buildStepTest(u, i, s, d);
    }
  });
}

(function () {
  "use strict";

  var time, sDate = window.Date;

  function mDate() {}

  mDate.prototype.toString = function () {
    return time;
  };

  mDate.prototype.getTime = function () {
    return new sDate().getTime();
  };

  window.mDate = {
    mock: function () {
      time = 0;
      window.Date = mDate;
    },

    unmock: function () {
      window.Date = sDate;
    },

    setTime: function (value) {
      time = +value;
    }
  };
})();

String.prototype.pad = function (padStr, length) {
    "use strict";

    var string = this;

    padStr = padStr || ' ';
    length = length || 0;

    while (string.length < length) {
        string = padStr + string;
    }

    if (string.length > length) {
        string = string.substr(string.length - length);
    }

    return string;
};


beforeEach(function() {
  "use strict";

  this.addMatchers({
    toHaveAReadOnlyPropertyNamed: function(property) {
      try {
        this.actual[property] = null;
        return this.actual[property] !== null;

      } catch (e) {
        return true;
      }
    },

    toBeNear: function(value, shift) {
        return this.actual >= value - shift
            && this.actual <= value + shift;
    }
  });
});