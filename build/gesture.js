var GJS;!function(t){"use strict";var e={},n=window.hasOwnProperty("ontouchstart");n?(e.start="touchstart",e.end="touchend",e.move="touchmove"):(e.start="mousedown",e.end="mouseup",e.move="mousemove");var o=function(){this.pinch=null,this.pinchIn=null,this.pinchOut=null,this.pinchRotate=null};GJS=function(t){this.target=t,t.addEventListener(e.start,this.start,!1),t.addEventListener(e.end,this.end,!1),t.addEventListener(e.move,this.move,!1)},GJS.prototype.target=null,GJS.prototype.eventList=new o,GJS.prototype.callbackList=new o,GJS.prototype.addEventListener=function(t,e){this.eventList[t]=!0,this.callbackList[t]=e},GJS.prototype.start=function(t){console.log("start "+t)},GJS.prototype.end=function(t){console.log("end "+t)},GJS.prototype.move=function(t){console.log("move "+t)}}(this);