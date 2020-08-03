//constraint: collision constraint

function k_constraint(i, A, B, data){
	constraint.call(this, i, [A, B]);

	this.data = data;

	if(data['inc'] == 0){
		this.rA = this.data['Rinc'];
		this.rB = this.data['Rref'];
	} else {
		this.rA = this.data['Rref'];
		this.rB = this.data['Rinc'];
	}

	//mark([this.S[0].q[0]+rot(this.S[0].q[2], this.rA)[0], this.S[0].q[1]+rot(this.S[0].q[2], this.rA)[1]]);
	//mark([this.S[1].q[0]+rot(this.S[1].q[2], this.rB)[0], this.S[1].q[1]+rot(this.S[1].q[2], this.rB)[1]]);

}
k_constraint.prototype = Object.create(constraint.prototype);
k_constraint.prototype.constructor = k_constraint;

k_constraint.prototype.condition = function(){ return this.C() > 0; }

k_constraint.prototype.C = function(){
	var rA = rot(this.S[0].q[2], this.rA);
	var rB = rot(this.S[1].q[2], this.rB);


	return numeric['dot'](
	numeric['-'](
		[this.S[0].q[0]+rA[0], this.S[0].q[1]+rA[1]],
		[this.S[1].q[0]+rB[0], this.S[1].q[1]+rB[1]]
	), this.data['n']);
	
}




