
window.onload = function(){
	GJS.setParam(null, null, null, null, false); // sync => false, async => true
	GJS.swipe(window, null, null, function(){console.log('swipe!');});
	GJS.swipeUp(window, null, null, function(){console.log('swipe up!!');});
	GJS.swipeDown(window, null, null, function(){console.log('swipe down!!');});
	GJS.swipeLeft(window, null, null, function(){console.log('swipe left!!');});
	GJS.swipeRight(window, null, null, function(){console.log('swipe right!!');});
	GJS.doubleSwipe(window, null, null, function(){console.log('double swipe!');});
	GJS.doubleSwipeUp(window, null, null, function(){console.log('double swipe up!!');});
	GJS.doubleSwipeDown(window, null, null, function(){console.log('double swipe down!!');});
	GJS.doubleSwipeLeft(window, null, null, function(){console.log('double swipe left!!');});
	GJS.doubleSwipeRight(window, null, null, function(){console.log('double swipe right!!');});
	GJS.pinch(window, null, null, function(){console.log('pinch!');});
	GJS.pinchIn(window, null, null, function(){console.log('pinch in!!');});
	GJS.pinchOut(window, null, null, function(){console.log('pinch out!!');});
};

