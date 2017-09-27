var time, _Date = global.Date;

class MockDate {
  toString () {
    return time
  }

  getTime () {
    return _Date().now();
  }
}

MockDate.now = function () {
  return time;
}

module.exports = {
  mock () {
    time = 0;
    global.Date = MockDate
  },

  unmock () {
    global.Date = _Date
  },

  setTime: function (value) {
    time = +value
  }
}
