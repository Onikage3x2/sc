var canvas = document.getElementById('canvas');
var CHOSEN_BRUSH_COLOR = '#000000';
var BRUSH_PRESET = { width: 1, height: 1, radius: 2.5 };

// aufloesung anpassen 1080p  
// (hier wird eine Standard HD Aufloesung verwendet)
canvas.width = "1920";
canvas.height = "1080";

var context = canvas.getContext('2d');

canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mouseup", onMouseUp, false);
canvas.addEventListener("mouseout", onMouseOut, false);
canvas.addEventListener("mousemove", onMouseMove, false);

var mouseDown = false;
var ctrlKeyDown = false;

function onMouseDown(e) {
	mouseDown = true;
	
	context.beginPath();
	var scaledPosition = getCanvasScaledMousePosition(e);
	context.moveTo(scaledPosition.x, scaledPosition.y);
	context.lineTo(scaledPosition.x, scaledPosition.y);

	e.stopPropagation();
}

function onMouseUp(e) {
	if (e.ctrlKey) {
		var scaledPosition = getCanvasScaledMousePosition(e);
		context.lineTo(scaledPosition.x, scaledPosition.y);
		context.stroke();
		context.closePath();
	}
	mouseDown = false;
	e.stopPropagation();
}

function onMouseOut(e) {
	mouseDown = false;
	e.stopPropagation();
}

function onMouseMove(e) {
	e.stopPropagation();
	var scaledPosition = getCanvasScaledMousePosition(e);
	context.strokeStyle = CHOSEN_BRUSH_COLOR;
	context.lineWidth = BRUSH_PRESET.width; 

	if (!e.ctrlKey) {
		drawNormaly(e, scaledPosition);
	}
}

function drawNormaly(e, scaledPosition) {
	if(!mouseDown) return;
	context.lineTo(scaledPosition.x, scaledPosition.y);
	context.stroke();
}

function getCanvasScaledMousePosition(e) {
	var rect = canvas.getBoundingClientRect(), 
	scaleX = canvas.width / rect.width,
	scaleY = canvas.height / rect.height;

	return {
		x: (e.clientX - rect.left) * scaleX,
		y: (e.clientY - rect.top) * scaleY
	}
}

function setBrushSize(width, height, cursorRadius) {
	BRUSH_PRESET.width = width;
	BRUSH_PRESET.height = height;
	BRUSH_PRESET.radius = cursorRadius;
	setBrushCursor();
}

function setBrushCursor() {
	switch(BRUSH_PRESET.radius) {
		case 2.5: canvas.style.cursor = 'url(images/brushcursorR2p5.svg) 50 50, default';
			break;
		case 5: canvas.style.cursor = 'url(images/brushcursorR5.svg) 50 50, default';
			break;
		case 7.5: canvas.style.cursor = 'url(images/brushcursorR7p5.svg) 50 50, default';
			break;
		case 10: canvas.style.cursor = 'url(images/brushcursorR10.svg) 50 50, default';
			break;
		case 12.5: canvas.style.cursor = 'url(images/brushcursorR12p5.svg) 50 50, default';
			break;
		case 15: canvas.style.cursor = 'url(images/brushcursorR15.svg) 50 50, default';
			break;
	}
}

function setBrushColor(color) {
	CHOSEN_BRUSH_COLOR = color;
}