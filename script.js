
window.onload = function(){
	// GJS.swipe(window, function(){console.log('swipe!');});
	// GJS.swipeUp(window, function(){console.log('swipe up!!');});
	// GJS.swipeDown(window, function(){console.log('swipe down!!');});
	// GJS.swipeLeft(window, function(){console.log('swipe left!!');});
	// GJS.swipeRight(window, function(){console.log('swipe right!!');});
	GJS.doubleSwipe(window, function(){console.log('double swipe!');});
	// GJS.doubleSwipeUp(window, function(){console.log('double swipe up!!');});
	// GJS.doubleSwipeDown(window, function(){console.log('double swipe down!!');});
	// GJS.doubleSwipeLeft(window, function(){console.log('double swipe left!!');});
	// GJS.doubleSwipeRight(window, function(){console.log('double swipe right!!');});
	GJS.pinch(window, function(){console.log('pinch!');});
};

