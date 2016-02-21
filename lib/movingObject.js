(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var MovingObject = Frogger.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
    this.game = options.game;
    this.image = options.image;
  };


  MovingObject.prototype.move = function () {

    var offsetX = this.vel[0];
    var offsetY = this.vel[1];
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.pos[0] <= -100){
      this.pos[0] =  1000;}
    else if (this.pos[0] > 1000) {
      this.pos[0] = 0 - 100;
    }


  };

  // MovingObject.prototype.loadResources = function () {
  //     this.frog_image = new Image();
  //     this.frog_image.src = "./images/frog1.png";
  // };



  MovingObject.prototype.draw = function(ctx){
    if (this instanceof Frogger.Frog ) {
      this.loadResources();
      ctx.drawImage(this.frog_image,this.pos[0], this.pos[1], this.width, this.height);
    }
  };


  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };

  MovingObject.prototype.drawWheel = function(ctx){
    ctx.fillStyle = "black";
    ctx.fillRect(this.pos[0]  + 5, this.pos[1] - 5, this.width / 5, this.height /6);
    ctx.fillRect(this.pos[0]  + 55, this.pos[1] - 5, this.width / 5, this.height /6);
    ctx.fillRect(this.pos[0]  + 5, this.pos[1] + 38, this.width / 5, this.height /6);
    ctx.fillRect(this.pos[0]  + 55, this.pos[1] + 38, this.width / 5, this.height /6);
  };


  MovingObject.prototype.drawEyes = function(ctx){
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.pos[0] + 10,this.pos[1],8,50,0,2*Math.PI);
    ctx.arc(this.pos[0] + this.width - 10,this.pos[1],8,50,0,2*Math.PI);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.pos[0] + 12,this.pos[1],4,50,0,2*Math.PI);
    ctx.arc(this.pos[0] + this.width - 12,this.pos[1],4,50,0,2*Math.PI);
    ctx.fill();
    ctx.fillStyle = "lightgreen";
    ctx.beginPath();
    ctx.arc(this.pos[0] +this.width + 1, this.pos[1] + 13, 10, 4.7, Math.PI*(1/2), false);
    ctx.arc(this.pos[0] +this.width + 1, this.pos[1] + 29, 10, 4.7, Math.PI*(1/2), false);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();

    ctx.strokeStyle = 'black';
    ctx.arc(this.pos[0] - 1, this.pos[1] + 13, 10, 4.7, Math.PI*(1/2), true);
    ctx.arc(this.pos[0] - 1, this.pos[1] + 29, 10, 4.7, Math.PI*(1/2), true);
    ctx.stroke();
    ctx.fill();

    // ctx.fillRect(this.pos[0] - 8, this.pos[1] + 5, 8, 12);
    // ctx.fillRect(this.pos[0] - 8, this.pos[1] + 25, 8, 12);
  };
















})();
