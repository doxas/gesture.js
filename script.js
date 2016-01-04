
/*global GJS*/

window.onload = function(){
    var e = document.getElementById('paragraph');
    var g = new GJS(document.body);
    g.addEventListener('pinch',       function(eve){e.textContent = 'pinch '       + eve.pageX;});
    g.addEventListener('pinchIn',     function(eve){e.textContent = 'pinchIn '     + eve.pageX;});
    g.addEventListener('pinchOut',    function(eve){e.textContent = 'pinchOut '    + eve.pageX;});
    g.addEventListener('pinchRotate', function(eve){e.textContent = 'pinchRotate ' + eve.pageX;});
};

