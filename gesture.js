var GJS;
function gestureJsCommon(){}
(function(){
	'use strict';
	// const
	var DRAG_LENGTH = 50; // 一部のイベントが発生するまでのドラッグ操作の距離
	var DOT_PRODUCT_RANGE = 0.95; // 内積で一致するとみなす許容範囲

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
					if(eo.applyFlg || (eo.downCount > 5 && v.length > DRAG_LENGTH)){
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
					   eo.downCount > 5 && v.length > DRAG_LENGTH){
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

	// double swipe 実機検証でしかダブルスワイプのテストはできないっぽい
	gestureJsCommon.prototype.doubleSwipe = function(target, callback){
		if(!target.addEventListener){logText('double swipe'); return false;}
		var eo = new eventObject(callback);
		eventSetter(
			target,
			function(eve){
				var p = eventHub(eve);
				eo.startX = p.px; eo.startY = p.py;
				eo.secondStartX = -1; eo.secondStartY = -1;
				eo.downCount = 1; eo.downFlg = true; eo.applyFlg = false;
			},
			function(eve){
				eo.downFlg = false;
				eo.applyFlg = false;
			},
			function(eve){
				var p = eventHub(eve, 0);
				var q = eventHub(eve, 1);
				if(eo.downFlg && q != null){
					++eo.downCount;
					var v = vector(eo.startX, eo.startY, p.px, p.py);
					if(eo.downCount > 5 && v.length > DRAG_LENGTH){
						if(eo.secondStartX < 0){
							eo.secondStartX = q.px;
							eo.secondStartY = q.py;
						}else{
							var w = vector(eo.secondStartX, eo.secondStartY, q.px, q.py);
							if(eo.applyFlg ||
							   dot2d(v.vx, v.vy, w.vx, w.vy) > DOT_PRODUCT_RANGE){
								eo.applyFlg = true;
								eo.callback();
							}
						}
					}
				}
			}
		);
		return true;
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
			if(!eve.changedTouches[i]){return null;}
			return {
				px: eve.changedTouches[i].pageX,
				py: eve.changedTouches[i].pageY
			};
		}else{
			if(index != null && index > 0){return null;}
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
		this.secondStartX = 0;
		this.secondStartY = 0;
		this.downCount = 0;
		this.downFlg = false;
		this.applyFlg = false;
		this.callback = callback;
	}
})(this);
GJS = new gestureJsCommon();
