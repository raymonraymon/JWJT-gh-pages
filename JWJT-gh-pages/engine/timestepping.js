//integration
function integrate(){
	B.forEach(function(b){if(b){
	

		//verlet step
		var a = g;

		//also handle dragging
		if(b.i === dragtarg){ a = numeric['+'](g, dragf()); }

		qnext = numeric['+'](numeric['-'](numeric['*'](2, b.q), b.qprev), numeric['*'](dt*dt, a));
		b.qprev = b.q; b.q = qnext;
	}});
}

//constraining
function constrain(){for(var i = 0; i < 12; ++i){ C.forEach(function(c){if(c){ c.solve(); }}); }}

//collision steps
function collide(){

	K = [];	klabel = 0;

	for(var i = 0; i < B.length; ++i){
	for(var j = i+1; j < B.length; ++j){

	if(B[i] && B[j] && !(collision_groups.root(B[i].i) == collision_groups.root(B[j].i))){

			var res = box_to_box(B[i], B[j]);

			if(res === false){ /* no collision */ }
			else {
				//console.log('collision between: ' + i + ' ' + j);
				res.forEach(function(r){
					K[klabel] = new k_constraint(klabel, B[i], B[j], r); ++klabel;
				});

			}
			
	}
	}}

}

//rendering
function render(){ B.forEach(function(b){if(b){ b.sync(); }}); }



//timestep
var q0 = [];

function timestep(){

	//log previous positions for use later
	B.forEach(function(b){if(b){ q0[b.i] = b.q; }});

	//timestepping & constraining step
	integrate();
	constrain();

	//collision detection & manifold generation
	collide();

	//solving generated collision constraints
	for(var i = 0; i < 4; ++i){ K.forEach(function(k){ k.solve(); }); }

	render();

}
