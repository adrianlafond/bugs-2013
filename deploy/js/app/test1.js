

;(function () {
  'use strict'

  var px = BUGS.px
  
  var bgrect = new paper.Rectangle(0, 0, BUGS.width, BUGS.height)
  var bgcolor = new paper.Path.Rectangle(bgrect)
  // bgcolor.fillColor = '#888'

  var path = new paper.Path
  path.strokeColor = '#87CEEB'
  path.strokeWidth = px(10)
  path.moveTo(px(100), px(100))
  path.lineTo(px(200), px(300))
  path.lineTo(px(400), px(200))
  path.lineTo(px(600), px(350))
  path.lineTo(px(700), px(100))
  path.lineTo(px(BUGS.width - 100), px(BUGS.height - 100))
  path.smooth()

  // API
  BUGS.test1 = {
    destroy: function () {
      paper.layers[0].removeChildren()
    }
  }
  
  BUGS.uiPositions(new paper.Point(px(50), px(50)),
                   new paper.Point(px(950), px(360)))
  
  paper.view.draw()
  BUGS.loading = false
}());
