
// @namespace global
var BUGS

;(function ($) {
  'use strict'
  
  var devicePixelRatio = window.devicePixelRatio || 1,
      width,
      height,
      
      bugs = {},
      liveId = null,
      activeId = null,
      activeIndex = 0,
         
      files,
      filesLen = 0,
      loading = false,
      
      OUT = 'out',
      IN = 'in',
      OFF = 'off',
      ON = 'on',
      trans = OFF,
      
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
        return pixels// * devicePixelRatio
      },
      
      register: function (id, module) {
        loading = false
        bugs[id] = module
        if (!activeId || activeId === id) {
          activeId = id
          if (trans === OFF) {
            transitionBugIn()
          }          
        }
      }
    }
    
    // Set canvas dimensions proportionate to devicePixelRatio.
    $canvas.attr('width', BUGS.px(BUGS.width()))
    $canvas.attr('height', BUGS.px(BUGS.height()))
    
    // Initialize Paper.js.
    paper.setup($canvas.get(0))
    BUGS.tool = new paper.Tool
    
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
    
    
    activeId = files[activeIndex].id
    if (trans === OFF) {
      loadNextBug()
    } else if (trans === IN || trans === ON) {
      transitionBugOut()
    }    
  }
  
  
  function loadNextBug() {
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
    liveId = activeId
    bugs[liveId].play()
    trans = IN
    $canvas.stop().fadeIn(1000, function () {
      trans = ON
    })
  }
  
  function transitionBugOut() {
    trans = OUT
    $canvas.stop().fadeOut(1000, function () {
      bugs[liveId].stop()
      liveId = null
      trans = OFF
      loadNextBug()
    })
  }

}(jQuery));
