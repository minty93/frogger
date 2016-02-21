(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  function randomColor() {
    var hexDigits = "0123456789ABCDEF";

    var color = "#";
    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
  }

  var Frog = Frogger.Frog = function (options) {
    options.radius = Frog.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = "lightgreen";
    options.height = 40;
    options.width = 40;
    this.frog_image = new Image();
    this.frog_image.src = "./images/frog1.png";
    Frogger.MovingObject.call(this, options);
  };

  Frog.RADIUS = 15;

  Frogger.Util.inherits(Frog, Frogger.MovingObject);

  Frog.prototype.getHitBox = function (){
    this.top = this.pos[1] + 5;
    this.bottom = this.pos[1] + this.height - 5;
    this.left = this.pos[0] + 10;
    this.right = this.pos[0] + this.width - 10;

  };

  Frog.prototype.loadResources = function () {
      this.frogL = new Image();
      this.frogR = new Image();
      this.frogU = new Image();
      this.frogD = new Image();
      this.frogU.src = "./images/frog1.png";
      this.frogD.src = "./images/frogD.png";
      this.frogL.src = "./images/frogL.png";
      this.frogR.src = "./images/frogR.png";
  };



  Frog.prototype.draw2 = function(move){
    this.loadResources();
    var frog_image;
    if (move[0] == -1 && move[1] === 0 ) {
      this.frog_image = this.frogL;
    }
    else if (move[0] == 1 && move[1] === 0 ) {
      this.frog_image = this.frogR;
    }
    else if (move[0] === 0 && move[1] == -1 ) {
      this.frog_image = this.frogU;
    }
    else {
      this.frog_image = this.frogD;
    }
  };

  Frog.prototype.relocate = function () {
    this.pos = [500, 680];
    this.vel = [0, 0];
  };


  Frog.prototype.power = function (move) {
   this.draw2(move);
   this.pos[0] += move[0]*15;
   this.pos[1] += move[1]*15;

   if (this.pos[0] > 1000) {
     this.pos[0] = 1000;
   }
   else if (this.pos[0] < 0){
     this.pos[0] = 0;
   }


   if (this.pos[1] > 680) {
     this.pos[1] = 680;
   }
   else if (this.pos[1] < 10){
     this.pos[1] = 10;
   }
 };
})();
