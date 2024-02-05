(function () {
  'use strict';

  var earth = {};
  earth.position = new vec2D(150, 150);

  var moon = {};
  moon.position = new vec2D(200, 200);

  var distanciaLuaTerraRaio = new vec2D(moon.position.x - earth.position.x, moon.position.y - earth.position.y);

	var HEIGHT;
	var WIDTH;
  var ctx;
  var fps = 1000/30;
  var then = Date.now();
  var now;
  var delta;
  var angle = 0 * Math.PI / 180.0;

	function main() {
		HEIGHT = window.innerHeight;
		WIDTH = window.innerWidth;

		var canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = WIDTH / 2;
    canvas.height = HEIGHT / 2;
		canvas.style.border = '1px solid #000';

    ctx = canvas.getContext('2d');

    earth.image = new Image();
    earth.image.src = "assets/earth.png";

    moon.image = new Image();
    moon.image.src = "assets/moon.png";

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
    now = Date.now();
    delta = now - then;
    if (delta > fps) {

      var newPosition = new vec2D(distanciaLuaTerraRaio.x, distanciaLuaTerraRaio.y);
      newPosition.rotate(angle);

      moon.position = newPosition.add(earth.position);

      angle += 1;

      then = now - delta % fps;
    }
  }

	function draw() {
    ctx.drawImage(earth.image, earth.position.x, earth.position.y, 60, 60);
    ctx.drawImage(moon.image, moon.position.x, moon.position.y, 30, 30);
	}

	main();
})();