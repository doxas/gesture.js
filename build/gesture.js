function gestureJsCommon(){}var GJS;!function(){"use strict";function t(t,n,e,o){t.addEventListener("mousedown",n,!1),t.addEventListener("mouseup",e,!1),t.addEventListener("mousemove",o,!1),t.addEventListener("touchstart",n,!1),t.addEventListener("touchend",e,!1),t.addEventListener("touchmove",o,!1)}function n(t,n){var e;return t.changedTouches?(e=n?n:0,t.changedTouches[e]?{px:t.changedTouches[e].pageX,py:t.changedTouches[e].pageY}:null):null!=n&&n>0?null:{px:t.pageX,py:t.pageY}}function e(t,n,e,o){var s,r,i,p,u;return r=p=e-t,i=u=o-n,s=Math.sqrt(r*r+i*i),0!==s&&(p/=s,u/=s),{length:s,x:r,y:i,vx:p,vy:-u}}function o(t,n,e,o){return t*e+n*o}function s(t){console.log("event listen is failed ["+t+"]")}function r(t){this.startX=0,this.startY=0,this.secondStartX=0,this.secondStartY=0,this.downCount=0,this.downFlg=!1,this.applyFlg=!1,this.callback=t}var i=50,p=.95;gestureJsCommon.prototype.swipe=function(o,p){if(!o.addEventListener)return s("swipe"),!1;var u=new r(p);return t(o,function(t){var e=n(t);u.startX=e.px,u.startY=e.py,u.downCount=1,u.downFlg=!0,u.applyFlg=!1},function(t){u.downFlg=!1,u.applyFlg=!1},function(t){if(u.downFlg){++u.downCount;var o=n(t),s=e(u.startX,u.startY,o.px,o.py);(u.applyFlg||u.downCount>5&&s.length>i)&&(u.applyFlg=!0,u.callback())}}),!0},gestureJsCommon.prototype.gestureSwipeDotDiff=function(u,a,d,l,c){if(!u.addEventListener)return s(d),!1;var g=new r(a);return t(u,function(t){var e=n(t);g.startX=e.px,g.startY=e.py,g.downCount=1,g.downFlg=!0},function(t){g.downFlg=!1},function(t){if(g.downFlg){++g.downCount;var s=n(t),r=e(g.startX,g.startY,s.px,s.py);o(r.vx,r.vy,l,c)>p&&g.downCount>5&&r.length>i&&(g.downFlg=!1,g.callback())}}),!0},gestureJsCommon.prototype.swipeUp=function(t,n){this.gestureSwipeDotDiff(t,n,"swipe up",0,1)},gestureJsCommon.prototype.swipeDown=function(t,n){this.gestureSwipeDotDiff(t,n,"swipe down",0,-1)},gestureJsCommon.prototype.swipeLeft=function(t,n){this.gestureSwipeDotDiff(t,n,"swipe left",-1,0)},gestureJsCommon.prototype.swipeRight=function(t,n){this.gestureSwipeDotDiff(t,n,"swipe right",1,0)},gestureJsCommon.prototype.doubleSwipe=function(u,a){if(!u.addEventListener)return s("double swipe"),!1;var d=new r(a);return t(u,function(t){var e=n(t);d.downFlg||(d.startX=e.px,d.startY=e.py,d.secondStartX=-1,d.secondStartY=-1,d.downCount=1,d.downFlg=!0,d.applyFlg=!1)},function(t){d.downFlg=!1,d.applyFlg=!1},function(t){var s=n(t,0),r=n(t,1);if(d.downFlg&&null!=r){++d.downCount;var u=e(d.startX,d.startY,s.px,s.py);if(d.downCount>5&&u.length>i)if(d.secondStartX<0)d.secondStartX=r.px,d.secondStartY=r.py;else{var a=e(d.secondStartX,d.secondStartY,r.px,r.py);(d.applyFlg||o(u.vx,u.vy,a.vx,a.vy)>p)&&(d.applyFlg=!0,d.callback())}}}),!0}}(this),GJS=new gestureJsCommon;