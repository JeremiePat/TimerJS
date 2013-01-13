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

API Overview
------------

```javascript
var timer = new Timer(config); // Constructor

// Methods
timer.play();  // Start playing the timer or change speed
timer.pause(); // Pause the timer (short cut to ``timer.speed = 0;``)
timer.stop();  // Stop the timer
timer.freeze();// Return a position against an arbitrary time

// Properties (configuration)
timer.duration; // Get/Set the duration while the timer will play
timer.delay;    // Get/Set the delay before the timer start playing
timer.speed;    // Get/Set the speed factor of the timer
timer.easing    // Get/Set the easing function that will be used by the timer
timer.constrain // Get/Set the time constrain to the range [0,1]
timer.loops     // Get/Set the number of loops the timer will proceed

// Properties (state of the timer)
timer.position.value // Get the computed value over time based on easing
timer.position.time  // Get the computed time in a 0-1 range
timer.position.loop  // Get the number of the current timing loop
timer.is.playing // Get the playing state of the timer
timer.is.paused  // Get the paused state of the timer
timer.startTime  // Get the timestamp when the timer started to play
```


API Documentation
-----------------

### Constructor

``new Timer(config)``

When you instantiate an new Timer, you can immediatly set its duration, its delay, its speed and the easing function to apply. All configuration parameters are optional, but remember that the default value for the duration is 0 millisecond which is useless in many cases. 

See below to know more about each of this parameters

```javascript
// This will instantiate a 0ms timer
var timer = new Timer();

// This will instantiate a 5000ms timer
var timer = new Timer(5000);

// This will instantiate a 5000ms timer
var timer = new Timer({
  duration: 5000
});

// This will instantiate a 5000ms timer with a 1000ms delay
var timer = new Timer({
  duration: 5000,
  delay   : 1000
});

// This will instantiate a 5000ms timer with the easeInQuad build-in easing function
var timer = new Timer({
  duration: 5000,
  easing  : 'easeInQuad'
});

// This will instantiate a 5000ms timer with a custom easing function
var timer = new Timer({
  duration: 5000, 
  easing  : function (t) { return t*t; }
});

// This will instantiate a 5000ms timer that will play backward
var timer = new Timer({
  duration: 5000, 
  delay   : -5000,
  speed   : -1
});

// This will instantiate a timer that will play 5 times
var timer = new Timer({
  duration: 5000, 
  loops   : 5
});

```


### Methods

#### Timer.play()

``Timer.play()``

The ``play`` function launch the timer. 

```javascript
var timer = new Timer(5000);

timer.play();   // The timer start playing
```

#### Timer.pause()

``Timer.pause()``

The ``pause`` function pause the timer. It means it's still playing but its position doesn't change as long as it remains paused.

#### Timer.stop()

``Timer.stop()``

The ``stop`` function reinitialize the timer to it's starting position.

#### Timer.freeze()

``Timer.freeze(now)``
``Timer.freeze(start, now)``

The ``freeze`` function return a position (time and value) against an arbitrary time.
If the player is playing, the ``freeze`` function can be called with a single parameter, otherwise it requires 2 parameters: the starttime of the animation and the time when you want the position.

```javascript
var timer = new Timer(5000);

var now = +new Date;
var position = timer.freeze(now, now + 2500)

position.time;  // 0.5
position.value; // 0.5


timer.play();

position = timer.freeze(timer.startTime + 4500);

position.time;  // 0.9
position.value; // 0.9

```


### Properties (configuration)

All those properties are read-only

#### Timer.position

The ``position`` property is a readonly object with three properties: ``value``, ``time`` and  ``loop``.

The properties ``value`` and ``time`` give the current position of the time and value in the range 0-1 since the timer has started to play. A time value of 0 means that the time is at the begining of the time line. A time value of 1 means that the time is at the end of the time line. The progression of the ``time`` value is always linear where the progression of the ``value`` value depend on the easing function used by the timer (linear by default).

The property ``loop`` indicate the number of the current loop. The number of loops always start at the value 1.

```javascript
var timer = new Timer(5000);

timer.play();

setTimeout(function () {
    console.log(timer.position.value); // 0.5
    console.log(timer.position.time);  // 0.5
    console.log(timer.position.loop);  // 1
}, 2500);
```

#### Timer.is

The ``is`` property is a readonly object with two boolean properties: ``playing`` and ``paused``. The first one say if the timer is playing and the second if it is paused.

*This property is a readonly property.*

```javascript
var play, pause,
    timer = new Timer(5000);

play  = timer.is.playing // false
pause = timer.is.paused  // false

timer.play();

play  = timer.is.playing // true
pause = timer.is.paused  // false

timer.pause(); // or timer.speed = 0;

play  = timer.is.playing // true
pause = timer.is.paused  // true

timer.stop();

play  = timer.is.playing // false
pause = timer.is.paused  // false
```

#### Timer.startTime

The ``startTime`` property give you the timestamp of the begining of the animation. If the animation hasn't started yet, this property return ``null``;


```javascript
var startTime,
    timer = new Timer(5000);

startTime = timer.startTime // null

timer.play();

startTime = timer.startTime // A timestamp

timer.stop();

startTime = timer.startTime // null

```


### Properties (state of the timer)

#### Timer.duration

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

#### Timer.delay

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

#### Timer.speed

The ``speed`` property allows you to get and set the speed factor of the timer.

It determines the speed at which the timer is walking along the time line. The default value is ``1``.

The speed can be negative. In that case, the timer is playing backward.


```javascript
var speed,
    timer = new Timer(5000);

speed = timer.speed // 1

timer.speed = 0;  // The timer is paused (it's the same as timer.pause())
timer.speed = -1; // The timer is playing backward
timer.speed = 2;  // The timer is playing twice its normal speed
```

#### Timer.easing

The ``easing`` property is the easing function used by the timer to compute the value of the ``position`` property. If the timer is playing, This property is a readonly property. Otherwise, you can change the easing function as you wish.

To change the easing function you have three possibilities.

* Creating a custom easing function. That function will accept an argument representing the time in a 0-1 range.
* Using a cubic bezier definition. It work [the same as in CSS](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property) but the four coordinates must be provide as an array of the form : [x1, y1, x2, y2]
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

timer.easing = [0.25,0.1,0.25,1];
```

#### Timer.constrain

The ``constrain`` property allow to define if the timer must play only when a time value is within the range [0,1].

If it's set to ``false``, the Timer will play (and return value) even if the time is out of the [0,1] range. By default, it is set to ``true``. 

Note that if you set the ``constrain`` property to ``false`` and if you defined an easing function with a cubic bezier curve, the behavior is undefined out of the range [0,1]. 

```javascript
var pos,
    timer = new Timer({
        duration: 5000,
        delay: 1000
    });

timer.play();

pos = timer.position; // { time:0, value:0 }

timer.constrain = false;

pos = timer.position; // { time:-0.2, value:-0.2 }
```

#### Timer.loops

The ``loops`` property allow to define the number of times the timer will play the same animation. Note that the delay parameter affect the first loop only.

If it's set to ``0``, the Timer will loop indefinitely. The default value is ``1`` (The timer will play one time).

```javascript
var timer = new Timer(5000);

timer.loops = 5;

function checkLoop() {
    // 1/5 The first time the function is call
    // 2/5 The second time the function is call
    // 3/5 The third time the function is call
    // 4/5 The fourth time the function is call
    // 5/5 The fifth time the function is call
    console.log(timer.position.loop + "/" + timer.loops);

    if (timer.position.loop < timer.loops) {
        setTimeout(checkLoop, 5000);
    }
};

checkLoop();
```

Roadmap
-------

This timer is far from finished the plan is to add the following features:

* Improve reversed animation
* Add the ability to remember the last state of an animation when stopped.
* Allow to synchronize several timers
* Support step animation

Done
----

* Add support for Cubic-Bezier definition of easing function
* Enable loop
* Autorized "out of range" time (currently constrain to the a 0-1 range)
* Add the ability to get a value against an arbitrary time, even if the timer is not playing.
* Make easing function more readable and easier to maintain
* Allow change of any parameters while the timer is playing

