
// @namespace global
var BUGS

;(function () {
  'use strict'
  var canvas,
      style,
      btnPrev,
      btnNext
  
  
  function init() {
    if (!!document.createElement('canvas').getContext) {
      canvas = document.getElementById('stage')
      style = window.getComputedStyle(canvas, null)

      BUGS = {
        devicePixelRatio: window.devicePixelRatio || 1,
        width: parseInt(style.getPropertyValue('width'), 10),
        height: parseInt(style.getPropertyValue('height'), 10),

        px: function (n) {
          return n * devicePixelRatio
        },

        loading: false,
        
        uiPositions: function (prevPos, nextPos) {
          btnPrev.position = prevPos
          btnNext.position = nextPos
        },
        
        loadPrev: function () {
          //...
        },
        
        loadNext: function () {
          //...
        }
      }

      canvas.setAttribute('width', BUGS.px(BUGS.width))
      canvas.setAttribute('height', BUGS.px(BUGS.height))
      paper.setup(document.getElementById('stage'))
           
      // BUGS.stageLayer = paper.project.activeLayer
      // BUGS.uiLayer = new paper.Layer 
      // paper.project.activeLayer = BUGS.uiLayer
      createNav()
      // paper.project.activeLayer = BUGS.stageLayer
    }
  }
  
  
  function createNav() {
    var px = BUGS.px,
        outer = new paper.Path.Circle(new paper.Point(0, 0), px(6)),
        inner = new paper.Path.Circle(new paper.Point(0, 0), px(2)),
        tool = new paper.Tool,
        hitOptions = {
              segments: true,
              stroke: true,
              fill: true,
              tolerance: 24
            }
    
    btnPrev = new paper.Group
    btnNext = new paper.Group
        
    outer.fillColor = new paper.RgbColor(255, 0, 0, 0.25)
    inner.fillColor = new paper.RgbColor(255, 0, 0, 1.0)
    btnPrev.addChild(outer)
    btnPrev.addChild(inner)
    
    outer = outer.clone()
    inner = inner.clone()
    outer.fillColor = new paper.RgbColor(0, 255, 0, 0.25)
    inner.fillColor = new paper.RgbColor(0, 255, 0, 1.0)
    btnNext.addChild(outer)
    btnNext.addChild(inner)
    
    tool.onMouseDown = function (e) {
      var hit = paper.project.hitTest(e.point, hitOptions)
      if (hit) {
        if (hit.item === btnPrev || hit.item.parent === btnPrev) {
          btnPrev.firstChild.scale(10)
        }        
      }
    }
    
    tool.onMouseUp = function (e) {
      var hit = paper.project.hitTest(e.point, hitOptions)
      if (hit) {
        switch (hit.item) {
          case btnNext:
            BUGS.loadNext()
            break
          case btnPrev:
            BUGS.loadPrev()
            break
        }
      }

    }
  }
  
  
  function loadBug(src) {
    var head = document.getElementsByTagName('head')[0],
        script = document.createElement('script')
    BUGS.loading = true
    script.src = src
    head.appendChild(script)
  }
  
  
  function onWinLoad(e) {
    window.removeEventListener('load', onWinLoad, false)
    init()
    loadBug('js/app/test1.js')
  }

  
  if (window.addEventListener) {
    window.addEventListener('load', onWinLoad, false)
  }
}());
