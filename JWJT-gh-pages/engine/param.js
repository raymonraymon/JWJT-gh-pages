
//simulation parameters
var dt = 0.02;
var g = [0, -9.8, 0];


//get environment information:
var E = {
	w: function(){ return $('#W').width(); },
	h: function(){ return $('#W').height(); },
	offsetX: function(){ return $('#W').offset().left },
	offsetY: function(){ return $('#W').offset().top }
};

//coordinate converting
function globalq(q){ return ([q[0]-E.offsetX(), E.w()-q[1]+E.offsetY()]); }

//global data spaces
var B = []; var blabel = 0; //all bodies
var C = []; var clabel = 0; //static constraints

var K = []; var klabel = 0; //collision constraints


//cursor handling
var cursor_q = [0, 0];
function update_q(e){ cursor_q = globalq([e.pageX, e.pageY]); }
