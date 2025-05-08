let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  for (let i = 0; i < 5; i++) {
    particles.push(new SmokeParticle(mouseX, mouseY));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    if (p.isDead()) {
      particles.splice(i, 1);
    }
  }
}

class SmokeParticle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-2, -0.5));
    this.acc = createVector(0, -0.02);
    this.lifespan = 255;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 2;
  }

  display() {
    noStroke();
    fill(200, this.lifespan);
    ellipse(this.pos.x, this.pos.y, 20);
  }

  isDead() {
    return this.lifespan < 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
