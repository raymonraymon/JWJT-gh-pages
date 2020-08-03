//constraint: rev constraint

function rev_constraint(i, A, B, P){
	constraint.call(this, i, [A, B]);

	//rev constraint joins items.
	collision_groups.unite(this.S[0].i, this.S[1].i);

	this.rA = numeric['-'](P, [this.S[0].q[0], this.S[0].q[1]]);
	this.rA = rot(-this.S[0].q[2], this.rA);

	this.rB = numeric['-'](P, [this.S[1].q[0], this.S[1].q[1]]);
	this.rB = rot(-this.S[1].q[2], this.rB);
}
rev_constraint.prototype = Object.create(constraint.prototype);
rev_constraint.prototype.constructor = rev_constraint;

rev_constraint.prototype.C = function(){
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
