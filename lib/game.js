

 (function (){
 	var Frogger = window.Frogger = window.Frogger || {};

 	var Game = Frogger.Game = function(){
 		this.trucks = [];
    this.addTrucks();
    this.cars = [];
    this.frogs = [];
    this.addCars();
    this.lives = 3;

 	};

  Array.prototype.shuffle = function() {
	var input = this;

	for (var i = input.length-1; i >=0; i--) {

		var randomIndex = Math.floor(Math.random()*(i+1));
		var itemAtIndex = input[randomIndex];

		input[randomIndex] = input[i];
		input[i] = itemAtIndex;
	}
	return input;
};

  var getRandomColor = Game.prototype.getRandomColor = function () {

    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

  Game.DIM_X = 1000;
  Game.prototype.allObjects = function () {
    return [].concat(this.trucks, this.cars, this.frogs);
  };
  Game.DIM_Y = 700;
  Game.NUM_TRUCKS = 10;
  Game.NUM_CARS = 7;
  Game.BG_COLOR = "#d3d3d3";


  Game.prototype.add = function (object) {
   if (object instanceof Frogger.Truck) {
     this.trucks.push(object);
   }
   else if (object instanceof Frogger.Car) {
     this.cars.push(object);
   }
   else if (object instanceof Frogger.Frog) {
     this.frogs.push(object);}
   else {
     throw "error";
   }
 };

  Game.prototype.addTrucks = function () {
   for (var i = 0; i < Game.NUM_TRUCKS; i++) {
     this.add(new Frogger.Truck({
       game: this,
       pos: this.TruckPostitions(i)
     }));
   }
   for (var j = 0; j < 8; j++) {
     this.add(new Frogger.Truck({
       game: this,
       pos: [90*j*7, 525]
     }));
   }
 };


 Game.prototype.addCars = function () {
  for (var h = 0; h < 8; h++) {
    this.add(new Frogger.Car({
      game: this,
      pos: [90*h*5, 220]
    }));
  }
  for (var z = 0; z < 8; z++) {
    this.add(new Frogger.Car({
      game: this,
      pos: [90*z*7, 425]
    }));
  }
};


 Game.prototype.TruckPostitions = function (i) {
   return [90*i*5, 120];
};

Game.prototype.draw = function (ctx) {
   ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
   this.allObjects().forEach(function (object) {
     object.draw(ctx);
     if (object instanceof Frogger.Car || object instanceof Frogger.Truck)
     {object.drawWheel(ctx);}
     else {object.drawEyes(ctx);}
   });
   this.drawScore();
 };

 Game.prototype.moveObjects = function () {
  this.allObjects().forEach(function (object) {
    object.move();
  });
};


  Game.prototype.addFrog = function () {
    var frog = new Frogger.Frog({
      pos: [500, 650],
      game: this
    });
    this.add(frog);

    return frog;
  };

  Game.prototype.checkCollisions = function () {
       var frogTop = this.frogs[0].pos[1];
       var frogBottom = this.frogs[0].pos[1] + this.frogs[0].height;
       var frogLeft = this.frogs[0].pos[0] - 5;
       var frogRight = this.frogs[0].pos[0] + this.frogs[0].width + 5;
       var smooshed = false;
       this.vehicles = [].concat(this.trucks, this.cars);
       this.vehicles.forEach(function(vehicle){
         if (frogLeft > vehicle.pos[0] && frogLeft < vehicle.pos[0] + vehicle.width) {
           if (frogTop > vehicle.pos[1] && frogTop < vehicle.pos[1] + vehicle.height) {
             smooshed = true;
           }
         }

         if (frogLeft > vehicle.pos[0] && frogLeft < vehicle.pos[0] + vehicle.width) {
           if (frogBottom >= vehicle.pos[1] && frogBottom < vehicle.pos[1] + vehicle.height) {
             smooshed = true;
           }
         }
       }.bind(this));
       return smooshed;
};

Game.prototype.killed = function () {
  smooshed = this.checkCollisions();
  if (smooshed) {
    // this.addDeadFrog();
    this.frogs[0].relocate();
    this.updateScore();
    this.gameOver();
  }
};




Game.prototype.drawScore = function(){
    ctx.font = "30px Arial";
    ctx.fillText("Lives: " + this.lives, 10, 50);
};


Game.prototype.updateScore = function(){
    this.lives -= 1;
    alert("You lose a life :(");
};

Game.prototype.gameOver = function(){
  if (this.lives === 0) {
      var r = confirm("You Lose!, Would you like to play again?");
    if (r === true) {
        txt = "You pressed yes!";
        document.location.reload();
    }
  }
};


Game.prototype.checkLevel = function(){
  if (this.frogs[0].pos[1] + this.frogs[0].width < 100) {
    this.vehicles.forEach(function(vehicle){
      vehicle.color = this.getRandomColor();
      if (vehicle.vel[0] < 0){
        vehicle.vel[0] -= 1/9;
      }
      else {vehicle.vel[0] += 1/9;}
    }.bind(this));
    this.frogs[0].relocate();
    alert("Things are about to get faster!");
  }
};



 })();
