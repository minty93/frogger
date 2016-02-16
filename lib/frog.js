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

  Frog.prototype.relocate = function () {
    this.pos = [500, 680];
    this.vel = [0, 0];
  };


  Frog.prototype.power = function (move) {
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
