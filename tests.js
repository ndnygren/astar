
var as_tests = require('./as_tests').tests;

function GeomTests() {
	var teg = this;
	this.tests = [];

	this.iteration = function(i, alldone) {
		if (i >= this.tests.length) {
			alldone("all tests passed.");
			return;
		}

		this.tests[i].func(function (ret_val) {
			if (ret_val) {
				teg.iteration(i+1, alldone);
			} else {
				alldone("test " + i + "("+teg.tests[i].desc+") failed");
			}
		});
	};

	this.runTests = function() {
		this.iteration(0, function(text) {
			console.log("result: " + text);
		});
	};

	this.tests.push({ "desc": "test 1", "func": function(done) {
		done(true);
	}});


}

var gt = new GeomTests();

gt.tests = gt.tests.concat(as_tests);

gt.runTests();


