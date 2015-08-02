
window.onload = function(){
	GJS.swipe(window, function(){console.log('swipe!!');});
	GJS.swipeUp(window, function(){console.log('swipe up!!');});
	GJS.swipeDown(window, function(){console.log('swipe down!!');});
	GJS.swipeLeft(window, function(){console.log('swipe left!!');});
	GJS.swipeRight(window, function(){console.log('swipe right!!');});
};

