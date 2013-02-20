

;(function () {
  'use strict'


  function draw() {
    var bw = BUGS.width(),
        bh = BUGS.height(),
        bgrect = new paper.Rectangle(0, 0, bw, bh),
        bgcolor = new paper.Path.Rectangle(bgrect),
        x = Math.round(bw / 2),
        y = Math.round(bh / 2),
        segLen,
        pointer
        
    bgcolor.fillColor = '#ccc'

    path = new paper.Path
    path.strokeColor = '#333'
    path.strokeWidth = 40
    path.moveTo(x, y)
    
    while(x <= bw) {
      x += 50
      path.lineTo(x, y)
    }
    segLen = path.segments.length
    
    BUGS.tool.onMouseDrag = function (e) {
      pointer = {
        x: e.point.x * BUGS.scale(),
        y: e.point.y * BUGS.scale()
      }
    }
    
    paper.view.onFrame = function (e) {
      var m, i
      if (pointer) {
        m = pointer
        for (i = 0; i < segLen; i++) {
          path.segments[i].point.x += Math.round((m.x - path.segments[i].point.x) * 0.1)
          path.segments[i].point.y += Math.round((m.y - path.segments[i].point.y) * 0.1)
          m = path.segments[i].point
        }
        path.smooth()
      }
    }
  }


  BUGS.register('test3', {
    play: function () {
      draw()
    },
    stop: function () {
      BUGS.tool.onMouseDrag = null
      paper.view.onFrame = null
      paper.project.activeLayer.removeChildren()
    }
  })
}());
