
/**
 * @namespace global
 */
if (typeof ADRIANLAFOND === 'undefined') { ADRIANLAFOND = {} }
if (!('bugs' in ADRIANLAFOND)) { ADRIANLAFOND.bugs = {} }


$(function () {
  var BUGS = ADRIANLAFOND.bugs,
      px
  
  BUGS.devicePixelRatio = ('devicePixelRatio' in window) ? window.devicePixelRatio : 1
    
  // scale @param n by window.devicePixelRatio
  BUGS.px = function (n) {
    return n * BUGS.devicePixelRatio
  }
  
  px = BUGS.px


  function init() {
    initPaper()
  }
  
  function initPaper() {
    var $canvas,
        cw,
        ch
        
    if (!!document.createElement('canvas').getContext) {
      $canvas = $('.main canvas')
      cw = $canvas.width()
      ch = $canvas.height()
      $canvas.attr('width', px(cw))
             .attr('height', px(ch))
      paper.setup($canvas)
            
      var path = new paper.Path()
      path.strokeColor = 'red'
      path.strokeWidth = px(10)
      path.moveTo(px(100), px(100))
      path.lineTo(px(200), px(300))
      path.lineTo(px(400), px(200))
      path.lineTo(px(600), px(350))
      path.lineTo(px(700), px(100))
      path.lineTo(px(cw - 100), px(ch - 100))
      path.smooth()

      paper.view.draw()
    }
  }

  init()
})