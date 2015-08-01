
var GJS = {};
(function(){
	'use strict';

	// // const
	// GJS.prototype.SWIPE              = 0;
	// GJS.prototype.SWIPE_UP           = 1;
	// GJS.prototype.SWIPE_DOWN         = 2;
	// GJS.prototype.SWIPE_LEFT         = 3;
	// GJS.prototype.SWIPE_RIGHT        = 4;
	// GJS.prototype.DOUBLE_SWIPE       = 10;
	// GJS.prototype.DOUBLE_SWIPE_UP    = 11;
	// GJS.prototype.DOUBLE_SWIPE_DOWN  = 12;
	// GJS.prototype.DOUBLE_SWIPE_LEFT  = 13;
	// GJS.prototype.DOUBLE_SWIPE_RIGHT = 14;
	// GJS.prototype.PINCH              = 20;
	// GJS.prototype.PINCH_IN           = 21;
	// GJS.prototype.PINCH_OUT          = 22;

	// swipe
	GJS.prototype.swipe = function(target, callback){
		if(!target.addEventListener){
			console.log('listen is failed [swipe]');
			return false;
		}
		var eo = new eventObject(callback);
		GJS.eventSetter(
			target,
			function(eve){
				eo.downFlg = true;
				console.log('down');
			},
			function(eve){
				eo.downFlg = false;
				console.log('up');
			},
			function(eve){
				eo.callback();
			}
		);
		return true;
	};

	// utility
	GJS.prototype.eventSetter = function(target, funcDown, funcUp, funcMove){
		target.addEventListener('mousedown', funcDown, false);
		target.addEventListener('mouseup',   funcUp  , false);
		target.addEventListener('mousemove', funcMove, false);
	};

	// event object
	function eventObject(callback){
		this.downFlg = false;
		this.callback = callback;
	}
})();

