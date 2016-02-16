(function (){
	var Frogger = window.Frogger = window.Frogger || {};

	var Truck = Frogger.Truck = function(options){
		options.color = Truck.COLOR();
		options.width = Truck.DIM_X;
		options.vel = Truck.SPEED;
		options.height = 40;
		Frogger.MovingObject.call(this, options);
	};


	var getRandomColor = Truck.prototype.getRandomColor = function () {

    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

Truck.COLOR = getRandomColor;
Truck.DIM_X = 90;
Truck.SPEED = [-3, 0];

	Frogger.Util.inherits(Frogger.Truck, Frogger.MovingObject);


	Truck.prototype.getHitBox = function (){
    this.top = this.pos[1];
    this.bottom = this.pos[1] + this.height;
    this.left = this.pos[0];
    this.right = this.pos[0] + this.width;

  };


 Truck.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Frogger.frog) {
 	       otherObject.relocate();
  }
 };


})();
