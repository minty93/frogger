(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var FloatingObject = Frogger.FloatingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.width = 90;
    this.height = 55;
    this.game = options.game;
    
  };


  FloatingObject.prototype.move = function () {

    var offsetX = this.vel[0];
    var offsetY = this.vel[1];
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.pos[0] <= -100){
      this.pos[0] =  1000;}
    else if (this.pos[0] > 1000) {
      this.pos[0] = 0 - 100;
    }


  };

  FloatingObject.prototype.loadResources = function () {
      this.log_image = new Image();
      this.log_image.src = "./images/log.png";
  };



  FloatingObject.prototype.draw = function(ctx){
    if (this instanceof Frogger.LogR ||  this instanceof Frogger.LogL) {
      this.loadResources();
      ctx.drawImage(this.log_image,this.pos[0], this.pos[1], this.width, this.height //dst coords
	    );
    }
  };


  FloatingObject.prototype.remove = function () {
    this.game.remove(this);
  };


















})();
