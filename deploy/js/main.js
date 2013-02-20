// @namespace global
var BUGS

;(function ($) {
  'use strict'
  
  // var devicePixelRatio = window.devicePixelRatio || 1,
  var width,
      height,
      
      // bugs modules "model"
      bugs = {},
      liveId = null,
      activeId = null,
      activeIndex = 0,
      
      // bugs files "model"
      files,
      filesLen = 0,
      loading = false,
      
      // transition states
      OUT = 'out',
      IN = 'in',
      OFF = 'off',
      ON = 'on',
      trans = OFF,
      
      // cache $ objects
      $canvas,
      $nav,
      $btnPrev,
      $btnNext,
      
      // ipad scales down for portrait, so track scale
      // to normalize mouse/touch position
      scale = 1
      
      
  // start on dom ready
  $(function () {
    if (!!document.createElement('canvas').getContext) {
      initBugs()
    } else {
      // do something else for crap browsers
    }
  })
  
  
  function initBugs() {
    var onWinLoad
    $canvas = $('canvas')
    
    // get the canvas dimensions from css
    width = parseInt($canvas.css('width'), 10)
    height = parseInt($canvas.css('height'), 10)

    // API for modules to access
    BUGS = {
      width: function () {
        return width
      },
      
      height: function () {
        return height
      },
      
      scale: function () {
        return scale
      },
      
      // px: function (pixels) {
      //   return pixels// * devicePixelRatio
      // },
      
      // All modules must call this method when they load.
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
    $canvas.attr('width', BUGS.width())
    $canvas.attr('height', BUGS.height())

    // On window resize, updated the scale multiplier of the canvas.
    onWinResize()
    $(window).on('resize', onWinResize)
    
    // Initialize Paper.js.
    paper.setup($canvas.get(0))
    BUGS.tool = new paper.Tool
    
    // Load data.
    $.getJSON('assets/bugs.json', onBugsDataComplete)
  }



  function onWinResize() {
    var $win = $(window)
    scale = ($win.width() < $win.height()) ? (1 / 0.75) : 1
  }


  // Bugs JSON has loaded.
  function onBugsDataComplete(data) {
    initPrevNext()
    files = data.scripts
    filesLen = files.length
    routie({ ':bug?': onRoute })
  }
  
  
  // Cache prev + next nav elements.
  function initPrevNext() {
    $nav = $('.main nav')
    $btnPrev = $('[title=prev]')
    $btnNext = $('[title=next]')
  }
  
  
  // URL address hash has updated.
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
      $btnPrev.css('left', Math.round(Math.random() * 240) + 'px')
              .css('top', Math.round(Math.random() * 36) + 'px')
      $btnNext.css('right', Math.round(Math.random() * 240) + 'px')
              .css('bottom', Math.round(Math.random() * 36) + 'px')
      $nav.stop().fadeIn(600)
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
    $nav.stop().fadeOut(200)
  }

}(jQuery));
