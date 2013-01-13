    /*global Timer:true console:true requestAnimationFrame:true */

    // ---------------- //
    // ENV VARIABLES    //
    // ---------------- //

    var t; // Timer
    var bezier = /^(?:\d+(?:\.\d+)?,){3}\d+(?:\.\d+)?$/;


    // ---------------- //
    // VIEW             //
    // ---------------- //

    var UI = {
        value : document.getElementById('value'),
        metter: document.querySelector('.metter'),
        time  : document.getElementById('time'),

        btn : {
            backward : document.getElementById("bt1"),
            playback : document.getElementById("bt2"),
            pause    : document.getElementById("bt3"),
            play     : document.getElementById("bt4"),
            forward  : document.getElementById("bt5"),
            stop     : document.getElementById("bt6")
        },

        param : {
            easing   : document.getElementById("function"),
            duration : document.getElementById("duration"),
            delay    : document.getElementById("delay"),
            loops    : document.getElementById("loops"),
            clear    : document.getElementById("clear")
        },

        canvas : {
            paper   : document.getElementById("drawing"),
            hidden  : document.createElement("canvas"),
            context : document.getElementById("drawing").getContext('2d'),
            margin  : 20.5,

            init    : function (easing) {
                "use strict";

                var w = this.paper.width,
                    h = this.paper.height,
                    ctx = this.hidden.getContext('2d');
                
                this.hidden.width  = w;
                this.hidden.height = h;

                this.background(ctx);
                this.curve(ctx, easing);
            },

            draw     : function (time, value) {
                "use strict";

                this.context.clearRect(0,0,this.paper.width,this.paper.height);
                this.context.drawImage(this.hidden, 0, 0);

                this.point(time, value);
            },

            background : function (ctx) {
                "use strict";

                var a, x1, y1, x2, y2,
                    m = this.margin,
                    w = this.paper.width,
                    h = this.paper.height;

                ctx.font = "9px Verdana, sans-serif";
                ctx.strokeStyle = "#000";

                ctx.beginPath();
                ctx.moveTo( m - 5      , m           );
                ctx.lineTo( m          , m           );
                ctx.moveTo( m          , m - 5       );
                ctx.lineTo( m          , h - m + 5   );
                ctx.moveTo( m - 5      , h - m       );
                ctx.lineTo( w - m + 10 , h - m*2 + m );
                ctx.moveTo( w - m      , h - m       );
                ctx.lineTo( w - m      , h - m + 5   );
                ctx.stroke();

                ctx.strokeStyle = "#999";
                ctx.mozDash = [2,4];

                ctx.beginPath();
                ctx.moveTo( m     , m     );
                ctx.lineTo( w - m , m     );
                ctx.lineTo( w - m , h - m );
                ctx.stroke();

                ctx.mozDash = null;

                if (UI.param.easing.value.match(bezier)) {
                    a = UI.param.easing.value.split(',');

                    ctx.strokeStyle = "#090";

                    x1 = (w - m*2)*a[0] + m;
                    y1 = (h - m*2)*(1 - a[1]) + m;
                    x2 = (w - m*2)*a[2] + m;
                    y2 = (h - m*2)*(1 - a[3]) + m;

                    ctx.beginPath();
                    ctx.moveTo( m , h - m );
                    ctx.lineTo( x1 , y1 );
                    ctx.moveTo( w - m , m );
                    ctx.lineTo( x2 , y2 );
                    ctx.stroke();

                    ctx.fillStyle = "#DEDEDE";

                    ctx.beginPath();
                    ctx.arc(x1,y1,5,0,360);
                    ctx.fill();
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.arc(x2,y2,5,0,360);
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = "#000";

                    ctx.fillText("x1 : " + a[0], x1 + 10, y1 - 15);
                    ctx.fillText("y1 : " + a[1], x1 + 10, y1 - 5);
                    ctx.fillText("x2 : " + a[2], x2 - 30, y2 + 15);
                    ctx.fillText("y2 : " + a[3], x2 - 30, y2 + 25);
                }

                ctx.fillText("1", 8.5,23);
                ctx.fillText("0", 8.5,h - m*2 + 23.5);
                ctx.fillText("0",17.5,h - m*2 + 34);
                ctx.fillText("1",w - m*2 + 17.5,h - m*2 + 34);
            },

            curve : function (ctx, easing) {
                "use strict";

                var x, y,
                    m = this.margin,
                    w = this.paper.width,
                    h = this.paper.height,
                    l = 1/(w - m);

                ctx.strokeStyle = "#F00";

                ctx.beginPath();
                ctx.moveTo(m,h - m);

                for (x = 0; x <= 1; x += l) {
                    y = easing(x, 0, 1, 1);
                    ctx.lineTo((w - m*2)*x + m, (h - m*2)*(1 - y) + m);
                }
                
                ctx.stroke();
            },

            // value and time are numbers between 0 and 1
            point : function (time, value) {
                "use strict";

                var m   = this.margin,
                    w   = this.paper.width,
                    h   = this.paper.height,
                    x   = m + time * (w - m*2),
                    y   = (h - m*2)*(1 - value) + m; //(h - m + 20.5) - value * (h - m);

                this.context.fillStyle = "#000";
                this.context.beginPath();
                this.context.arc(x,y,5,0,360);
                this.context.fill();
            }
        },

        setActiveButton : function (button) {
            "use strict";

            var bt;

            for(bt in this.btn) {
                this.btn[bt].className = '';
            }

            button.className = 'active';
        }
    };

    // Main animation Loop
    function theLoop() {
        "use strict";

        // Display progression value
        UI.value.innerHTML = t.position.value + "\n" + UI.value.innerHTML;
        UI.time.innerHTML  = t.position.time  + "\n" + UI.time.innerHTML;

        // Update metter size
        UI.metter.style.width = (t.position.value * 100).toFixed(2) + "%";

        // Update canvas rendering
        UI.canvas.draw(t.position.time, t.position.value);
        
        if(t.is.playing) {
            requestAnimationFrame(theLoop);
        } else {
            UI.setActiveButton(UI.btn.stop);
        }
    }


    // ---------------- //
    // MODEL            //
    // ---------------- //

    var Action = {
        updateEasing : function (value) {
            "use strict";

            if (value.match(bezier)) {
                value = value.split(',');
            }

            t.easing = value;
        },

        updateDuration : function (value) {
            "use strict";

            t.duration = value;
        },

        updateDelay : function (value) {
            "use strict";

            t.delay = value;
        },

        updateLoops : function (value) {
            "use strict";

            t.loops = value;
        },

        forward : function () {
            "use strict";

            t.speed = 10;
            
            if(!t.is.playing) {
                t.play();
                theLoop();
            }
        },

        backward : function () {
            "use strict";

            t.speed = -10;
            
            if(!t.is.playing) {
                t.play();
                theLoop();
            }
        },

        pause : function () {
            "use strict";

            t.pause();
        },

        play : function () {
            "use strict";

            var isPlaying = t.is.playing;
            
            t.speed = 1;
            t.play();
            
            if(!isPlaying) { theLoop(); }
        },

        playback : function () {
            "use strict";

            t.speed = -1;
            
            if(!t.is.playing) {
                t.play();
                theLoop();
            }
        },

        stop : function () {
            "use strict";

            t.stop();
            theLoop();
        }
    };


    // ---------------- //
    // CONTROLER        //
    // ---------------- //
    document.addEventListener("change", function (evt) {
        "use strict";

        if (evt.target === UI.param.easing) {
            Action.updateEasing(evt.target.value);
            UI.canvas.init(t.easing);
            UI.canvas.draw(0,0);
        }

        else if (evt.target === UI.param.duration) {
            Action.updateDuration(evt.target.value);
            UI.canvas.draw(0,0);
        }

        else if (evt.target === UI.param.delay) {
            Action.updateDelay(evt.target.value);
            UI.canvas.draw(0,0);
        }

        else if (evt.target === UI.param.loops) {
            Action.updateLoops(evt.target.value);
            UI.canvas.draw(0,0);
        }
    
    }, false);

    document.addEventListener("click", function (evt) {
        "use strict";

        if (evt.target === UI.param.clear) {
            UI.value.innerHTML = "";
            UI.time.innerHTML  = "";
        }

        else if (evt.target === UI.btn.backward) {
            UI.setActiveButton(evt.target);
            Action.backward();
        }

        else if (evt.target === UI.btn.playback) {
            UI.setActiveButton(evt.target);
            Action.playback();
        }

        else if (evt.target === UI.btn.forward) {
            UI.setActiveButton(evt.target);
            Action.forward();
        }

        else if (evt.target === UI.btn.pause) {
            UI.setActiveButton(evt.target);
            Action.pause();
        }

        else if (evt.target === UI.btn.play) {
            UI.setActiveButton(evt.target);
            Action.play();
        }

        else if (evt.target === UI.btn.stop) {
            UI.setActiveButton(evt.target);
            Action.stop();
        }

    }, false);


    // ---------------- //
    // INIT             //
    // ---------------- //

    t = new Timer({
        duration: UI.param.duration.value,
        delay   : UI.param.delay.value,
        easing  : UI.param.easing.value.match(bezier) ? UI.param.easing.value.split(',') : UI.param.easing.value,
        loops   : UI.param.loops.value
    });

    UI.canvas.init(t.easing);
    UI.canvas.draw(0,0);

    console.log("Timer");

    for (var i in t) {
        console.log("Timer." + i );
    }