
// @namespace global
var BUGS

;(function ($) {
  'use strict'
  
  var devicePixelRatio = window.devicePixelRatio || 1,
      width,
      height,
      
      bugs = {},
      activeId = null,
      nextActiveId = null,
      activeIndex = 0,
         
      files,
      filesLen = 0,
      loading = false,
      
      $canvas,
      $btnPrev,
      $btnNext
      
      
  //
  $(function () {
    if (!!document.createElement('canvas').getContext) {
      initBugs()
    }
  })
  
  
  function initBugs() {
    $canvas = $('canvas')
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
        if (!activeId || activeId === id) {
          activeId = id
          transitionBugIn()
        }
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
    filesLen = files.length
    routie({ ':bug?': onRoute })
  }
  
  
  function initPrevNext() {
    $btnPrev = $('[title=prev]')
    $btnNext = $('[title=next]')
  }
  
  
  function onRoute(route) {
    var i,
        index = -1
        
    for (i = 0; i < filesLen; i++) {
      if (files[i].id === route) {
        index = i
        break
      }
    }
    activeIndex = (index === -1) ? 0 : index
    
    $btnPrev.css('display', (activeIndex > 0) ? 'block' : 'none')
    $btnPrev.attr('href', (activeIndex > 0) ? ('#' + files[activeIndex - 1].id) : '#')
    
    $btnNext.css('display', (activeIndex < filesLen - 1) ? 'block' : 'none')
    $btnNext.attr('href', (activeIndex < filesLen - 1) ? ('#' + files[activeIndex + 1].id) : '#')
    
    
    nextActiveId = files[activeIndex].id
    if (!activeId) {
      loadNextBug()
    } else {
      transitionBugOut()
    }    
  }
  
  
  function loadNextBug() {
    activeId = nextActiveId || files[activeIndex].id
    nextActiveId = null
    if (bugs[activeId]) {
      transitionBugIn()
    } else {
      loadBug()
    }
  }
  
  
  function loadBug() {
    loading = true
    $.getScript(files[activeIndex].src)
  }
  
  
  function transitionBugIn() {
    $canvas.fadeIn(1000)
    bugs[activeId].play()
  }
  
  function transitionBugOut() {
    $canvas.fadeOut(1000, function () {
      bugs[activeId].stop()
      loadNextBug()
    })
  }

}(jQuery));
