
var STypes = {"BLOCK": 0, "FREE": 1, "CHECKED": 2};

function SquareData (x,y, stype, weight) {
	this.x = x;
	this.y = y;
	this.stype = stype || STypes.BLOCK;
	this.weight = weight;
}


function SquareArena (w,h) {
	var max_weight = 10;
	this.w = w;
	this.h = h;
	this.data = [];

	for (var i = 0; i < w; i++) {
		this.data.push([]);
		for (var j = 0; j < h; j++) {
			this.data[i].push(new SquareData(i,j,STypes.BLOCK, Math.floor(Math.random()*max_weight)));
		}
	}
}

function randomArena(w,h) {
	var arena = new SquareArena(w,h);

	return arena;
}

function AStarContol(arena, start, end) {
	this.arena = arena;
	this.start = start;
	this.end = end;
	this.queue = [start];

}


