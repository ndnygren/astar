
var fs = require('fs');
var as_data = fs.readFileSync('./astar.js','utf8');
eval(as_data);

exports.tests=[
	{ "desc": "as test create 1", "func": function(done) {
		try {
			var arena = randomArena(10,10);
			var cont = new AStarControl(arena, arena.data[0][0], arena.data[9][9]);
			done(true);
		} catch (e) {
			console.log(e);
			done(false);
		}

	}},
	
	{ "desc": "as dist heur test 1", "func": function(done) {
		var sq1 = new SquareData(1,5);
		var sq2 = new SquareData(3,7);
		done(sq1.h(sq1) === 0 && sq2.h(sq2) === 0 && sq1.h(sq2) == sq2.h(sq1) && sq1.h(sq2) == 4);
	}},
	{ "desc": "as complete fail test 1", "func": function(done) {
		var s = 4;
		var arena = randomArena(s,s);
		var cont = new AStarControl(arena, arena.data[0][0], arena.data[s-1][s-1]);
		done(!cont.isComplete() && !cont.isFailed());
	}},
	{ "desc": "as neigh test 1", "func": function(done) {
		var s = 4;
		var arena = randomArena(s,s);
		var n1 = arena.neigh(arena.data[0][0]);
		var n2 = arena.neigh(arena.data[1][1]);
		done(n1.length == 2 && n2.length == 4);
	}},
	{ "desc": "as search test 1", "func": function(done) {
		var s = 4;
		var arena = randomArena(s,s);
		var cont = new AStarControl(arena, arena.data[0][0], arena.data[s-1][s-1]);
		var b1 = cont.queue.length == 1;
		cont.step();
		var b2 = cont.queue.length == 2;
		done(b1 && b2);
	}},
];

