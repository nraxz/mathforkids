(function () {
    var angle = 0;
    var mp;
    var W;
    var H;
    var particles;
    var ctx;
    var bgReady = false;
    var bgImage;
    var papaiNoelReady = false;
    var papaiNoelImage;
    var noel = new vec2D(100, 180);
    var noelVelocyti = new vec2D(3, 3);
    var gravity = new vec2D(1.5, 1.5);
    var noelPowerJump = new vec2D(15, 15);
    /*var noel = {
        x: 100,
        y: 180,
        velocyti: 3,
        gravity: 1.5,
        powerJump: 15,
    };*/
    var spritesNoelWidth = 45;
    var spritesNoelHeight = 200;
    var row = 3;
    var colls = 1;
    var trackNoel = 0;
    var widthNoel = spritesNoelWidth / colls;
    var heightNoel = spritesNoelHeight / row;
    var srcX = 0;
    var srcY = 0;
    var fps = 60;
    var now;
    var then = Date.now();
    var interval = 1000 / fps;
    var delta;

    var fpsNoel = 8;
    var nowNoel;
    var thenNoel = Date.now();
    var intervalNoel = 1000 / fpsNoel;
    var deltaNoel;

    var curFrame = 0;
    var frameCount = 3;

    var etapa = 0;
    var irAteEtapa0 = new vec2D(400, 20);
    var irAteEtapa1 = new vec2D(690, 200);
    var irAteEtapa2 = new vec2D(750, 140);
    var irAteEtapa3 = new vec2D(820, 200);
    var irAteEtapa4 = new vec2D(25, 225);
    var irAteEtapa5 = new vec2D(100, 180);
    /*var irAteEtapa0 = {
        x: 400,
        y: 20,
    };

    var irAteEtapa1 = {
        x: 690,
        y: 200,
    };

    var irAteEtapa2 = {
        x: 750,
        y: 140,
    };

    var irAteEtapa3 = {
        x: 820,
        y: 200,
    };

    var irAteEtapa4 = {
        x: 25,
        y: 225,
    };

    var irAteEtapa5 = {
        x: 100,
        y: 180,
    };*/
    var vetor;
    var magnitude;
    var normalize;

    function main() {
        //canvas init
        var canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');

        //canvas dimensions
        W = window.innerWidth;
        H = window.innerHeight / 2;
        canvas.width = W;
        canvas.height = H;

        bgImage = new Image();
        bgImage.onload = function () {
            bgReady = true;
        };

        bgImage.src = 'img/mountain.png';

        papaiNoelImage = new Image();
        papaiNoelImage.onload = function () {
            papaiNoelReady = true;
        };

        papaiNoelImage.src = 'img/sprite_noel.png';

        if (etapa == 0) {
            /*vetor = {
                x: irAteEtapa0.x - noel.x,
                y: irAteEtapa0.y - noel.y,
            };

            magnitude = Math.sqrt((vetor.x * vetor.x) + (vetor.y * vetor.y));

            normalize = {
                x: vetor.x / magnitude,
                y: vetor.y / magnitude,
            };*/
            vetor = irAteEtapa0.subtract(noel);
            normalize = vetor.normalize();
        }

        if (etapa == 1) {
            /*vetor = {
                x: irAteEtapa1.x - noel.x,
                y: irAteEtapa1.y - noel.y,
            };

            magnitude = Math.sqrt((vetor.x * vetor.x) + (vetor.y * vetor.y));

            normalize = {
                x: vetor.x / magnitude,
                y: vetor.y / magnitude,
            };*/
            vetor = irAteEtapa1.subtract(noel);
            normalize = vetor.normalize();
        }

        if (etapa == 2) {
            /*vetor = {
                x: irAteEtapa2.x - noel.x,
                y: irAteEtapa2.y - noel.y,
            };

            magnitude = Math.sqrt((vetor.x * vetor.x) + (vetor.y * vetor.y));

            normalize = {
                x: vetor.x / magnitude,
                y: vetor.y / magnitude,
            };*/
            vetor = irAteEtapa2.subtract(noel);
            normalize = vetor.normalize();
        }

        if (etapa == 3) {
            /*vetor = {
                x: irAteEtapa3.x - noel.x,
                y: irAteEtapa3.y - noel.y,
            };

            magnitude = Math.sqrt((vetor.x * vetor.x) + (vetor.y * vetor.y));

            normalize = {
                x: vetor.x / magnitude,
                y: vetor.y / magnitude,
            };*/
            vetor = irAteEtapa3.subtract(noel);
            normalize = vetor.normalize();
        }

        if (etapa == 4) {
            /*vetor = {
                x: irAteEtapa4.x - noel.x,
                y: irAteEtapa4.y - noel.y,
            };

            magnitude = Math.sqrt((vetor.x * vetor.x) + (vetor.y * vetor.y));

            normalize = {
                x: vetor.x / magnitude,
                y: vetor.y / magnitude,
            };*/
            vetor = irAteEtapa4.subtract(noel);
            normalize = vetor.normalize();
        }

        if (etapa == 5) {
            /*vetor = {
                x: irAteEtapa5.x - noel.x,
                y: irAteEtapa5.y - noel.y,
            };

            magnitude = Math.sqrt((vetor.x * vetor.x) + (vetor.y * vetor.y));

            normalize = {
                x: vetor.x / magnitude,
                y: vetor.y / magnitude,
            };*/
            vetor = irAteEtapa5.subtract(noel);
            normalize = vetor.normalize();
        }

        //snowflake particles
        mp = 30; //max particles
        particles = [];
        for (var i = 0; i < mp; i++)
        {
            particles.push({
                x: Math.random() * W, //x-coordinate
                y: Math.random() * H, //y-coordinate
                r: Math.random() * 4 + 1, //radius
                d: Math.random() * mp, //density
            });
        }

        init();
    }

    function init() {
        update();
        draw();
        window.requestAnimationFrame(init);
    }

    function update() {

        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            // update time stuffs

            // Just `then = now` is not enough.
            // Lets say we set fps at 10 which means
            // each frame must take 100ms
            // Now frame executes in 16ms (60fps) so
            // the loop iterates 7 times (16*7 = 112ms) until
            // delta > interval === true
            // Eventually this lowers down the FPS as
            // 112*10 = 1120ms (NOT 1000ms).
            // So we have to get rid of that extra 12ms
            // by subtracting delta (112) % interval (100).
            // Hope that makes sense.

            then = now - (delta % interval);

            // ... Code for Drawing the Frame ...
            ctx.clearRect(0, 0, W, H);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
        }

        nowNoel = Date.now();
        deltaNoel = nowNoel - thenNoel;

        if (deltaNoel > intervalNoel) {
            curFrame = (++curFrame % frameCount);
            srcY = curFrame * heightNoel;

            thenNoel = nowNoel - (deltaNoel % intervalNoel);

            ctx.clearRect(noel.x, noel.y, widthNoel, heightNoel);

            if (etapa == 0) {

                noel.x += normalize.x * noelVelocyti.x;
                noel.y += normalize.y * noelVelocyti.y;
                if (noel.x >= 400) {
                    etapa = 1;
                }
            }

            if (etapa == 1) {

                noel.x += normalize.x * noelVelocyti.x;
                noel.y -= normalize.y * noelVelocyti.y;
                if (noel.x >= 690) {
                    etapa = 2;
                }
            }

            if (etapa == 2) {

                noel.x += normalize.x * noelVelocyti.x;
                noel.y += normalize.y * noelVelocyti.y;
                if (noel.x >= 750) {
                    etapa = 3;
                }
            }

            if (etapa == 3) {

                noel.x += normalize.x * noelVelocyti.x;
                noel.y -= normalize.y * noelVelocyti.y;
            }

            if (etapa == 4) {

                noel.x += normalize.x * noelVelocyti.x;
                noel.y -= normalize.y * noelVelocyti.y;
                if (noel.x >= 50) {
                    etapa = 5;
                }
            }

            if (etapa == 5) {

                noel.x += normalize.x * noelVelocyti.x;
                noel.y += normalize.y * noelVelocyti.y;
                if (noel.x >= 100) {
                    etapa = 0;
                }
            }

        }

        if (noel.x > (W + 10) || noel.x < 0) {
            noel.x = 0;
            noel.y = 180;
            etapa = 4;
        }

        angle += 0.01;
        for (var i = 0; i < mp; i++)
        {
            var p = particles[i];

            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(angle) * 2;

            //Sending flakes back from the top when it exits
            //Lets make it a bit more organic and let flakes enter from the left and right also.
            if (p.x > W + 5 || p.x < -5 || p.y > H)
            {
                if (i % 3 > 0) //66.67% of the flakes
                {
                    particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
                } else
                {
                    //If the flake is exitting from the right
                    if (Math.sin(angle) > 0)
                    {
                        //Enter from the left
                        particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
                    } else
                    {
                        //Enter from the right
                        particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
                    }
                }
            }
        }

    }

    function draw() {

        for (var i = 0; i < mp; i++)
        {
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }

        if (bgReady) {
            ctx.drawImage(bgImage, 0, 0);
        }

        if (papaiNoelReady) {
            ctx.drawImage(papaiNoelImage, srcX, srcY, widthNoel, heightNoel, noel.x, noel.y, widthNoel, heightNoel);
        }

        ctx.fill();
        if (etapa > 0) {
            ctx.font = '20px Arial';
            ctx.fillText('E a Bestuse e o nano deseja a todos um feliz natal e um prospero ano novo *<{:¬{D}}}', 10, 30);

        } else {
            ctx.font = '25px Arial';
            ctx.fillText('O Papai noel está chegando...', 10, 30);

        }

    }

    main();
})();
