//constraint general

var constraint = function(i, S){
	this.i = i;	//index
	this.S = S; //member bodies

	this.hardness = 1;
}
constraint.prototype.condition = function(){ return true; }
constraint.prototype.C = function() { return 0;	}
constraint.prototype.nablaC = function() {

	var nablaC = [];

	var C0 = this.C();
	var epsilon = 1e-6;
	for(var i = 0; i < this.S.length; ++i){
		this.S[i].q[0] += epsilon; nablaC[3*i] = (this.C()-C0)/epsilon; this.S[i].q[0] -= epsilon;
		this.S[i].q[1] += epsilon; nablaC[3*i+1] = (this.C()-C0)/epsilon; this.S[i].q[1] -= epsilon;
		this.S[i].q[2] += epsilon; nablaC[3*i+2] = (this.C()-C0)/epsilon; this.S[i].q[2] -= epsilon;
	}

	return [nablaC];
}
constraint.prototype.solve = function(){

	if(this.condition()){
		var nablaC = this.nablaC();
		//var nablaCT = numeric['transpose'](nablaC);
		//var WnablaCT = numeric['dot'](this.W, nablaCT);

		var WnablaCT = [];
		for(var i = 0; i < this.S.length; ++i){
			WnablaCT[3*i] = [nablaC[0][3*i]*this.S[i].invm];
			WnablaCT[3*i+1] = [nablaC[0][3*i+1]*this.S[i].invm];
			WnablaCT[3*i+2] = [nablaC[0][3*i+2]*this.S[i].invI];
		}
		
		var nablaCWnablaCT =
		numeric['dot'](nablaC, WnablaCT);
		
		if(numeric['det'](nablaCWnablaCT) == 0){ return; }

		var lambda = numeric['*'](-this.C(), numeric['inv'](nablaCWnablaCT));
		/*
		numeric['*'](
			numeric['inv'](nablaCWnablaCT), numeric['*'](-1, this.C())
		);
		*/

		var dP = numeric['*'](this.hardness, numeric['dot'](WnablaCT, lambda));
		//update positions
		for(var i = 0; i < this.S.length; ++i){
			this.S[i].q = numeric['+'](this.S[i].q, [dP[3*i][0], dP[3*i+1][0], dP[3*i+2][0]]);
		}
	}

}
