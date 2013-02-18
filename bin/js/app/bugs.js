
// @namespace global
var BUGS

;(function () {
  'use strict'
  var canvas, style

  if (!!document.createElement('canvas').getContext) {
    canvas = document.getElementById('stage')
    style = window.getComputedStyle(canvas, null)
    
    BUGS = {
      devicePixelRatio: window.devicePixelRatio || 1,
      width: parseInt(style.getPropertyValue('width'), 10),
      height: parseInt(style.getPropertyValue('height'), 10),
      
      px: function (n) {
        return n * devicePixelRatio
      }
    }

    canvas.setAttribute('width', BUGS.px(BUGS.width))
    canvas.setAttribute('height', BUGS.px(BUGS.height))
  }
}());
