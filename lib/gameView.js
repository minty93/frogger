

 (function (){
 	var Frogger = window.Frogger = window.Frogger || {};

  var GameView = Frogger.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.frog = this.game.addFrog();
  };

  // GameView.prototype.animate = function(){
  //   this.game.draw(this.ctx);
  //   this.game.moveObjects();
  // };
  //
  // GameView.prototype.start = function(){
  //   this.game.draw(this.ctx);
  //   this.game.moveObjects();
  // };
  GameView.MOVES = {
   "w": [ 0, -1],
   "a": [-1,  0],
   "s": [ 0,  1],
   "d": [ 1,  0],
 };


  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function(time){

    this.game.draw(this.ctx);
    this.game.moveObjects();
    this.game.killed();
    this.game.checkLevel();

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  };


  GameView.prototype.bindKeyHandlers = function () {
  var frog = this.frog;

  Object.keys(GameView.MOVES).forEach(function (k) {
    var move = GameView.MOVES[k];
    key(k, function () { frog.power(move); });
  });

};





 })();
