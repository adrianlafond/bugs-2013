

;(function () {
  'use strict'

  var px = BUGS.px
  
  
  function draw() {
    var bw = BUGS.width(),
        bh = BUGS.height(),
        bgrect = new paper.Rectangle(0, 0, px(bw), px(bh)),
        bgcolor = new paper.Path.Rectangle(bgrect),
        x = Math.round(bw / 2),
        y = px(Math.round(bh / 2)),
        segLen,
        pointer
        
    bgcolor.fillColor = '#888'

    path = new paper.Path
    path.strokeColor = '#87CEEB'
    path.strokeWidth = px(10)
    path.moveTo(px(x), y)
    
    while(x <= bw) {
      x += 50
      path.lineTo(px(x), y)
    }
    segLen = path.segments.length
    
    BUGS.tool.onMouseDrag = function (e) {
      pointer = e.point
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


  BUGS.register('test1', {
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
