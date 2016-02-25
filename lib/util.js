(function () {
if (typeof Frogger === "undefined") {
  window.Frogger = {};
}

var Util = Frogger.Util = {};

var inherits = Util.inherits = function (ChildClass, BaseClass) {
  var Surrogate = function() { this.constructor = ChildClass;};
  Surrogate.prototype = BaseClass.prototype;
  ChildClass.prototype = new Surrogate();
};


var overlap = Util.overlap = function (r1, r2) {

  result = !(r2.left > r1.right ||
           r2.right < r1.left ||
           r2.top > r1.bottom ||
           r2.bottom < r1.top);

return result;
};

var overlaplogs = Util.overlaplogs = function (r1, r2) {
result = !(r2.left > r1.right || r2.right < r1.left);
return result;
};


})();

$(document).ready(function(){


    // show popup when you click on the link
    $('.button').click(function(event){
        event.preventDefault();
        $(".welcome").addClass("hidden");
        $(".over").addClass("hidden");
        $("#canvas").removeClass("hidden");
        var game = new Frogger.Game();
        new Frogger.GameView(game, ctx).start();
      });
});
