//vector rotation (element form)
function rot(th, v){
	return ([v[0]*Math.cos(th) - v[1]*Math.sin(th),	v[0]*Math.sin(th) + v[1]*Math.cos(th)]);
}

//2d vector-vector cross prod
function X(u, v){ return (u[0]*v[1] - u[1]*v[0]); }

//line segment - line  intersection
function intersect(seg, p, n){
		//where segment(seg) intersects line (p, n)
		var a =	X(numeric['-'](p, seg[1]), n)/X(numeric['-'](seg[0], seg[1]), n);
		return numeric['+'](
				numeric['*'](1-a,seg[1]),
				numeric['*'](a, seg[0])
				);
}
