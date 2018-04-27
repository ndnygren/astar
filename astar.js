
var STypes = {"BLOCK": 0, "FREE": 1, "CHECKED": 2};

function SquareData (x,y, stype) {
	this.x = x;
	this.y = y;
	this.stype = stype || STypes.BLOCK;
}


function SquareArena (w,h) {
	this.w = w;
	this.h = h;
	this.data = [];

	for (var i = 0; i < w; i++) {
		this.data.push([]);
		for (var j = 0; j < h; j++) {
			this.data[i].push(new SquareData(i,j,STypes.BLOCK));
		}
	}

}

function randomArena(w,h) {
	var arena = new SquareArena(w,h);

	return arena;
}

