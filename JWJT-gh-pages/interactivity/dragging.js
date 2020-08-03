//dragging functionality

var dragtarg = null;
var drag_r = [0, 0];


function startdrag(i){
	dragtarg = i;

	drag_r = rot(-B[i].q[2], [
		cursor_q[0]-B[i].q[0],
		cursor_q[1]-B[i].q[1]
	]);

	var r = rot(B[dragtarg].q[2], drag_r);
	var P = numeric['+']([B[dragtarg].q[0], B[dragtarg].q[1]], r);
}


function stopdrag(i){ dragtarg = null; }


function dragf(){

	var r = rot(B[dragtarg].q[2], drag_r);
	var P = numeric['+']([B[dragtarg].q[0], B[dragtarg].q[1]], r);

	
	var coef_F = 80;
	var coef_b = -4;

	var d = numeric['-'](cursor_q, P);

	var dragforce = numeric['*'](coef_F, [
		d[0]*B[dragtarg].invm,
		d[1]*B[dragtarg].invm,
		X(r, d)*B[dragtarg].invI
	]);

	var v = [
		(B[dragtarg].q[0]-B[dragtarg].qprev[0])/dt,
		(B[dragtarg].q[1]-B[dragtarg].qprev[1])/dt,
		0
	];

	var dampforce = numeric['*'](coef_b, v);

	return numeric['+'](dragforce, dampforce);
}
