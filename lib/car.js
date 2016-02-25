(function (){
	var Frogger = window.Frogger = window.Frogger || {};

	var Car = Frogger.Car = function(options){
		options.color = Car.COLOR();
		options.width = Car.DIM_X;
		options.vel = Car.SPEED;
		options.height = 70;
		Frogger.MovingObject.call(this, options);
	};


	var getRandomColor = Car.prototype.getRandomColor = function () {

    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

Car.COLOR = getRandomColor;
Car.DIM_X = 80;
Car.SPEED = [2, 0];

	Frogger.Util.inherits(Frogger.Car, Frogger.MovingObject);

	Car.prototype.getHitBox = function (){
		this.top = this.pos[1];
		this.bottom = this.pos[1] + this.height;
		this.left = this.pos[0];
		this.right = this.pos[0] + this.width;

	};

	Car.prototype.loadResources = function () {
			this.car1 = new Image();
			this.car2 = new Image();
			this.car3 = new Image();
			this.car4 = new Image();
			this.car1.src = "./images/car1.png";
			this.car2.src = "./images/car2.png";
			this.car3.src = "./images/car3.png";
			this.car4.src = "./images/car4.png";
	};

	Car.prototype.getImage = function () {
			var num = Math.floor((Math.random() * 3));
			var cars = [this.car1, this.car2, this.car3, this.car4];
			return cars[num];
	};


	Car.prototype.draw = function (ctx) {
		ctx.drawImage(this.image,this.pos[0], this.pos[1], this.width, this.height);
	};


 Car.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Frogger.frog) {
 	       otherObject.relocate();
  }
 };


})();
