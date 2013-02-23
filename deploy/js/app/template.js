

;(function () {
  'use strict'


  function draw() {
    var bw = BUGS.width(),
        bh = BUGS.height(),
        bgrect = new paper.Rectangle(0, 0, bw, bh),
        bgcolor = new paper.Path.Rectangle(bgrect),
        user = {}
    
    BUGS.tool.onMouseDrag = function (e) {
      user.x = e.point.x * BUGS.scale()
      user.y = e.point.y * BUGS.scale()
    }
    
    paper.view.onFrame = function (e) {
      //...
    }
  }


  BUGS.register('module_id', {
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
