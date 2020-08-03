//constraint: weld constraint

function weld_constraint(i, A, B){
	constraint.call(this, i, [A, B]);

	//weld constraint joins items.
	collision_groups.unite(this.S[0].i, this.S[1].i);

	var rA = numeric['-'](this.S[1].q, this.S[0].q);
	rA = rot(-this.S[0].q[2], [rA[0], rA[1]]);

	var th = this.S[1].q[2]-this.S[0].q[2];

	this.P0 = [rA[0], rA[1], th];
}
weld_constraint.prototype = Object.create(constraint.prototype);
weld_constraint.prototype.constructor = weld_constraint;

weld_constraint.prototype.C = function(){

	var rA = rot(-this.S[0].q[2], numeric['-'](this.S[1].q, this.S[0].q));
	var th = this.S[1].q[2]-this.S[0].q[2];

	var D = numeric['-'](this.P0, [rA[0], rA[1], th]);

	return numeric['dot'](D, D);
}
