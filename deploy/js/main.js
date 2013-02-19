
// @namespace global
var BUGS

;(function ($) {
  'use strict'
  
  var devicePixelRatio = window.devicePixelRatio || 1,
      width,
      height,
      
      layers = {},
      bugs = {},
      
      files,
      loading = false
      
      
  //
  $(function () {
    if (!!document.createElement('canvas').getContext) {
      initBugs()
    }
  })
  
  
  function initBugs() {
    var $canvas = $('canvas')
    
    width = parseInt($canvas.css('width'), 10)
    height = parseInt($canvas.css('height'), 10)

    BUGS = {
      width: function () {
        return width
      },
      
      height: function () {
        return height
      },
      
      px: function (pixels) {
        return pixels * devicePixelRatio
      },
      
      register: function (id, module) {
        loading = false
        bugs[id] = module
        bugs[id].play()
      }
    }
    
    $canvas.attr('width', BUGS.px(BUGS.width()))
    $canvas.attr('height', BUGS.px(BUGS.height()))
    paper.setup($canvas.get(0))
         
    layers.stage = paper.project.activeLayer
    layers.fade = new paper.Layer 
    paper.project.activeLayer = layers.stage
    
    $.getJSON('assets/bugs.json', function (data) {
      files = data.scripts
      loadBug(files[0].src)
    })
  }
  
  
  function loadBug(src) {
    $.getScript(src)
  }

}(jQuery));
