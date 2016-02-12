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

})();

$(document).ready(function(){


    // show popup when you click on the link
    $('.button').click(function(event){
        event.preventDefault();
        $("#canvas").removeClass("hidden");
        $(".welcome").addClass("hidden");
      });
});
