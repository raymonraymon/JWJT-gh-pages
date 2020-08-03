//generate contact points from manifold an colliding shapes.
function generate_contacts(A, B, manifold){

	var S = [A, B];

	//find best colliding edges.
	var edge = [];
	var enormals = [];
	var vertices = [];

	var ref = 0; var inc = 0; var prodref = 0;

	var N = [];

	for(var k = 0; k < 2; ++k){

		enormals[k] = [
			rot(S[k].q[2], [1, 0]),
			rot(S[k].q[2], [0, 1]),
			rot(S[k].q[2], [-1, 0]),
			rot(S[k].q[2], [0, -1])
		];

		vertices[k] = [
			rot(S[k].q[2], [S[k].w/2, -S[k].h/2]),
			rot(S[k].q[2], [S[k].w/2, S[k].h/2]),
			rot(S[k].q[2], [-S[k].w/2, S[k].h/2]),
			rot(S[k].q[2], [-S[k].w/2, -S[k].h/2])
		];
		vertices[k][4] = vertices[k][0];

		var tmpi = 0; var tmpmax = 0; var s = (k ? -1 : 1);
		for(var i = 0; i < 4; ++i){
			var prod = s*numeric['dot'](enormals[k][i], manifold['n']);
			if(prod > tmpmax){
				tmpmax = prod;
				tmpi = i;
			}
		}

		edge[k] = [
		numeric['+'](S[k].q, vertices[k][tmpi]),
		numeric['+'](S[k].q, vertices[k][tmpi+1])
		];
		N[k] = numeric['*'](
					1/2,
					numeric['+'](vertices[k][tmpi], vertices[k][tmpi+1])
					);

		//identify reference edge as most perpendicular edge
		if(tmpmax > prodref){
			prodref = tmpmax; ref = k;
		}
	}
	inc = (ref ? 0 : 1);

	//console.log('ref: ' + ref + ' inc: ' + inc);
	

	var clipped = [];
	clipped[inc] = edge[inc];
	clipped[ref] = edge[ref];

	
	//.....................clipping: inc on ref

	
	//inside: left
	if(X(
	numeric['-'](clipped[ref][1], clipped[ref][0]),
	numeric['-'](clipped[inc][0], clipped[ref][0])) < 0
	){
		clipped[inc][0] = intersect(
			clipped[inc],
			clipped[ref][0],
			numeric['-'](clipped[ref][1], clipped[ref][0])
			);
	}

	//inside: right
	if(X(
	numeric['-'](clipped[ref][1], clipped[ref][0]),
	numeric['-'](clipped[inc][1], clipped[ref][0])) < 0
	){
		clipped[inc][1] = intersect(
			clipped[inc],
			clipped[ref][0],
			numeric['-'](clipped[ref][1], clipped[ref][0])
			);
	}

	//between: left
	if(numeric['dot'](
		numeric['-'](clipped[inc][0], clipped[ref][1]),
		numeric['-'](clipped[ref][0], clipped[ref][1])) < 0
	){
		clipped[inc][0] = intersect(
			clipped[inc],
			clipped[ref][1],
			N[ref]
		);
	}

	//between: right
	if(numeric['dot'](
		numeric['-'](clipped[inc][1], clipped[ref][0]),
		numeric['-'](clipped[ref][1], clipped[ref][0])) < 0
	){
		clipped[inc][1] = intersect(
			clipped[inc],
			clipped[ref][0],
			N[ref]
		);
	}
	

	//.....................clipping: ref on inc


	//inside: left
	if(X(
	numeric['-'](clipped[inc][1], clipped[inc][0]),
	numeric['-'](clipped[ref][0], clipped[inc][0])) < 0
	){
		clipped[ref][0] = intersect(
			clipped[ref],
			clipped[inc][0],
			numeric['-'](clipped[inc][1], clipped[inc][0])
			);
	}

	//inside: right
	if(X(
	numeric['-'](clipped[inc][1], clipped[inc][0]),
	numeric['-'](clipped[ref][1], clipped[inc][0])) < 0
	){
		clipped[ref][1] = intersect(
			clipped[ref],
			clipped[inc][0],
			numeric['-'](clipped[inc][1], clipped[inc][0])
			);
	}

	//between: left
	if(numeric['dot'](
		numeric['-'](clipped[ref][0], clipped[inc][1]),
		numeric['-'](clipped[inc][0], clipped[inc][1])) < 0
	){
		clipped[ref][0] = intersect(
			clipped[ref],
			clipped[inc][1],
			N[inc]
		);
	}

	//between: right
	if(numeric['dot'](
		numeric['-'](clipped[ref][1], clipped[inc][0]),
		numeric['-'](clipped[inc][1], clipped[inc][0])) < 0
	){
		clipped[ref][1] = intersect(
			clipped[ref],
			clipped[inc][0],
			N[inc]
		);
	}

	/*
	mark(clipped[inc][0]);
	mark(clipped[inc][1]);
	mark(clipped[ref][0]);
	mark(clipped[ref][1]);
	*/


	var res = [];

	res[0] = {
			'inc': inc,
			'n': manifold['n'],
			't': [-manifold['n'][1], manifold['n'][0]],
			'Rinc': rot(-S[inc].q[2],
					numeric['-'](clipped[inc][0],
								[S[inc].q[0], S[inc].q[1]])),
			'Rref': rot(-S[ref].q[2],
					numeric['-'](clipped[ref][1],
								[S[ref].q[0], S[ref].q[1]]))
	}

	res[1] = {
			'inc': inc,
			'n': manifold['n'],
			't': [-manifold['n'][1], manifold['n'][0]],
			'Rinc': rot(-S[inc].q[2],
					numeric['-'](clipped[inc][1],
								[S[inc].q[0], S[inc].q[1]])),
			'Rref': rot(-S[ref].q[2],
					numeric['-'](clipped[ref][0],
								[S[ref].q[0], S[ref].q[1]]))
	}




	//BUG SOMEWHERE BELOW TIS LINE

	/*
	var prt = [inc, ref];
	var ord = [0, 1];

	for(var u = 0; u < 2; ++u){
	for(var v = 0; v < 2; ++v){

	if(numeric['dot'](numeric['-'](edge[prt[0]][ord[0]], edge[prt[1]][ord[1]]),
					  numeric['-'](edge[prt[1]][ord[0]], edge[prt[1]][ord[1]])) < 0){
		clipped[prt[0]][ord[0]] =
		intersect(edge[prt[0]], edge[prt[1]][ord[1]], N[prt[1]]);

		if(numeric['dot'](
			numeric['-'](clipped[prt[0]][ord[0]], edge[prt[1]][ord[0]]),
			N[prt[1]]) > 0){
			clipped[prt[0]][ord[0]] =
			intersect(edge[prt[0]], edge[prt[1]][ord[0]],
					  numeric['-'](edge[prt[1]][ord[1]], edge[prt[1]][ord[0]]));
		}

	}

	ord = [ord[1], ord[0]];	}
	prt = [prt[1], prt[0]];	}

	//assemble return values
	var res = [];

	for(var o = 0; o < 2; ++o){
		res[ord[0]] = {
			'inc': inc,
			'n': manifold['n'],
			't': [-manifold['n'][1], manifold['n'][0]],
			'Rinc': rot(-S[inc].q[2],
					numeric['-'](clipped[inc][ord[0]],
								[S[inc].q[0], S[inc].q[1]])),
			'Rref': rot(-S[ref].q[2],
					numeric['-'](clipped[ref][ord[1]],
								[S[ref].q[0], S[ref].q[1]]))
		};
		ord = [ord[1], ord[0]];
	}
	*/

	return res;
}
