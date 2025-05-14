let particles = [];
let lastMouseMoveTime = 0;
let gradientTextures = [];
let transparencies = [192, 128, 64]; // 75%, 50%, 25%
let lastMousePos;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  clear();

  lastMousePos = createVector(mouseX, mouseY);

  gradientTextures = [
    createGradientCircle(color('#63b86d'), color('#ffcc40')),
    createGradientCircle(color('#a379e3'), color('#ff92c2')),
    createGradientCircle(color('#ffd95a'), color('#ff8b74')),
    createGradientCircle(color('#5ca2f3'), color('#aad2eb'))
  ];
}

function draw() {
  clear();

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    if (p.isDead()) {
      particles.splice(i, 1);
    }
  }

  if (millis() - lastMouseMoveTime > 1000 && !mouseIsPressed && touches.length === 0) {
    particles = [];
  }
}

function mouseMoved() {
  if (isInsideCanvas(mouseX, mouseY)) {
    let currentPos = createVector(mouseX, mouseY);
    let movement = p5.Vector.sub(currentPos, lastMousePos);
    spawnParticle(mouseX, mouseY, movement);
    lastMouseMoveTime = millis();
    lastMousePos = currentPos.copy();
  }
}

function touchMoved() {
  for (let t of touches) {
    let touchPos = createVector(t.x, t.y);
    let movement = p5.Vector.sub(touchPos, lastMousePos);
    spawnParticle(t.x, t.y, movement);
    lastMouseMoveTime = millis();
    lastMousePos = touchPos.copy();
  }
  return false;
}

function isInsideCanvas(x, y) {
  return x >= 0 && x <= width && y >= 0 && y <= height;
}

function spawnParticle(x, y, movement) {
  let tex = random(gradientTextures);
  let alphaTarget = random(transparencies);
  let contra = movement.copy().mult(-0.3);
  particles.push(new Particle(x, y, tex, alphaTarget, contra));
}

class Particle {
  constructor(x, y, tex, alphaTarget, vel) {
    this.pos = createVector(x, y);
    this.vel = vel || p5.Vector.random2D().mult(random(0.5, 1));
    this.life = 100;
    this.maxLife = 100;
    this.tex = tex;
    this.alphaTarget = alphaTarget;
    this.alpha = 0;
    this.fadeInDuration = 12; // 0.2s at 60fps
    this.size = random(13, 27);
  }

  update() {
    this.pos.add(this.vel);
    this.life -= 2;
    this.vel.mult(0.95);

    // Fade in
    if (this.life > this.maxLife - this.fadeInDuration) {
      let t = 1 - (this.maxLife - this.life) / this.fadeInDuration;
      this.alpha = this.alphaTarget * t;
    }
    // Fade out
    else if (this.life < 30) {
      let t = this.life / 30;
      this.alpha = this.alphaTarget * t;
    }
    // Constant visible
    else {
      this.alpha = this.alphaTarget;
    }
  }

  display() {
    push();
    tint(255, this.alpha);
    image(this.tex, this.pos.x, this.pos.y, this.size, this.size);
    pop();
  }

  isDead() {
    return this.life <= 0;
  }
}

function createGradientCircle(c1, c2) {
  let g = createGraphics(100, 100);
  g.noStroke();
  for (let r = 50; r > 0; r--) {
    let inter = map(r, 50, 0, 0, 1);
    g.fill(lerpColor(c1, c2, inter));
    g.ellipse(50, 50, r * 2);
  }
  return g;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
