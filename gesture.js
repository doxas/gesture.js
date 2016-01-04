
var GJS;
(function(global){
    'use strict';
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
        this.pageX = null;
        this.pageY = null;
        this.prevX = null;
        this.prevY = null;
        this.firstX = null;
        this.firstY = null;
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
            setParamStart(g, e[0]);
            if(eve.changedTouches.length > 1){
                e[1] = eve.changedTouches[1];
                setParamStart(g, e[1]);
            }
        }else{
            e[0] = eve;
            setParamStart(g, e[0]);
        }
        if(g.eventList.start){g.callbackList.start(eve);}
    };
    GJS.prototype.end = function(eve){
        var g = this.GJS;
        if(g.eventList.pinch){g.callbackList.pinch(eve);}
    };
    GJS.prototype.move = function(eve){
        var g = this.GJS;
        if(g.eventList.pinch){g.callbackList.pinch(eve);}
    };

    function setParamStart(g, e){
        g.param.pageX = g.param.prevX = g.param.firstX = e.pageX;
        g.param.pageY = g.param.prevY = g.param.firstY = e.pageY;
    }
    function setParamEnd(g, e){
        g.param.pageX = g.param.prevX = g.param.firstX = null;
        g.param.pageY = g.param.prevY = g.param.firstY = null;
    }
})(this);

