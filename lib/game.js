

 (function (){
 	var Frogger = window.Frogger = window.Frogger || {};

 	var Game = Frogger.Game = function(){
    this.cars1=[];
    this.trucks1=[];
    this.loadResources();
 		this.trucks = [];
    this.addTrucks();
    this.cars = [];
    this.frogs = [];
    this.addCars();
    this.logsR = [];
    this.logsL = [];
    this.addLogs();
    this.dead = [];
    this.lives = 3;
    this.level = 1;

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
    return [].concat(this.trucks, this.cars, this.logsL, this.logsR, this.frogs);
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
   else if (object instanceof Frogger.LogR) {
     this.logsR.push(object);}
   else if (object instanceof Frogger.LogL) {
     this.logsL.push(object);}
   else {
     throw "error";
   }
 };

 Game.prototype.loadResources = function () {
     this.car1 = new Image();
     this.car2 = new Image();
     this.car3 = new Image();
     this.car4 = new Image();
     this.car1.src = "./images/car1.png";
     this.car2.src = "./images/car2.png";
     this.car3.src = "./images/car3.png";
     this.car4.src = "./images/car4.png";
     this.cars1 = [this.car1, this.car2, this.car3, this.car4];
     this.truck1 = new Image();
     this.truck2 = new Image();
     this.truck3 = new Image();
     this.truck4 = new Image();
     this.truck1.src = "./images/truck1.png";
     this.truck2.src = "./images/truck2.png";
     this.truck3.src = "./images/truck3.png";
     this.truck4.src = "./images/truck4.png";
     this.trucks1 = [this.truck1, this.truck2, this.truck3, this.truck4];
 };


  Game.prototype.addTrucks = function () {
   for (var i = 0; i < Game.NUM_TRUCKS; i++) {
     this.add(new Frogger.Truck({
       game: this,
       pos: this.TruckPostitions(i),
       image: this.trucks1[Math.floor(Math.random() * 3)]
     }));
   }
   for (var j = 0; j < 8; j++) {
     this.add(new Frogger.Truck({
       game: this,
       pos: [90*j*7, 600],
       image: this.trucks1[Math.floor(Math.random() * 3)]
     }));
   }
 };


 Game.prototype.addCars = function () {
  for (var h = 0; h < 5; h++) {
    this.add(new Frogger.Car({
      game: this,
      pos: [90*h*5, 500],
      image: this.cars1[Math.floor(Math.random() * 3)]
    }));
  }
  for (var z = 0; z < 10; z++) {
    this.add(new Frogger.Car({
      game: this,
      pos: [90*z*7, 355],
      image: this.cars1[Math.floor(Math.random() * 3)]
    }));
  }
};

Game.prototype.addLogs = function () {
 for (var h = 0; h < 8; h++) {
   this.add(new Frogger.LogR({
     game: this,
     pos: [90*h*5, 110]
   }));
 }
 for (var z = 0; z < 8; z++) {
   this.add(new Frogger.LogL({
     game: this,
     pos: [90*z*7, 55]
   }));
 }
 for (var l = 0; l < 10; l++) {
   this.add(new Frogger.LogL({
     game: this,
     pos: [90*l*1/3*7, 168]
   }));
 }
};


 Game.prototype.TruckPostitions = function (i) {
   return [90 + i*200, 280];
};

Game.prototype.draw = function (ctx) {
   ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
   this.drawDead();
   this.drawLevel1();
   this.allObjects().forEach(function (object) {
     object.draw(ctx);
    //  if (object instanceof Frogger.Car || object instanceof Frogger.Truck)
    //  {object.drawWheel(ctx);}
    //  else {object.drawEyes(ctx);}
   });
   this.drawScore();
   if(this.counter2 > 0){
     this.drawLevel();
   }
 };

 Game.prototype.moveObjects = function () {
  this.allObjects().forEach(function (object) {
    object.move();
  });
};


  Game.prototype.addFrog = function () {
    var frog = new Frogger.Frog({
      pos: [500, 680],
      game: this
    });
    this.add(frog);

    return frog;
  };


  //rectangle1=  { top: , left: , bottom: , right:}
  //Util.overlap(rect1, rect2);
  Game.prototype.checkCollisions = function () {
      //  var frogTop = this.frogs[0].pos[1] + 6;
      //  var frogBottom = this.frogs[0].pos[1] + this.frogs[0].height - 2;
      //  var frogLeft = this.frogs[0].pos[0] + 8;
      //  var frogRight = this.frogs[0].pos[0] + this.frogs[0].width - 9 ;
       var smooshed = false;
       this.vehicles = [].concat(this.trucks, this.cars);
       this.vehicles.forEach(function(vehicle){
         vehicle.getHitBox();
         this.frogs[0].getHitBox();
         if (Frogger.Util.overlap(vehicle, this.frogs[0])){
           smooshed = true;
         }
        //  if (frogLeft> vehicle.pos[0] && frogLeft < vehicle.pos[0] + vehicle.width) {
        //    console.log(vehicle.pos[1] + vehicle.height);
        //    console.log(vehicle.pos[1]);
        //    console.log(frogTop);
        //    if (frogTop >= vehicle.pos[1] && frogTop <= vehicle.pos[1] + vehicle.height) {
        //      console.log("right");
        //      console.log(vehicle.pos[1]);
        //      console.log(vehicle.pos[1] + vehicle.height);
        //      smooshed = true;
        //    }
        //  }
         //
        //  if (frogLeft> vehicle.pos[0] && frogLeft < vehicle.pos[0] + vehicle.width) {
        //    if (frogBottom >= vehicle.pos[1] && frogBottom < vehicle.pos[1] + vehicle.height) {
        //      console.log(frogLeft);
        //      console.log(vehicle.pos[0]);
        //      smooshed = true;
        //    }
        //  }
         //
        //  if (frogRight > vehicle.pos[0] && frogRight < vehicle.pos[0] + vehicle.width) {
        //    if (frogTop >= vehicle.pos[1] && frogTop <= vehicle.pos[1] + vehicle.height) {
        //      smooshed = true;
        //      console.log("wrong");
        //      console.log(vehicle.pos[1]);
        //      console.log(vehicle.pos[1] + vehicle.height);
        //      smooshed = true;
        //    }
        //  }
         //
        //  if (frogRight > vehicle.pos[0] && frogRight < vehicle.pos[0] + vehicle.width -5) {
        //    if (frogBottom >= vehicle.pos[1] && frogBottom < vehicle.pos[1] + vehicle.height) {
        //      smooshed = true;
        //    }
        //  }
       }.bind(this));
       return smooshed;
};


Game.prototype.checkDrowned = function () {

     var drowned = false;

     this.frogs[0].vel = [0,0];
     this.logs = [].concat(this.logsL, this.logsR);
     if(this.frogs[0].pos[1] > 40 && this.frogs[0].pos[1] < 200) {
       drowned = true;
       this.logs.forEach(function(log){
       log.getHitBox();
       this.frogs[0].getHitBox();
       if (Frogger.Util.overlap(log, this.frogs[0])){
         console.log(log.vel);
         this.frogs[0].vel = log.vel;
         drowned = false;
       }
     }.bind(this));
   }
     return drowned;
};

Game.prototype.killed = function () {
  smooshed = this.checkCollisions();
  drowned = this.checkDrowned();
  if(this.counter > 0) {this.drawLost();}
  if (smooshed || drowned) {
    this.counter = 30;
    this.addDeadFrog();
    this.frogs[0].relocate();
    this.updateScore();
    this.gameOver();
  }
};


Game.prototype.drawDead = function () {
  dead_image = new Image();
  dead_image.src = "./images/poison.png";
  if(this.dead.length !== 0) {
  this.dead.forEach(function(pos){
    ctx.drawImage(dead_image, pos[0], pos[1], 40, 40);
  }.bind(this)
);
}
};


Game.prototype.addDeadFrog = function () {
  x = this.frogs[0].pos[0];
  y = this.frogs[0].pos[1];
  this.dead.push([x,y]);
};


Game.prototype.drawScore = function(){
    ctx.font = "30px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText("Lives: " + this.lives, 10, 50);
};

Game.prototype.drawLost = function(){
ctx.font = "30px Arial";
ctx.fillStyle = 'white';
ctx.fillText("One life lost" , 400, 50);
this.counter -= 1;
};

Game.prototype.drawLevel = function(){
ctx.font = "30px Arial";
ctx.fillStyle = 'white';
ctx.fillText("Things are moving faster" , 200, 50);
this.counter2 -= 1;
};

Game.prototype.drawLevel1 = function(){
ctx.font = "30px Arial";
ctx.fillStyle = 'white';
ctx.fillText("Level: " + this.level, 600, 50);
};

Game.prototype.updateScore = function(){
    this.lives -= 1;
};


Game.prototype.drawLost2 = function(){
ctx.font = "100px Arial";
ctx.fillStyle = 'white';
ctx.fillText("You Lost" , 500, 350);
};

Game.prototype.gameOver = function(){
  if (this.lives === 0) {
        return true;
    }
    return false;
};


Game.prototype.checkLevel = function(){
  if (this.frogs[0].pos[1] + this.frogs[0].width < 55) {
    this.counter2 = 30;
    this.level += 1;
    this.vehicles.forEach(function(vehicle){
      vehicle.color = this.getRandomColor();
      if (vehicle.vel[0] < 0){
        vehicle.vel[0] -= 1/9;
      }
      else {vehicle.vel[0] += 1/9;}
    }.bind(this));

    this.logs.forEach(function(log){
      if (log.vel[0] < 0){
        log.vel[0] -= 1/9;
      }
      else {log.vel[0] += 1/9;}
    }.bind(this));
    this.frogs[0].relocate();
  }
};



 })();
