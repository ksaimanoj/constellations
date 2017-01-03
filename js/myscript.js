//alert('Hello');
var canvas = $('#mycanvas')
var ctx = canvas[0].getContext('2d');

var height, width, size;
var stop;
var points = [];
var noOfPoints;
var max_vel;

main();

function main() {
	initalize();
	drawCanvas();
	stop = setInterval(drawCanvas, 100);
}

function initalize() {
	height = canvas.height();
	width = canvas.width();
	noOfPoints = 25;
	max_vel = 3;

	initalizePoints();
}

function initalizePoints() {
	for (var i = 0; i < noOfPoints; i++) {
		points[i] = new Point();
	}
}

function drawCanvas() {
	clearCanvas();
	drawObjects();
	move();
}

function clearCanvas() {
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,height,width);
}

function drawObjects() {
	for (var i = 0; i < points.length; i++) {
		points[i].drawPoint();
	}
}

function Point() {
	this.x = randomNumber(0,width);
	this.y = randomNumber(0,height);
	this.vel_x = randomNumber(-max_vel,max_vel);
	this.vel_y = randomNumber(-max_vel,max_vel);
	this.size = randomNumber(1,3);
	this.drawPoint = function() {
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(this.x,this.y,this.size,this.size);
	};
	this.movePoint = function() {
		this.x = this.x + this.vel_x;
		this.y = this.y + this.vel_y;
	}
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
	return Math.floor(Math.random()*(max - min)) + min;
}

function checkBoundaryPoint(point) {
	if(point.x < 0 || point.x > height || point.y < 0 || point.y > height) {
		return true;
	}
	return false;
}