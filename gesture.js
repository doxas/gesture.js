
var GJS;
(function(global){
    'use strict';
    var PINCH_IN_LENGTH = 10;

    var eventName = {};
    var touches = window.hasOwnProperty('ontouchstart');
    if(touches){
        eventName.start = 'touchstart';
        eventName.end   = 'touchend';
        eventName.move  = 'touchmove';
    }else{
        eventName.start = 'mousedown';
        eventName.end   = 'mouseup';
        eventName.move  = 'mousemove';
    }
    var EventNames = function(){
        this.start       = null;
        this.end         = null;
        this.move        = null;
        this.pinch       = null;
        this.pinchIn     = null;
        this.pinchOut    = null;
        this.pinchRotate = null;
    };
    var EventParam = function(){
        this.pageX  = null;
        this.pageY  = null;
        this.prevX  = null;
        this.prevY  = null;
        this.firstX = null;
        this.firstY = null;
        this.pinchPower = 1;
    };

    GJS = function(target){
        this.target = target;
        target.GJS = this;
        target.addEventListener(eventName.start, this.start, false);
        target.addEventListener(eventName.end,   this.end,   false);
        target.addEventListener(eventName.move,  this.move,  false);
    };
    GJS.prototype.target = null;
    GJS.prototype.eventList = new EventNames();
    GJS.prototype.callbackList = new EventNames();
    GJS.prototype.param = [new EventParam(), new EventParam()];
    GJS.prototype.addEventListener = function(type, callback){
        this.eventList[type] = true;
        this.callbackList[type] = callback;
    };

    GJS.prototype.start = function(eve){
        var g = this.GJS;
        var e = [];
        if(eve.changedTouches){
            e[0] = eve.changedTouches[0];
            setParamStart(g.param[0], e[0]);
            if(eve.changedTouches.length > 1){
                e[1] = eve.changedTouches[1];
                setParamStart(g.param[1], e[1]);
            }
        }else{
            e[0] = eve;
            setParamStart(g.param[0], e[0]);
        }
        if(g.eventList.pinch){g.callbackList.pinch(g);}
    };

    GJS.prototype.end = function(eve){
        var g = this.GJS;
        var e = [];
        if(eve.changedTouches){
            e[0] = eve.changedTouches[0];
            setParamEnd(g.param[0], e[0]);
            if(eve.changedTouches.length > 1){
                e[1] = eve.changedTouches[1];
                setParamEnd(g.param[1], e[1]);
            }
        }else{
            e[0] = eve;
            setParamEnd(g.param[0], e[0]);
        }
        // if(g.eventList.end){g.callbackList.end(e[0]);}
    };

    GJS.prototype.move = function(eve){
        var g = this.GJS;
        var e = [];
        var multi = false;
        var pin, pout, prot;
        if(eve.changedTouches){
            e[0] = eve.changedTouches[0];
            if(eve.changedTouches.length > 1){
                multi = true;
                e[1] = eve.changedTouches[1];
            }
        }else{
            e[0] = eve;
        }

        if(!multi){return;}
        eve.preventDefault();
        setParamMove(g.param[0], e[0]);
        setParamMove(g.param[1], e[1]);

        // check pinch
        var p0 = vector(      // vector data gen
            g.param[0].prevX,
            g.param[0].prevY,
            g.param[0].pageX,
            g.param[0].pageY
        );
        var p1 = vector(
            g.param[1].prevX,
            g.param[1].prevY,
            g.param[1].pageX,
            g.param[1].pageY
        );
        // x and y is from p0 to p1 vector
        var x = g.param[1].pageX - g.param[0].pageX;
        var y = g.param[1].pageY - g.param[0].pageY;
        var q = Math.sqrt(x * x + y * y);
        var vx = x, vy = y;
        if(q !== 0){vx /= q; vy /= q;}
        // prefix p is prev
        var px = g.param[1].pageX - g.param[0].pageX;
        var py = g.param[1].pageY - g.param[0].pageY;
        var pq = Math.sqrt(px * px + py * py);
        var pvx = px, pvy = py;
        if(pq !== 0){pvx /= pq; pvy /= pq;}
        // dot product
        var vDot = dot2d(p0.vx, p0.vy, p1.vx, p1.vy); // vector dot
        var vDotLine0 = dot2d(p0.vx, p0.vy, vx, vy);  // vector dot for p0 to p1 line
        var vDotLine1 = dot2d(p1.vx, p1.vy, vx, vy);  // vector dot for p0 to p1 line
        // length
        var vPrevLength = length2d(                   // length for p0 to p1
            g.param[0].prevX,
            g.param[0].prevY,
            g.param[1].prevX,
            g.param[1].prevY
        );
        var vPageLength = length2d(                   // length for p0 to p1
            g.param[0].pageX,
            g.param[0].pageY,
            g.param[1].pageX,
            g.param[1].pageY
        );
        var subLength = vPrevLength - vPageLength;

        if(vDot < -0.9){
            // check pinchIn
            if(Math.abs(vDotLine0) > 0.9 && Math.abs(vDotLine1) > 0.9 && subLength > PINCH_IN_LENGTH){
                pin = true;
            }
            // check pinchOut
            if(Math.abs(vDotLine0) > 0.9 && Math.abs(vDotLine1) > 0.9 && -subLength > PINCH_IN_LENGTH){
                pout = true;
            }
            // check pinchRotate
            if(!pin && !pout){
                if(Math.abs(vDotLine0) < 0.2 && Math.abs(vDotLine1) < 0.2 && (p0.length + p1.length) > PINCH_IN_LENGTH){
                    prot = true;
                }
            }
        }

        if(pin && g.eventList.pinchIn){g.callbackList.pinchIn(g);}
        if(pout && g.eventList.pinchOut){g.callbackList.pinchOut(g);}
        if(prot && g.eventList.pinchRotate){g.callbackList.pinchRotate(g);}
        if((pin || pout) && g.eventList.pinch){g.callbackList.pinch(g);}
    };

    function setParamStart(p, e){
        p.pageX = p.prevX = p.firstX = e.pageX;
        p.pageY = p.prevY = p.firstY = e.pageY;
    }
    function setParamEnd(p, e){
        p.pageX = p.prevX = p.firstX = null;
        p.pageY = p.prevY = p.firstY = null;
    }
    function setParamMove(p, e){
        p.prevX = p.pageX;
        p.prevY = p.pageY;
        p.pageX = e.pageX;
        p.pageY = e.pageY;
    }
    function vector(sx, sy, nx, ny){
        var q, x, y, vx, vy;
        x = vx = nx - sx;
        y = vy = ny - sy;
        q = Math.sqrt(x * x + y * y);
        if(q !== 0){vx /= q; vy /= q;}
        return {length: q, x: x, y: y, vx: vx, vy: -vy};
    }
    function dot2d(vx, vy, tx, ty){
        return vx * tx + vy * ty;
    }
    function length2d(vx, vy, tx, ty){
        return Math.sqrt(vx * tx + vy * ty);
    }
})(this);

