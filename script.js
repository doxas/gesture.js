
/*global GJS*/

window.onload = function(){
    var e = document.getElementById('paragraph');
    var g = new GJS(document.body);
    g.addEventListener('pinch',       function(eve){e.textContent = 'pinch '       + eve.param[0].pageX;});
    g.addEventListener('pinchIn',     function(eve){e.textContent = 'pinchIn '     + eve.param[0].pageX;});
    g.addEventListener('pinchOut',    function(eve){e.textContent = 'pinchOut '    + eve.param[0].pageX;});
    g.addEventListener('pinchRotate', function(eve){e.textContent = 'pinchRotate ' + eve.param[0].pageX;});
};

