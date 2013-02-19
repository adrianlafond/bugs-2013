
// @namespace global
var BUGS

;(function ($) {
  'use strict'
  
  var devicePixelRatio = window.devicePixelRatio || 1,
      width,
      height,
      
      bugs = {},      
      files,
      fileIndex = 0,
      loading = false,
      
      $btnPrev,
      $btnNext
      
      
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
    
    // Set canvas dimensions proportionate to devicePixelRatio.
    $canvas.attr('width', BUGS.px(BUGS.width()))
    $canvas.attr('height', BUGS.px(BUGS.height()))
    
    // Initialize Paper.js.
    paper.setup($canvas.get(0))
    
    // Load data.
    $.getJSON('assets/bugs.json', onBugsDataComplete)
  }
  
  
  function onBugsDataComplete(data) {
    initPrevNext()
    files = data.scripts
    routie({ ':bug?': onRoute })
  }
  
  
  function initPrevNext() {
    $btnPrev = $('[title=prev]').css('display', 'block')
    $btnNext = $('[title=next]').css('display', 'block')
  }
  
  
  function onRoute(route) {
    var i, len,
        index = -1
    for (i = 0, len = files.length; i < len; i++) {
      if (files[i].id === route) {
        index = i
        break
      }
    }
    fileIndex = (index === -1) ? 0 : index
    loadBug(fileIndex)
  }
  
  
  function loadBug(index) {
    loading = true
    $.getScript(files[fileIndex].src)
  }

}(jQuery));
