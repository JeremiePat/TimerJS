TimerJS
=======

A simple library to manage time based animations

There is nothing more unpleasant than playing with timestamps to perform an animation, especially when you want to do some difficult computation such as playing the animation backward or applying an easing fonction to the value you want to animate. TimerJS is a solution to all that mess.

TimerJS offer you a passive timer which give you a simple 0 to 1 value all along the animation time. This value can easily use as a multiplicator to any value you want to animate.

```javascript
// Define a new timer for an animation of 5000ms
var timer = new Timer(5000);

// Define the animation loop
function myAnimation() {
    // Use timer.position.value to change the width of an element
    // Based on the time from the moment the timer has starded to play.
    myObject.style.width = (timer.position.value * 100).toFixed(2) + "%";

    // The animation loop can be automaticaly stoped once 
    // the Timer reach the end of the animation time.
    if(timer.is.playing) {
        requestAnimationFrame(myAnimation);
    }
}

// Start the timer
Timer.play();

// Start the animation loop, independenly from the timer
myAnimation();
```

API Documentation
-----------------

### Constructor

``Timer(duration, delay, easing)``

When you instentiate an new Timer, you can immediatly set its duration, its delay and the easing function to apply.

See below to know more about each of this parameters

```javascript
// This will instentiate a 0ms timer
var timer = new Timer();

// This will instentiate a 5000ms timer
var timer = new Timer(5000);

// This will instentiate a 5000ms timer with a 1000ms delay
var timer = new Timer(5000, 1000);

// This will instentiate a 5000ms timer with the easeInQuad build-in easing function
var timer = new Timer(5000, 0, 'easeInQuad');

// This will instentiate a 5000ms timer with a custom easing function
var timer = new Timer(5000, 0, function (t) { return t*t; });

```

### Timer.play

``Timer.play(speedFactor)``

The play fonction launch the timer or change its speed. 

The speedFactor argument determine de speed at which the timer is walk along the time line. If the speedFactor argument is homited, it's like the value ``1`` was used.

The speedFactor can be negative. In that case, the timer is playing backward.

```javascript
var timer = new Timer(5000);

timer.play();   // The timer start playing at its normal speed
timer.play(0);  // The timer is paused
timer.play(-1); // The timer is playing backward
timer.play(2);  // The timer is playing twice its normal speed
```

### Timer.stop

``Timer.stop()``

The stop function reinitialize the timer to it's starting position.

### Timer.position

The ``position`` property is a readonly object with two properties: ``value``and ``time``. The two values give the current position of the time and value in the range 0-1 since the timer has started to play. A time value of 0 means that the time is at the begining of the time line. A time value of 1 means that the time is at the end of the time line. The progression of the ``time`` value is always linear where the progression of the ``value`` value depend on the easing function used by the timer (linear by default).

```javascript
var timer = new Timer(5000);

timer.play();

setTimeout(function () {
    console.log(timer.position.value); // 0.5
    console.log(timer.position.time);  // 0.5
}, 2500);
```

### Timer.is

The ``is`` property is a readonly object with two boolean properties: ``playing`` and ``paused``. The first one say if the timer is playing and the second if it is paused.

This property is a readonly property.

```javascript
var play, pause,
    timer = new Timer(5000);

play  = timer.is.playing // false
pause = timer.is.paused  // false

timer.play();

play  = timer.is.playing // true
pause = timer.is.paused  // false

timer.play(0);

play  = timer.is.playing // true
pause = timer.is.paused  // true

timer.stop();

play  = timer.is.playing // false
pause = timer.is.paused  // false
```

### Timer.speed

The ``speed`` property give you the speed factor of the timer.

This property is a readonly property.

```javascript
var speed,
    timer = new Timer(5000);

speed = timer.speed // 1

timer.play();
speed = timer.speed // 1

timer.play(0);
speed = timer.speed // 0

timer.play(2);
speed = timer.speed // 2

timer.play(-1);
speed = timer.speed // -1
```

### Timer.easing

The ``easing`` property is the easing function used by the timer to compute the value of the ``position`` property. If the timer is playing, this property is a readonly property. Otherwise, you can change the easing function as you wish.

To change the easing function you have two possibilities.

* Creating a custom easing function. That function will accept an argument representing the time in a 0-1 range.
* Using one of the following keywords:
  * ``linear``
  * ``easeInQuad``
  * ``easeOutQuad``
  * ``easeInOutQuad``
  * ``easeInCubic``
  * ``easeOutCubic``
  * ``easeInOutCubic``
  * ``easeInQuart``
  * ``easeOutQuart``
  * ``easeInOutQuart``
  * ``easeInQuint``
  * ``easeOutQuint``
  * ``easeInOutQuint``
  * ``easeInSine``
  * ``easeOutSine``
  * ``easeInOutSine``
  * ``easeInExpo``
  * ``easeOutExpo``
  * ``easeInOutExpo``
  * ``easeInCirc``
  * ``easeOutCirc``
  * ``easeInOutCirc``
  * ``easeInElastic``
  * ``easeOutElastic``
  * ``easeInOutElastic``
  * ``easeInBack``
  * ``easeOutBack``
  * ``easeInOutBack``
  * ``easeInBounce``
  * ``easeOutBounce``
  * ``easeInOutBounce``

```javascript
var timer = new Timer(5000);

timer.easing = "easeInQuad";

timer.easing = function (t) { 
    return t*t; 
};
```

### Timer.startTime

The ``startTime`` property give you the timestamp of the begining of the animation. If the animation hasn't started yet, this property return ``null``;

This property is a readonly property.

```javascript
var startTime,
    timer = new Timer(5000);

startTime = timer.startTime // null

timer.play();

startTime = timer.startTime // A timestamp

timer.stop();

startTime = timer.startTime // null

```

### Timer.duration

The ``duration`` property allow you to retrieve the timer duration. If the timer is playing, this property is a readonly property. If the timer is not playing, you can change the value of this property.

```javascript
var duration,
    timer = new Timer(5000);

duration = timer.duration; // 5000

timer.duration = 1000; // The timer is now set with a 1000ms duration

timer.play();

duration = timer.duration; // 1000

timer.duration = 2000; // Throw an error
```

### Timer.delay

The ``delay`` property allow you to retrieve the timer delay. If the timer is playing, this property is a readonly property. If the timer is not playing, you can change the value of this property.

```javascript
var delay,
    timer = new Timer(5000);

delay = timer.delay; // 0

timer.delay = 1000; // The timer is now set with a 1000ms delay

timer.play();

delay = timer.delay; // 1000

timer.delay = 2000; // Throw an error
```

A delay can be negative. A positive delay means that the timer will wait for the delay value before changing its time and value position. A negative delay means that when the timer will start it will be as if it was playing since the delay value.

```javascript
var value, time,
    timer = new Timer(5000, -2500);

value = timer.position.value; // 0
time  = timer.position.time ; // 0

timer.play();

value = timer.position.value; // 0.5
time  = timer.position.time ; // 0.5
```


Roadmap
-------

This timer is far from finished the plan is to add the following features:

* Enable loop
* Autorized "out of range" time (currently constrain to the a 0-1 range)
* Improve reverse animation
* Add the ability to remember the last state of an animation when stoped.
* Add the ability to get a value against an arbitrary time, even if the timer is not playing.
* Allow change of any paramaters while the timer is playing
* Allow to synchronize several timers