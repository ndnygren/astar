
var STypes = {"BLOCK": 0, "NO": 1, "CHECKED": 2, "QUEUE": 3};

function PQueue () {
	this.pnode = function (item, weight) {
		this.item = item;
		this.weight = weight;
	};

	this.swap = function (l, r) {
		var temp = this.nodes[l];
		this.nodes[l]=this.nodes[r];
		this.nodes[r] = temp;
	};

	this.nodes = [null,null,null];

	this.isEmpty = function () {
		return !this.nodes.length || !this.nodes[1];
	};

	this.heapify = function (idx) {
		var left = 2*idx;
		var right = 2*idx+1;
		var next = !this.nodes[left] || this.order(idx, left) ? idx : left ;
		next = !this.nodes[right] || this.order(next,right) ? next : right ;
		if (next != idx) {
			this.swap(idx, next);
			this.heapify(next);
		}
	};

	this.build_heap = function () {
		for (var i = Math.floor(this.nodes.length/2); i >= 1; i--) {
			this.heapify(i);
		}
	};

	this.order = function (l,r) {
		return !this.nodes[l] || !this.nodes[r] || this.nodes[l].weight <= this.nodes[r].weight;
	}

	this.isValid = function () {
		for (var i = 1; i < this.nodes.length/2; i++) {
			if (!this.order(i,2*i)) { return false; }
			else if (!this.order(i,2*i+1)) { return false; }
		}
		return true;
	};

	this.add = function (item, weight) {
		var newnode = new this.pnode(item, weight);
		var idx = 1;
		while (this.nodes[idx]) {
			idx++;
		}
		this.nodes[idx] = newnode;

		while(idx/2 >= 1) {
			if (!this.order(Math.floor(idx/2), idx)) {
				this.swap(Math.floor(idx/2), idx);
				idx = Math.floor(idx/2);
			} else {
				idx = 0;
			}
		}
	};

	this.pop = function() {
		var idx = 1;
		var output = this.nodes[idx].item;

		while (idx < this.nodes.length){
			var left = 2*idx;
			var right = 2*idx+1;
			if (this.nodes[left] && this.order(left,right)) {
				this.swap(idx,left);
				idx = left;
			} else if (this.nodes[right]) {
				this.swap(idx,right);
				idx = right;
			} else {
				this.nodes[idx] = null;
				idx = this.nodes.length;
			}
		}

		return output;
	};
}


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

function AStarControl(arena, start, end) {
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
		current.stype = STypes.CHECKED;
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


