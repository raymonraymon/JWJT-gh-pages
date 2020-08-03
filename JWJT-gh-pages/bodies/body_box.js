//body: box

var box = function(i, m, w, h, q, v){
	this.i = i; //index

	this.invm = 1/m;
	this.invI = 12/(m*(h*h+w*w));

	this.w = w;	//width
	this.h = h;	//height

	this.q = q; //position
	this.qprev = numeric['-'](q, numeric['*'](v, dt)); //prev position

	this.relevant_constraints = [];

	this.render(); this.attach_handlers(); this.sync();
}

box.prototype.render = function(){

	S = '<div id = "B' + this.i + '" class = "box" style = "' +
	'width:' + this.w + 'px; height:' + this.h + 'px;' +
	'left:' + (-this.w/2) + 'px;' +
	'bottom:' + (-this.h/2) + 'px;' +
	'"></div>';

	$('#W').append(S); this.elem = $('#B' + this.i);
}

box.prototype.attach_handlers = function(){
	//dragging
	var t = this;
	this.elem.on('mousedown', function(){
		startdrag(t.i);
	});
}

box.prototype.sync = function(){
	this.elem.css({
		'-webkit-transform' : 'translate('
		+ this.q[0] + 'px, '
		+ (-this.q[1]) + 'px) rotate('
		+ (-this.q[2]) + 'rad)',

		'-moz-transform' : 'translate('
		+ this.q[0] + 'px, '
		+ (-this.q[1]) + 'px) rotate('
		+ (-this.q[2]) + 'rad)'

	});
}
