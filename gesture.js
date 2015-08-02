var GJS;
function gestureJsCommon(){}
(function(){
	'use strict';
	// const
	var DOT_PRODUCT_RANGE = 0.95;

	// = custom event =========================================================
	// swipe
	gestureJsCommon.prototype.swipe = function(target, callback){
		if(!target.addEventListener){logText('swipe'); return false;}
		var eo = new eventObject(callback);
		eventSetter(
			target,
			function(eve){
				var p = eventHub(eve);
				eo.startX = p.px; eo.startY = p.py;
				eo.downCount = 1; eo.downFlg = true; eo.applyFlg = false;
			},
			function(eve){
				eo.downFlg = false;
				eo.applyFlg = false;
			},
			function(eve){
				if(eo.downFlg){
					++eo.downCount;
					var p = eventHub(eve);
					var v = vector(eo.startX, eo.startY, p.px, p.py);
					if(eo.applyFlg || (eo.downCount > 5 && v.length > 50)){
						eo.applyFlg = true;
						eo.callback();
					}
				}
			}
		);
		return true;
	};

	// swipe dot diff
	gestureJsCommon.prototype.gestureSwipeDotDiff = function(target, callback, type, dx, dy){
		if(!target.addEventListener){logText(type); return false;}
		var eo = new eventObject(callback);
		eventSetter(
			target,
			function(eve){
				var p = eventHub(eve);
				eo.startX = p.px; eo.startY = p.py;
				eo.downCount = 1; eo.downFlg = true;
			},
			function(eve){
				eo.downFlg = false;
			},
			function(eve){
				if(eo.downFlg){
					++eo.downCount;
					var p = eventHub(eve);
					var v = vector(eo.startX, eo.startY, p.px, p.py);
					if(dot2d(v.vx, v.vy, dx, dy) > DOT_PRODUCT_RANGE &&
					   eo.downCount > 5 && v.length > 50){
						eo.downFlg = false;
						eo.callback();
					}
				}
			}
		);
		return true;
	};
	// swipe up
	gestureJsCommon.prototype.swipeUp = function(target, callback){
		this.gestureSwipeDotDiff(target, callback, 'swipe up', 0.0, 1.0);
	};
	// swipe down
	gestureJsCommon.prototype.swipeDown = function(target, callback){
		this.gestureSwipeDotDiff(target, callback, 'swipe down', 0.0, -1.0);
	};
	// swipe left
	gestureJsCommon.prototype.swipeLeft = function(target, callback){
		this.gestureSwipeDotDiff(target, callback, 'swipe left', -1.0, 0.0);
	};
	// swipe right
	gestureJsCommon.prototype.swipeRight = function(target, callback){
		this.gestureSwipeDotDiff(target, callback, 'swipe right', 1.0, 0.0);
	};

	// = utility ==============================================================
	function eventSetter(target, funcDown, funcUp, funcMove){
		target.addEventListener('mousedown',  funcDown, false);
		target.addEventListener('mouseup',    funcUp  , false);
		target.addEventListener('mousemove',  funcMove, false);
		target.addEventListener('touchstart', funcDown, false);
		target.addEventListener('touchend',   funcUp  , false);
		target.addEventListener('touchmove',  funcMove, false);
	}
	function eventHub(eve, index){
		var i;
		if(eve.changedTouches){
			if(!index){i = 0;}else{i = index;}
			return {
				px: eve.changedTouches[i].pageX,
				py: eve.changedTouches[i].pageY
			};
		}else{
			return {px: eve.pageX, py: eve.pageY};
		}
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
	function logText(type){
		console.log('event listen is failed [' + type + ']');
	}

	// = event object =========================================================
	function eventObject(callback){
		this.startX = 0;
		this.startY = 0;
		this.downCount = 0;
		this.downFlg = false;
		this.applyFlg = false;
		this.callback = callback;
	}
})(this);
GJS = new gestureJsCommon();
