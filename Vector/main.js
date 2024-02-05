(function () {
	'use strict';


	var bola = new vec2D(100, 100);
	var velocidade = new vec2D(1, 3.3);
	console.log('valores', bola.x, bola.y);
	console.log('priMagnetude', bola.magnitude());
	console.log('normalize', bola.normalize());
	console.log('ultMagnitude', bola.magnitude());
	console.log('valores', bola.x, bola.y);
	console.log('toRadians', bola.toRadians(90));
	console.log('toDegrees', bola.toDegrees(Math.PI/2));
	var HEIGHT;
	var WIDTH;
	var ctx;
	/*var bola = {
		x: 100,
		y: 100,
		xspeed:1,
		yspeed:3.3,
	};*/

	function main() {
		HEIGHT = window.innerHeight;
		WIDTH = window.innerWidth;

		var canvas = document.createElement('canvas');
    	canvas.id = 'canvas';
    	canvas.width = WIDTH / 2;
    	canvas.height = HEIGHT / 2;
		canvas.style.border = '1px solid #000';

    	ctx = canvas.getContext('2d');
    	document.body.appendChild(canvas);
		init();
	}
	function init() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		update();
		draw();
		window.requestAnimationFrame(init);
	}
	function update() {

		bola = bola.add(velocidade);

		if ((bola.x > (WIDTH / 2)) || (bola.x < 0)) {
    		velocidade.x = velocidade.x * -1;
  		}

  		if ((bola.y > (HEIGHT/2)) || (bola.y < 0)) {
    		velocidade.y = velocidade.y * -1;
  		}
	}
	function draw() {

		ctx.beginPath();
     	ctx.arc(bola.x, bola.y, 30, 0, 2 * Math.PI, false);
     	ctx.fillStyle = 'green';
      	ctx.fill();
      	ctx.lineWidth = 1;
      	ctx.strokeStyle = '#003300';
      	ctx.stroke();
	}

	main();
})();