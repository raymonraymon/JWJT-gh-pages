//constraint: dist constraint

function dist_constraint(i, A, B, PA, PB){
	constraint.call(this, i, [A, B]);

	this.rA = numeric['-'](PA, [this.S[0].q[0], this.S[0].q[1]]);
	this.rA = rot(-this.S[0].q[2], this.rA);

	this.rB = numeric['-'](PB, [this.S[1].q[0], this.S[1].q[1]]);
	this.rB = rot(-this.S[1].q[2], this.rB);

	this.d = numeric['-'](PB, PA);
	this.d = numeric['dot'](this.d, this.d);
}
dist_constraint.prototype = Object.create(constraint.prototype);
dist_constraint.prototype.constructor = dist_constraint;

dist_constraint.prototype.D = function(){
	var D = numeric['-'](
		numeric['+'](
			[this.S[0].q[0], this.S[0].q[1]],
			rot(this.S[0].q[2], this.rA)
		),
		numeric['+'](
			[this.S[1].q[0], this.S[1].q[1]],
			rot(this.S[1].q[2], this.rB)
		)
	);
	return numeric['dot'](D, D);
}
dist_constraint.prototype.C = function(){
	var D = this.D();

	return D - this.d;
}
