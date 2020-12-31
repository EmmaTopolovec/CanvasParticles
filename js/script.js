window.onload = function() {
    var canvas = document.getElementById("main"); // canvas with ID main
    var context = canvas.getContext("2d"); // context of canvas
    canvas.width  = window.innerWidth; // set width to width of window
    canvas.height = window.innerHeight * (.75); // set height to 75% of window height
    var particles = []; // create array of particles
    const defaultRadius = 3;

    class Particle {
        constructor() {
            // random starting position
            this.x = Math.random() * canvas.width; // random x position
            this.y = Math.random() * canvas.height; // random y position
            this.vx = Math.random() * .25 + .25; // x velocity .25-.5
            this.vy = Math.random() * .25 + .25; // y velocity .25-.5
            if (Math.random() > .5) {
                this.vx *= -1;
            }
            if (Math.random() > .5) {
                this.vy *= -1;
            }
            this.r = defaultRadius - Math.random() * 2; // starting radius
            this.lineWidth = Math.random() * .01 + .0001;
        }
        draw() {
            // draw particle
            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();

            // update location
            this.x += this.vx;
            this.y += this.vy;

            if (this.x >= canvas.width || this.x <= 0) { // collision with walls
                this.vx *= -1; // reverse direction
            }
            if (this.y >= canvas.height || this.y <= 0) { // collision with walls
                this.vy *= -1; // reverse direction
            }
        }
        dist(p) { // find distance between this point and point p
            var a = this.x - p.x;
            var b = this.y - p.y;
            var c = Math.sqrt(a*a + b*b);
            if (c <= canvas.height / 5) { // if points are close enough apart, return true
                return true;
            }
            return false;
        }
    }

    // create particles
    const pop = Math.sqrt(canvas.width * canvas.height) / 10;
    for (var i = 0; i < pop; i++) {
        particles.push(new Particle());
    }
    // var counter = 0;
    var test = setInterval(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(20,16,24,1)"; // background color
        context.fillRect(0, 0, canvas.width, canvas.height);

        lines = []; // list of all lines that need to be made in the form [i, j] where i and j are points
        for (var i = 0; i < pop; i++) {
            for (var j = 0; j < pop; j++) {
                if (i != j && !lines.includes([i, j]) && !lines.includes([j, i])) { // makes sure i and j are not equal and they have not been put into lines yet
                    if (particles[i].dist(particles[j])) { // if points are close together
                        lines.push([i, j]);
                    }
                }
            }
        }
        context.fillStyle = "rgba(150, 200, 250, 1)";
        context.strokeStyle = "rgba(150, 200, 250, 1)"; // line color
        for (var l in lines) { // draw lines
            context.lineWidth = particles[lines[l][0]].lineWidth;
            context.moveTo(particles[lines[l][0]].x, particles[lines[l][0]].y);
            context.lineTo(particles[lines[l][1]].x, particles[lines[l][1]].y);
            context.stroke();
        }

        // Draw the particles
        context.fillStyle = "rgba(150, 200, 250, 1)";
        context.strokeStyle = "rgba(150, 200, 250, 1)"; // border color
        for (var i = 0; i < pop; i++) {
            particles[i].draw(); // draw all particles
        }
        /* counter++;
        if (counter == 1) {
            clearInterval(test);
        } */
    }, 30); // refresh rate of 30 ms
};