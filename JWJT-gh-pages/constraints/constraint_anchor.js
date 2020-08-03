//constraint: anchor constraint

function anchor_constraint(i, A){
	constraint.call(this, i, [A]);

	this.P = this.S[0].q;
}
anchor_constraint.prototype = Object.create(constraint.prototype);
anchor_constraint.prototype.constructor = anchor_constraint;

anchor_constraint.prototype.solve = function(){ this.S[0].q = this.P; }

