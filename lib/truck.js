(function (){
	var Frogger = window.Frogger = window.Frogger || {};

	var Truck = Frogger.Truck = function(options){
		options.color = Truck.COLOR();
		options.width = Truck.DIM_X;
		options.vel = Truck.SPEED;
		options.height = 60*ratioFunction();
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

	Truck.prototype.loadResources = function () {
			this.car1 = new Image();
			this.car2 = new Image();
			this.car3 = new Image();
			this.car4 = new Image();
			this.car1.src = "./images/car1.png";
			this.car2.src = "./images/car2.png";
			this.car3.src = "./images/car3.png";
			this.car4.src = "./images/car4.png";
	};

	Truck.prototype.getImage = function () {
			var num = Math.floor((Math.random() * 3));
			var cars = [this.car1, this.car2, this.car3, this.car4];
			return cars[num];
	};


	Truck.prototype.draw = function (ctx) {
		ctx.drawImage(this.image,this.pos[0], this.pos[1], this.width, this.height);
	};



 Truck.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Frogger.frog) {
 	       otherObject.relocate();
  }
 };


})();
