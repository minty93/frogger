(function (){
	var Frogger = window.Frogger = window.Frogger || {};

	var Car = Frogger.Car = function(options){
		options.color = Car.COLOR();
		options.width = Car.DIM_X;
		options.vel = Car.SPEED;
		options.height = 40;
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
Car.DIM_X = 70;
Car.SPEED = [2, 0];

	Frogger.Util.inherits(Frogger.Car, Frogger.MovingObject);

 Car.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Frogger.frog) {
 	       otherObject.relocate();
  }
 };


})();
