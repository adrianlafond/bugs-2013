

;(function () {
  'use strict'

  var px = BUGS.px
  
  function draw() {
    var bgrect = new paper.Rectangle(0, 0, BUGS.width(), BUGS.height())
    var bgcolor = new paper.Path.Rectangle(bgrect)
    bgcolor.fillColor = '#888'

    var path = new paper.Path
    path.strokeColor = '#87CEEB'
    path.strokeWidth = px(10)
    path.moveTo(px(100), px(100))
    path.lineTo(px(200), px(300))
    path.lineTo(px(400), px(200))
    path.lineTo(px(600), px(350))
    path.lineTo(px(700), px(100))
    path.lineTo(px(BUGS.width() - 100), px(BUGS.height() - 100))
    path.smooth()
    
    paper.view.draw()
  }


  BUGS.register('test1', {
    play: function () {
      draw()
    },    
    stop: function () {
      paper.project.activeLayer.removeChildren()
    }
  })
}());
