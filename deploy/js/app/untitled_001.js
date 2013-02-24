

;(function () {
  'use strict'
  
  
  var Untitled_001 = paper.Group.extend({
    initialize: function (x, y) {
      this.base()
      this.x = x
      this.y = y      
      this.drawBug()
    },
    
    drawBug: function () {
      var bounds,
          i,
          eye,
          neck
      
      // invisible bounds to keep the bug positioned absolutely to position x and y
      // and not relatively to the center of its paper.Item.bounds
      bounds = new paper.Path.Circle(0, 0, BUGS.height() / 2)
      this.addChild(bounds)
      
      this.eye = eye = []
      eye[0] = new Eye(0.35)
      eye[1] = new Eye(0.1)
      eye[2] = new Eye(0.16)
      eye[0].position = new paper.Point(-40, -100)
      eye[1].position = new paper.Point(10, -52)
      eye[2].position = new paper.Point(32, -74)
      
      this.neck = neck = []
      for (i = 0; i < 3; i++) {
        this.addChild(neck[i] = new Neck(eye[i]))
      }
      this.addChild(eye[1])
      this.addChild(eye[2])
      this.addChild(eye[0])
      
      this.position = new paper.Point(this.x, this.y)
    },
    
    
    animate: function (e) {
      var i, len
      for (i = 0, len = this.eye.length; i < len; i++) {
        this.neck[i].update()
      }
    }
  })

  

  var Eye = paper.Group.extend({
    initialize: function (scale) {
      this.base()
      this.drawEye()
      this.scale(scale || 1)
    },
    
    drawEye: function () {
      var img,
          color,
          pupil
      
      img = new Image()
      img.src = 'assets/img/gradient-eye.png'
      
      this.iris = new paper.Group
      
      color = new paper.Path.Circle(0, 0, 16)      
      color.fillColor = new paper.RgbColor(128, 0, 0, 0.5)
      color.strokeColor = new paper.RgbColor(128, 0, 0, 0.62)
      color.strokeWidth = 1
      
      this.pupil = new paper.Path.Circle(0, 0, 8)
      this.pupil.fillColor = new paper.RgbColor(0, 0, 0, 0.9)
      
      this.iris.addChild(color)
      this.iris.addChild(this.pupil)
      
      this.addChild(new paper.Raster(img))
      this.addChild(this.iris)
    }
  })
  
  
  /**
   * A Neck connects the body to an eye.
   * The bottom is always (0, 0), the top the eye's position.
   */
  var Neck = paper.Path.extend({
    initialize: function (eye) {
      this.base()
      this.eye = eye
      this.strokeColor = '#000'
      this.strokeWidth = this.eye.bounds.width * 0.1
      this.add(new paper.Point(0, 0),
        new paper.Point(0, 0),
        new paper.Point(0, 0))
      this.update()
    },
    
    update: function () {
      var b = this.eye.bounds,
          p = this.eye.position,
          s = this.segments       
      // s[1].point.x = p.x * 0.1
      // s[1].point.y = (p.y + b.height) * 0.5
      s[2].point.x = p.x
      s[2].point.y = p.y
      this.smooth()
    }
  })
  



  function draw() {
    var bw = BUGS.width(),
        bh = BUGS.height(),
        user = {},
        
        bgrect = new paper.Rectangle(0, 0, bw, bh),
        bgcolor = new paper.Path.Rectangle(bgrect),
    
        bug = new Untitled_001(bw / 2, bh / 2)
    
    
    bgcolor.fillColor = '#FAFAD2'
    // var l1 = new paper.Path.Line(new paper.Point(0, bh/2), new paper.Point(bw, bh/2))
    // var l2 = new paper.Path.Line(new paper.Point(bw/2, 0), new paper.Point(bw/2, bh))
    // l1.strokeWidth = l2.strokeWidth = 1
    // l1.strokeColor = l2.strokeColor = 'red'
    
    BUGS.tool.onMouseDrag = function (e) {
      user.x = e.point.x * BUGS.scale()
      user.y = e.point.y * BUGS.scale()
    }
    
    paper.view.onFrame = function (e) {
      bug.animate(e)
    }
  }


  BUGS.register('untitled_001', {
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
