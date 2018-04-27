

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
		this.cwindow.appendChild(canvas);
	};

	this.init();

}


