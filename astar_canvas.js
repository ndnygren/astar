

function GoHTML () {
	this.emptyObj = function(elem) {
		while (elem.hasChildNodes()) {
			elem.removeChild(elem.childNodes[0]);
		}
	};

	this.tableFrom2dArray = function(arr1) {
		var golib = this;
		var output = document.createElement("table");
		var topheader = document.createElement("tr");
		if (arr1.length === 0) { return output; }
		arr1[0].map( function(cell) {
			topheader.appendChild(golib.elemWithText("th","",cell));
		});
		output.appendChild(topheader);
		arr1.slice(1).map(function(row) {
			var tr = document.createElement("tr");
			var th = golib.elemWithText("th", "", row[0]);
			tr.appendChild(th);
			row.slice(1).map(function(cell){
				tr.appendChild(golib.elemWithText("td","",cell));
			});
			output.appendChild(tr);

		});

		return output;
	};

	this.convertMySQLDate = function(x) {
		if (!x) { return 0; }
		var t = x.split(/[- :]/);
		var ts = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
		return ts.getTime();
	};

	this.msToMySQL = function (x) {
		var parsed = new Date(x);
		var outtime = "";
		outtime += parsed.getFullYear();
		outtime += "-" + (parsed.getMonth() + 1);
		outtime += "-" + parsed.getDate();
		outtime += " " + this.padDigits(parsed.getUTCHours());
		outtime += ":" + this.padDigits(parsed.getUTCMinutes());
		outtime += ":" + this.padDigits(parsed.getUTCSeconds());
		return outtime;
	};

	this.padDigits = function(i) {
		return i < 10 ? "0"+i : i;
	};

	this.softTime = function(movetime, now) {
		if (!movetime) { return "never"; }
		var then = this.convertMySQLDate(movetime);
		var diff = Math.floor((now - then)/1000.0);
		if (diff > 24*60*60) { return Math.floor(diff/24/60/60) + " days ago"; }
		else if (diff > 60*60) { return Math.floor(diff/60/60) + " hours ago"; }
		else if (diff > 60) { return Math.floor(diff/60) + " minutes ago"; }
		return diff + " seconds ago";
	};

	this.elemWithText = function(type, classname, text) {
		var sp = document.createElement(type);
		sp.className = classname;
		sp.appendChild(document.createTextNode(text));
		return sp;
	};

	this.elemWithTextValue = function(type, classname, text, value) {
		var sp = this.elemWithText(type, classname, text);
		sp.value = value;
		return sp;
	};
}


function AStarCanvas (cwindow, w, h) {
	this.cwindow = cwindow;
	this.w = w;
	this.h = h;

	this.init = function () {
		var golib = new GoHTML();

		golib.emptyObj(this.cwindow);
		var canvas = document.createElement("canvas");
		canvas.width = this.w;
		canvas.height = this.h;
		this.canvas = canvas;
		this.cwindow.appendChild(canvas);
	};

	this.drawCircle = function(x,y,r,fill_color, line_color) {
		var context = this.canvas.getContext('2d');

		context.beginPath();
		context.arc(x, y, r, 0, 2 * Math.PI, false);
		context.fillStyle = fill_color;
		if (fill_color != "none" ) { context.fill(); }
		context.lineWidth = 1;
		context.strokeStyle = line_color;
		context.stroke();
	};

	this.drawSquare = function (x,y,w,h, fill_color, line_color) {
		var context = this.canvas.getContext('2d');
		context.beginPath();
		context.rect(x, y, w, h);
		context.fillStyle = fill_color;
		if (fill_color != "none" ) { context.fill(); }
		if (line_color != "none") {
			context.lineWidth = 1;
			context.strokeStyle = line_color;
			context.stroke();
		}
	};

	this.drawArena = function(arena) {
		var border = 10;
		var spacing = 3;
		var calc_size = (this.w + -2*border + -spacing*arena.w) / arena.w;
		this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (var i = 0; i < arena.w; i++) {
			for (var j = 0; j < arena.h; j++) {
				var sq = arena.data[i][j];
				var x_loc = i*(calc_size + spacing) + border;
				var y_loc = j*(calc_size + spacing) + border;
				var fill = sq.stype == STypes.BLOCK ? "none" :
					(sq.stype == STypes.QUEUE ? "blue" : "grey");
				this.drawSquare(x_loc,y_loc,calc_size,calc_size, fill, "black");
				this.drawCircle(x_loc+ 0.5*calc_size, y_loc + 0.5*calc_size, sq.weight,'rgba(255, 161, 0, 0.2)', "black");
			}
		}
	};


	this.init();

}



