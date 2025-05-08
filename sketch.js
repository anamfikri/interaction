let particles = [];
let lastMoveTime = 0;
let userIsTouching = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  clear();
}

function draw() {
  clear();

  const now = millis();
  const mouseIdle = now - lastMoveTime > 1000;

  let currentX = mouseX;
  let currentY = mouseY;

  if (touches.length > 0) {
    currentX = touches[0].x;
    currentY = touches[0].y;
  }

  // Spawn particle jika user menyentuh atau mouse aktif
  if (!mouseIdle && (userIsTouching || mouseIsInsideCanvas())) {
    particles.push(new Particle(currentX, currentY));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.show();
    if (p.finished()) {
      particles.splice(i, 1);
    }
  }

  if (mouseIdle && !userIsTouching && !mouseIsInsideCanvas()) {
    particles = [];
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

function mouseMoved() {
  lastMoveTime = millis();
}

function touchStarted() {
  userIsTouching = true;
  lastMoveTime = millis();
  return false; // mencegah scroll
}

function touchMoved() {
  lastMoveTime = millis();
  return false;
}

function touchEnded() {
  userIsTouching = false;
}

function mouseIsInsideCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
