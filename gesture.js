var GJS;
function gestureJsCommon(){}
(function(){
	'use strict';
	// const
	var DRAG_LENGTH = 50; // 一部のイベントが発生するまでのドラッグ操作の距離（ピクセル単位）
	var DOT_PRODUCT_RANGE = 0.95; // スワイプ系操作で、方向に関する処理の判定の際に内積で一致するとみなす許容範囲（−1.0〜1.0）
	var PINCH_LENGTH = 25; // ピンチイベントが発生するまでのドラッグ操作の距離（ピクセル単位）
	var DOT_PRODUCT_PINCH_RANGE = 0.75; // ピンチ操作を行った際の方向許容範囲（-1.0〜1.0））

	// = custom event =========================================================
	// - swipe ----------------------------------------------------------------
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
		return this.gestureSwipeDotDiff(target, callback, 'swipe up', 0.0, 1.0);
	};
	// swipe down
	gestureJsCommon.prototype.swipeDown = function(target, callback){
		return this.gestureSwipeDotDiff(target, callback, 'swipe down', 0.0, -1.0);
	};
	// swipe left
	gestureJsCommon.prototype.swipeLeft = function(target, callback){
		return this.gestureSwipeDotDiff(target, callback, 'swipe left', -1.0, 0.0);
	};
	// swipe right
	gestureJsCommon.prototype.swipeRight = function(target, callback){
		return this.gestureSwipeDotDiff(target, callback, 'swipe right', 1.0, 0.0);
	};

	// - double swipe ---------------------------------------------------------
	gestureJsCommon.prototype.doubleSwipe = function(target, callback){
		if(!target.addEventListener){logText('double swipe'); return false;}
		var eo = new eventObject(callback);
		eventSetter(
			target,
			function(eve){
				var p = eventHub(eve);
				if(eo.downFlg){return;}
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

	// double swipe dot diff
	gestureJsCommon.prototype.gestureDoubleSwipeDotDiff = function(target, callback, type, dx, dy){
		if(!target.addEventListener){logText(type); return false;}
		var eo = new eventObject(callback);
		eventSetter(
			target,
			function(eve){
				var p = eventHub(eve);
				if(eo.downFlg){return;}
				eo.startX = p.px; eo.startY = p.py;
				eo.secondStartX = -1; eo.secondStartY = -1;
				eo.downCount = 1; eo.downFlg = true;
			},
			function(eve){
				eo.downFlg = false;
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
							if(dot2d(v.vx, v.vy, dx, dy) > DOT_PRODUCT_RANGE &&
							   dot2d(v.vx, v.vy, w.vx, w.vy) > DOT_PRODUCT_RANGE){
								eo.downFlg = false;
								eo.callback();
							}
						}
					}
				}
			}
		);
		return true;
	};
	// double swipe up
	gestureJsCommon.prototype.doubleSwipeUp = function(target, callback){
		return this.gestureDoubleSwipeDotDiff(target, callback, 'double swipe up', 0.0, 1.0);
	};
	// double swipe down
	gestureJsCommon.prototype.doubleSwipeDown = function(target, callback){
		return this.gestureDoubleSwipeDotDiff(target, callback, 'double swipe down', 0.0, -1.0);
	};
	// double swipe left
	gestureJsCommon.prototype.doubleSwipeLeft = function(target, callback){
		return this.gestureDoubleSwipeDotDiff(target, callback, 'double swipe left', -1.0, 0.0);
	};
	// double swipe right
	gestureJsCommon.prototype.doubleSwipeRight = function(target, callback){
		return this.gestureDoubleSwipeDotDiff(target, callback, 'double swipe right', 1.0, 0.0);
	};

	// - pinch ----------------------------------------------------------------
	gestureJsCommon.prototype.pinch = function(target, callback){
		if(!target.addEventListener){logText('pinch'); return false;}
		var eo = new eventObject(callback);
		eventSetter(
			target,
			function(eve){
				var p = eventHub(eve);
				if(eo.downFlg){return;}
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
					if(eo.downCount > 5 && v.length > PINCH_LENGTH){
						if(eo.secondStartX < 0){
							eo.secondStartX = q.px;
							eo.secondStartY = q.py;
						}else{
							var w = vector(eo.secondStartX, eo.secondStartY, q.px, q.py);
							if(eo.applyFlg ||
							   dot2d(v.vx, v.vy, w.vx, w.vy) < -DOT_PRODUCT_PINCH_RANGE){
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

	// pinch inout
	gestureJsCommon.prototype.gesturePinch = function(target, callback, type){
		if(!target.addEventListener){logText(type); return false;}
		var eo = new eventObject(callback);
		eventSetter(
			target,
			function(eve){
				var p = eventHub(eve);
				if(eo.downFlg){return;}
				eo.startX = p.px; eo.startY = p.py;
				eo.secondStartX = -1; eo.secondStartY = -1;
				eo.downCount = 1; eo.downFlg = true; eo.startLength = -1;
			},
			function(eve){
				eo.downFlg = false;
			},
			function(eve){
				var p = eventHub(eve, 0);
				var q = eventHub(eve, 1);
				if(eo.downFlg && q != null){
					++eo.downCount;
					var v = vector(eo.startX, eo.startY, p.px, p.py);
					if(eo.downCount > 5 && v.length > PINCH_LENGTH){
						if(eo.secondStartX < 0){
							eo.secondStartX = q.px;
							eo.secondStartY = q.py;
							eo.startLength = length2d(eo.startX, eo.startY, q.px, q.py);
						}else{
							var w = vector(eo.secondStartX, eo.secondStartY, q.px, q.py);
							var l = length2d(p.px, p.py, q.px, q.py);
							var f = (type === 'pinch in') ? (eo.startLength < l) : (eo.startLength > l);
							if(f && dot2d(v.vx, v.vy, w.vx, w.vy) < -DOT_PRODUCT_PINCH_RANGE){
								eo.callback();
							}
							eo.startLength = l;
						}
					}
				}
			}
		);
		return true;
	};
	// pinch in
	gestureJsCommon.prototype.pinchIn = function(target, callback){
		return this.gesturePinch(target, callback, 'pinch in');
	};
	// pinch out
	gestureJsCommon.prototype.pinchOut = function(target, callback){
		return this.gesturePinch(target, callback, 'pinch out');
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
	function length2d(vx, vy, tx, ty){
		return Math.sqrt(vx * tx + vy * ty);
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
		this.startLength = 0;
		this.downCount = 0;
		this.downFlg = false;
		this.applyFlg = false;
		this.callback = callback;
	}
})(this);
GJS = new gestureJsCommon();
