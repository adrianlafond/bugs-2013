# @namespace global
@.BUGS ?= {}

@.BUGS.devicePixelRatio = @.devicePixelRatio ? 1


# scale @param n by window.devicePixelRatio
@.BUGS.px = px = (n) ->
  n * BUGS.devicePixelRatio

  
initPaper = ->
  if !!document.createElement('canvas').getContext
    $canvas = $ '.main canvas'
    cw = $canvas.width()
    ch = $canvas.height()
    $canvas.attr 'width', px(cw)
    $canvas.attr 'height', px(ch)
    
    paper.setup $canvas.get(0)
          
    path = new paper.Path
    path.strokeColor = '#87CEEB'
    path.strokeWidth = px 10
    path.moveTo px(100), px(100)
    path.lineTo px(200), px(300)
    path.lineTo px(400), px(200)
    path.lineTo px(600), px(350)
    path.lineTo px(700), px(100)
    path.lineTo px(cw - 100), px(ch - 100)
    path.smooth()

    paper.view.draw()


$ -> initPaper()