
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
        this.pinch       = null;
        this.pinchIn     = null;
        this.pinchOut    = null;
        this.pinchRotate = null;
    };

    GJS = function(target){
        this.target = target;
        target.addEventListener(eventName.start, this.start, false);
        target.addEventListener(eventName.end,   this.end,   false);
        target.addEventListener(eventName.move,  this.move,  false);
    };
    GJS.prototype.target = null;
    GJS.prototype.eventList = new EventNames();
    GJS.prototype.callbackList = new EventNames();
    GJS.prototype.addEventListener = function(type, callback){
        this.eventList[type] = true;
        this.callbackList[type] = callback;
    };

    GJS.prototype.start = function(eve){console.log('start ' + eve);};
    GJS.prototype.end   = function(eve){console.log('end ' + eve);};
    GJS.prototype.move  = function(eve){console.log('move ' + eve);};
})(this);

