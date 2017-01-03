//alert('Hello');
var canvas = $('#mycanvas')
var ctx = canvas[0].getContext('2d');

var height, width, size;
var stop;
var points = [];
var noOfPoints;
var max_vel;
var radius;

main();

function main() {
	initalize();
	drawCanvas();
	stop = setInterval(drawCanvas, 5);
}

function initalize() {
	height = canvas.height();
	width = canvas.width();
	noOfPoints = 50;
	max_vel = 3;
	radius = 80;

	initalizePoints();
	canvas.mousemove(mousePlaced);
}

function initalizePoints() {
	for (var i = 0; i < noOfPoints; i++) {
		points[i] = new Point();
	}
}

function drawCanvas() {
	clearCanvas();
	move();
	drawObjects();
	findDistances();
	drawLines();
}

function clearCanvas() {
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,height,width);
}

function drawObjects() {
	for (var i = 0; i < points.length; i++) {
		if(points[i].nearby_points.length > 1)
		points[i].drawPoint();
	}
}

function Point(args) {
	if(!(typeof(args)=='undefined')){
		this.x = args[0];
		this.y = args[1];
		this.vel_x = 0;
		this.vel_y = 0;
	} else {
		this.x = randomNumber(0,width);
		this.y = randomNumber(0,height);
		this.vel_x = randomNumber(-max_vel/25,max_vel/25);
		this.vel_y = randomNumber(-max_vel/25,max_vel/25);
	}
	this.size = 1;
	this.nearby_points = [];

	this.drawPoint = function() {
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(this.x,this.y,this.size,this.size);
	};
	this.movePoint = function() {
		this.x = this.x + this.vel_x;
		this.y = this.y + this.vel_y;
	}
	this.addPoint = function(x, y, dist) {
		this.nearby_points.push([x, y, dist]);
	};
	this.clearArray = function() {
		this.nearby_points = [];
	};
}

function move() {
	movePoints();
}

function movePoints() {
	for (var i = 0; i < points.length; i++) {
		if(checkBoundaryPoint(points[i])){
			points[i] = new Point();
		}
		points[i].movePoint();
	}
}

function randomNumber(min, max) {
	return (Math.random()*(max - min)) + min;
}

function checkBoundaryPoint(point) {
	if(point.x < 0 || point.x > height || point.y < 0 || point.y > height) {
		return true;
	}
	return false;
}

function findDistances() {
	for (var i = 0; i < points.length; i++) {
		points[i].clearArray();
		if(i==points.length-1) radius = 125;
		else radius = 80;
		for (var j = 0; j < points.length; j++) {
			var a = points[i];
			var b = points[j];
			if(!(Math.abs(a.x - b.x) > radius || Math.abs(a.y - b.y) > radius)) {
				var distSquare = (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
				if(!(distSquare > radius * radius)){
					points[i].addPoint(b.x, b.y, Math.sqrt(distSquare));
				}
			}
		}
	}
}

function drawLines() {
	for (var i = 0; i < points.length; i++) {
		for (var j = 0; j < points[i].nearby_points.length; j++) {
			drawLineCustom(points[i].x, points[i].y, points[i].nearby_points[j][0], points[i].nearby_points[j][1], points[i].nearby_points[j][2]);
		}
	}
	if((points[noOfPoints] != undefined)){
		for (var i = 0; i < points[noOfPoints].nearby_points.length; i++) {
			drawLineCustomMouse(points[noOfPoints].nearby_points[i][0],points[noOfPoints].nearby_points[i][1],points[noOfPoints].nearby_points[i][2])
		}
	}
}

function drawLineCustom(x1, y1, x2, y2, dist) {
	//if(dist < radius/4) ctx.strokeStyle = "#cccccc";
	//else if (dist < radius/4) ctx.strokeStyle = "#999999";
	//else if (dist < 3*radius/4) ctx.strokeStyle = "#555555";
	//else ctx.strokeStyle = "#222222";

	var intensity = (Math.floor((Math.abs(100-dist)/100)*200)).toString(16);
	var color = "#"+intensity+intensity+intensity;
	//console.log((dist));
	ctx.strokeStyle = color;

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function drawLineCustomMouse(x, y, dist) {
	if(dist < radius/3) ctx.strokeStyle = "#ee0000";
	else if (dist < 2*radius/3) ctx.strokeStyle = "#cc0000";
	else ctx.strokeStyle = "#990000";

	var intensity = (Math.floor((Math.abs(150-dist)/150)*256)).toString(16);
	var color = "#"+intensity+"00"+"00";
	//console.log((dist));
	ctx.strokeStyle = color;

	ctx.beginPath();
	ctx.moveTo(points[noOfPoints].x, points[noOfPoints].y);
	ctx.lineTo(x, y);
	ctx.stroke();
}

function mousePlaced(event) {
	var x = event.pageX;
	var y = event.pageY;
	points[noOfPoints] = new Point([x, y]);
	findDistances();
}