//disjoint set
var disjoint = function(){ this.parentof = []; }

disjoint.prototype.root = function(i){

	if (!this.parentof[i]){ this.parentof[i] = i; return i; }

	if (this.parentof[i] == i){ return i; }

	this.parentof[i] = this.root(this.parentof[i]);
	return this.parentof[i];
}

disjoint.prototype.unite = function(i, j){
	i = this.root(i); j = this.root(j);
	this.parentof[j] = i;
}
