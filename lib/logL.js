(function (){
	var Frogger = window.Frogger = window.Frogger || {};

	var LogL = Frogger.LogL = function(options){
		options.vel = LogL.SPEED;
		Frogger.FloatingObject.call(this, options);
	};


LogL.SPEED = [2, 0];

Frogger.Util.inherits(Frogger.LogL, Frogger.FloatingObject);


 LogL.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Frogger.frog) {
 	       otherObject.relocate();
  }
 };

 LogL.prototype.getHitBox = function (){
		this.top = this.pos[1];
		this.bottom = this.pos[1] + this.height;
		this.left = this.pos[0];
		this.right = this.pos[0] + this.width;

	};


})();
