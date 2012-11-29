    // ---------------- //
    // ENV VARIABLES    //
    // ---------------- //

    var t; // Timer


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
            clear    : document.getElementById("clear")
        },

        canvas : {
            paper   : document.getElementById("drawing"),
            hidden  : document.createElement("canvas"),
            context : document.getElementById("drawing").getContext('2d'),
            margin  : 40,

            init    : function (easing) {
                var w = this.paper.width,
                    h = this.paper.height,
                    ctx = this.hidden.getContext('2d');
                
                this.hidden.width  = w;
                this.hidden.height = h;

                this.background(ctx);
                this.curve(ctx, easing);
            },

            draw     : function (time, value) {
                this.context.clearRect(0,0,this.paper.width,this.paper.height);
                this.context.drawImage(this.hidden, 0, 0);

                this.point(time, value); 
            },

            background : function (ctx) {
                var m   = this.margin,
                    w   = this.paper.width,
                    h   = this.paper.height;

                ctx.strokeStyle = "#000";

                ctx.beginPath();
                ctx.moveTo(15.5,20.5);
                ctx.lineTo(20.5,20.5);
                ctx.moveTo(20.5,10.5);
                ctx.lineTo(20.5,h - m + 25.5);
                ctx.moveTo(15.5,h - m + 20.5);
                ctx.lineTo(w - m + 30.5,h - m + 20.5);
                ctx.moveTo(w - m + 20.5,h - m + 20.5);
                ctx.lineTo(w - m + 20.5,h - m + 25.5);
                ctx.stroke();

                ctx.strokeStyle = "#999";
                ctx.mozDash = [2,4];

                ctx.beginPath();
                ctx.moveTo(20.5,20.5);
                ctx.lineTo(w - m + 20.5,20.5);
                ctx.lineTo(w - m + 20.5,h - m + 20.5);
                ctx.stroke();

                ctx.mozDash = null;

                ctx.font = "9px Verdana, sans-serif";
                ctx.fillText("1", 8.5,23);
                ctx.fillText("0", 8.5,h - m + 23.5);
                ctx.fillText("0",17.5,h - m + 34);
                ctx.fillText("1",w - m + 17.5,h - m + 34);
            },

            curve : function (ctx, easing) {
                var x, y,
                    m = this.margin,
                    w = this.paper.width,
                    h = this.paper.height,
                    l = 1/(w - m);

                ctx.strokeStyle = "#F00";

                ctx.beginPath();
                ctx.moveTo(20.5,h - m + 20.5);

                for (x = 0; x <= 1; x += l) {
                    y = easing(x, 0, 1, 1);
                    ctx.lineTo((w - m)*x + 20.5, (h - m)*(1 - y) + 20.5);
                }
                
                ctx.stroke();
            },

            // value and time are numbers between 0 and 1
            point : function (time, value) {
                var m   = this.margin,
                    w   = this.paper.width,
                    h   = this.paper.height,
                    x   = 20.5 + time * (w - m),
                    y   = (h - m)*(1 - value) + 20.5; //(h - m + 20.5) - value * (h - m);

                this.context.fillStyle = "#000";
                this.context.beginPath();
                this.context.arc(x,y,5,0,360);
                this.context.fill();
            }
        },

        setActiveButton : function (button) {
            var bt;

            for(bt in this.btn) {
                this.btn[bt].className = '';
            }

            button.className = 'active';
        }
    }

    // Main animation Loop
    function theLoop() {
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
            t.stop();
            t.easing = value;
        },

        updateDuration : function (value) {
            t.stop();
            t.duration = value;
        },

        updateDelay : function (value) {
            t.stop();
            t.delay = value;
        },

        forward : function () {
            var isPlaying = t.is.playing;

            t.play(10);
            
            if(!isPlaying) theLoop();
        },

        backward : function () {
            var isPlaying = t.is.playing;

            t.play(-10);
            
            if(!isPlaying) theLoop();
        },

        pause : function () {
            t.play(0);
        },

        play : function () {
            var isPlaying = t.is.playing;
            
            t.play(1);
            
            setTimeout(function () { if(!isPlaying) theLoop(); }, 200);
        },

        playback : function () {
            var isPlaying = t.is.playing;

            t.play(-1);
            
            if(!isPlaying) theLoop();
        },

        stop : function () {
            t.stop();
            theLoop();
        }
    }


    // ---------------- //
    // CONTROLER        //
    // ---------------- //
    document.addEventListener("change", function (evt) {
        
        if (evt.target === UI.param.easing) {
            Action.updateEasing(evt.target.value);
            UI.setActiveButton(UI.btn.stop);
            UI.metter.style.width = "0";
            UI.canvas.init(t.easing);
            UI.canvas.draw(0,0);
        }

        else if (evt.target === UI.param.duration) {
            Action.updateDuration(evt.target.value);
            UI.setActiveButton(UI.btn.stop);
            UI.metter.style.width = "0";
            UI.canvas.draw(0,0);
        }

        else if (evt.target === UI.param.delay) {
            Action.updateDelay(evt.target.value);
            UI.setActiveButton(UI.btn.stop);
            UI.metter.style.width = "0";
            UI.canvas.draw(0,0);
        }
    
    }, false)

    document.addEventListener("click", function (evt) {
        
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
        easing  : UI.param.easing.value
    });

    UI.canvas.init(t.easing);
    UI.canvas.draw(0,0);

    console.log("Timer");

    for (i in t) {
        console.log("Timer." + i )
    }