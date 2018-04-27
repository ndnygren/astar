
var STypes = {"BLOCK": 0, "NO": 1, "CHECKED": 2, "QUEUE": 3};

function SquareData (x,y, stype, weight) {
	this.x = x;
	this.y = y;
	this.stype = stype || STypes.BLOCK;
	this.weight = weight;
	this.from = null;
	this.dist = weight;

	// taxi distance
	this.h = function (rhs) {
		return Math.abs(this.x - rhs.x) + Math.abs(this.y - rhs.y);
	};

	this.setBreadcrumb = function(rhs) {
		if (!this.from || rhs.dist + this.weight < this.dist) {
			this.from = rhs;
			this.dist = rhs.dist + this.weight;
		}
	};
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

	this.neigh = function(sq) {
		var output = [];
		if (sq.x > 0) {
			output.push(this.data[sq.x-1][sq.y]);
		}
		if (sq.x+1 < this.w) {
			output.push(this.data[sq.x+1][sq.y]);
		}
		if (sq.y > 0) {
			output.push(this.data[sq.x][sq.y-1]);
		}
		if (sq.y+1 < this.h) {
			output.push(this.data[sq.x][sq.y+1]);
		}
		return output;
	};
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
	start.stype = STypes.QUEUE;

	this.isComplete = function () {
		return this.queue.length > 0 && this.end.h(this.queue[this.queue.length-1]) === 0;
	};

	this.isFailed = function () {
		return this.queue.length === 0;
	};

	this.step = function() {
		var asc = this;
		var current = this.queue[this.queue.length-1];
		this.queue.pop();
		var n = this.arena.neigh(current);
		n.forEach(function (sq) {
			sq.setBreadcrumb(current);
		});
		var unv = n.filter(function (sq) {
			return sq.stype == STypes.BLOCK;
		});
		unv.forEach(function (sq) {
			sq.stype = STypes.QUEUE;
			asc.queue.push(sq);
		});
	};

}


