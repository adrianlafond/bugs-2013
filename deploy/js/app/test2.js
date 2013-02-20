

;(function () {
  'use strict'

  
  function draw() {
    var bgrect = new paper.Rectangle(0, 0, BUGS.width(), BUGS.height())
    var bgcolor = new paper.Path.Rectangle(bgrect)
    bgcolor.fillColor = '#eee'

    var path = new paper.Path
    path.strokeColor = '#f00'
    path.strokeWidth = 10
    path.moveTo(100, 100)
    path.lineTo(200, 300)
    path.lineTo(400, 200)
    path.lineTo(600, 350)
    path.lineTo(700, 100)
    path.lineTo(BUGS.width() - 100, BUGS.height() - 100)
    path.smooth()
    
    paper.view.draw()
  }


  BUGS.register('test2', {
    play: function () {
      draw()
    },    
    stop: function () {
      paper.project.activeLayer.removeChildren()
    }
  })
}());
