//collision detection: box to box

function box_to_box(A, B){
	//Separate Axis Thm.
	
	var diagA1 = rot(A.q[2], [A.w/2, A.h/2]);
	var diagA2 = rot(A.q[2], [A.w/2, -A.h/2]);

	var diagB1 = rot(B.q[2], [B.w/2, B.h/2]);
	var diagB2 = rot(B.q[2], [B.w/2, -B.h/2]);

	var d = [B.q[0]-A.q[0], B.q[1]-A.q[1]];

	var axes = [
		rot(A.q[2], [1, 0]),
		rot(A.q[2], [0, 1]),
		rot(B.q[2], [1, 0]),
		rot(B.q[2], [0, 1]),
	];

	var tmp = [];

	tmp['i'] = 0; tmp['n'] = axes[0]; tmp['dL'] = 1e+9;

	for(var i = 0; i < 4; ++i){

		var projA = Math.max(
			Math.abs(numeric['dot'](diagA1, axes[i])),
			Math.abs(numeric['dot'](diagA2, axes[i]))
		);

		var projB = Math.max(
			Math.abs(numeric['dot'](diagB1, axes[i])),
			Math.abs(numeric['dot'](diagB2, axes[i]))
		);

		var projD = Math.abs(numeric['dot'](d, axes[i]));

		var e = projA + projB - projD;
		if(e < 0){ return false; }
		if(e < tmp['dL']){

			tmp['i'] = i;
			tmp['n'] = axes[i];
			tmp['dL'] = e;

			var sign = 1;
			if(numeric['dot'](d, tmp['n']) < 0){ tmp['n'] = numeric['*'](tmp['n'], -1); }
		}
	}

	//call contact generation
	var res = generate_contacts(A, B, tmp);

	return res;
}
