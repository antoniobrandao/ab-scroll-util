// 'use strict';

/*
* Scroll Utils by Antonio Brandao (http://antoniobrandao.com/)
* 
* Licensed under the MIT License
* http://choosealicense.com/licenses/mit
*/

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

module.exports = {

	// call to disable scroll where possible
	disableScroll: function()
	{
		if (window.addEventListener) {
			window.addEventListener('DOMMouseScroll', wheel, false);
		}

		window.onmousewheel = document.onmousewheel = wheel;
		document.onkeydown = keydown;
		scroll_lock = true;
	},

	// call to enable scroll
	enableScroll: function()
	{
		if (window.removeEventListener) {
			window.removeEventListener('DOMMouseScroll', wheel, false);
		}

		window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
		scroll_lock = false;
	},

  	getScrollbarWidth: function() 
    {
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);        

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    }
}


// system

var preventDefault = function(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

var keydown = function(e) {
  for (var i = keys.length; i--;) {
    if (e.keyCode === keys[i]) {
      preventDefault(e);
      return;
    }
  }
}

var wheel = function(e) {
  preventDefault(e);
}
