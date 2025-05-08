let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  clear(); // memastikan canvas awalnya transparan
}

function draw() {
  clear(); // menjaga latar tetap transparan setiap frame

  particles.push(new Particle(mouseX, mouseY));

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.show();
    if (p.finished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alpha = 255;
    this.r = random(10, 20);
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-1, -2);
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.alpha -= 4;
  }

  show() {
    noStroke();
    fill(200, this.alpha);
    ellipse(this.x, this.y, this.r);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
