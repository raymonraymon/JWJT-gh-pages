var bwaiting = [];
var cwaiting = [];

function create_box(m, w, h, q, v){
	if(bwaiting[0]){
		var i = bwaiting.pop();
		B[i] = new box(i, m, w, h, q, v);
	} else {
		B[blabel] = new box(blabel, m, w, h, q, v);
		++blabel;
	}
}

function delete_body(i){
	B[i].relevant_constraints.forEach(delete_constraint);
	B[i].elem.remove();
	bwaiting.push(i);

	B[i] = null;
}
function delete_constraint(i){ C[i] = null; cwaiting.push(i)}

function anchor(i, P){
	if(cwaiting[0]){
		var c = cwaiting.pop();
		C[c] = new anchor_constraint(c, B[i]);
		B[i].relevant_constraints.push(c);
	} else {
		C[clabel] = new anchor_constraint(clabel, B[i]);
		B[i].relevant_constraints.push(clabel);
		++clabel;
	}

}

function rev_joint(i, j, P){
	if(cwaiting[0]){
		var c = cwaiting.pop();
		C[c] = new rev_constraint(c, B[i], B[j], P);
		B[i].relevant_constraints.push(c);
		B[j].relevant_constraints.push(c);
	} else {
		C[clabel] = new rev_constraint(clabel, B[i], B[j], P);
		B[i].relevant_constraints.push(clabel);
		B[j].relevant_constraints.push(clabel);
		++clabel;
	}
}

function weld_joint(i, j){
	/*
	if(cwaiting[0]){
		var c = cwaiting.pop();
		C[c] = new weld_constraint(c, B[i], B[j]);
		B[i].relevant_constraints.push(c);
		B[j].relevant_constraints.push(c);
	} else {
		C[clabel] = new weld_constraint(clabel, B[i], B[j]);
		B[i].relevant_constraints.push(clabel);
		B[j].relevant_constraints.push(clabel);
		++clabel;
	}
	*/
	rev_joint(i, j, [B[i].q[0], B[i].q[1]]);
	rev_joint(i, j, [B[j].q[0], B[j].q[1]]);
}



