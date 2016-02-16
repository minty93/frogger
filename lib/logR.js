(function (){
	var Frogger = window.Frogger = window.Frogger || {};

	var LogR = Frogger.LogR = function(options){
		options.vel = LogR.SPEED;
		Frogger.FloatingObject.call(this, options);
	};


LogR.SPEED = [-2, 0];

Frogger.Util.inherits(Frogger.LogR, Frogger.FloatingObject);


 LogR.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Frogger.frog) {
 	       otherObject.relocate();
  }
 };


 	LogR.prototype.getHitBox = function (){
     this.top = this.pos[1];
     this.bottom = this.pos[1] + this.height;
     this.left = this.pos[0];
     this.right = this.pos[0] + this.width;

   };


})();
