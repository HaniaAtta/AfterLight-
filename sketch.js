// let scl = 80;
// let cols, rows;
// let snake;
// let foodWords = [];
// let words = ["Evolution", "Prophecy", "Conspiracy", "Inaction"];
// let particles = [];
//
// function setup() {
//   createCanvas(800, 480); // Use 2D canvas
//   cols = floor(width / scl);
//   rows = floor(height / scl);
//   snake = new Snake();
//   placeWords();
//
//   for (let i = 0; i < 50; i++) {
//     particles.push(new Particle());
//   }
//
//   textFont('monospace');
//   textAlign(CENTER, CENTER);
//   frameRate(10);
// }
//
// function draw() {
//   background(255);
//
//   // Glowing background particles
//   for (let p of particles) {
//     p.update();
//     p.show();
//   }
//
//   drawGrid();
//   drawWords();
//
//   snake.update();
//   snake.show();
//
//   if (snake.eatAny(foodWords)) {
//     placeWords();
//   }
//
//   if (snake.endGame()) {
//     snake = new Snake();
//     placeWords();
//   }
// }
//
// function drawGrid() {
//   stroke(0, 90, 255, 100);
//   strokeWeight(1);
//   drawingContext.setLineDash([5, 8]);
//
//   for (let x = 0; x <= cols; x++) {
//     for (let y = 0; y <= rows; y++) {
//       let cx = x * scl;
//       let cy = y * scl;
//
//       if (x < cols) line(cx, cy, cx + scl, cy);
//       if (y < rows) line(cx, cy, cx, cy + scl);
//
//       if (x < cols && y < rows) {
//         let cxm = cx + scl / 2;
//         let cym = cy + scl / 2;
//         strokeWeight(2);
//         line(cxm - 4, cym, cxm + 4, cym);
//         line(cxm, cym - 4, cxm, cym + 4);
//         strokeWeight(1);
//       }
//     }
//   }
//
//   drawingContext.setLineDash([]);
// }
//
// function drawWords() {
//   fill(0, 90, 255);
//   noStroke();
//   textSize(14);
//   for (let fw of foodWords) {
//     let x = fw.pos.x * scl + scl / 2;
//     let y = fw.pos.y * scl + scl / 2;
//     text(fw.label, x, y);
//   }
// }
//
// function placeWords() {
//   foodWords = [];
//   let positions = new Set();
//   for (let i = 0; i < words.length; i++) {
//     let x, y;
//     do {
//       x = floor(random(cols));
//       y = floor(random(rows));
//     } while (positions.has(`${x},${y}`));
//     positions.add(`${x},${y}`);
//     foodWords.push({ pos: createVector(x, y), label: words[i] });
//   }
// }
//
// function keyPressed() {
//   if (keyCode === UP_ARROW) snake.setDir(0, -1);
//   else if (keyCode === DOWN_ARROW) snake.setDir(0, 1);
//   else if (keyCode === RIGHT_ARROW) snake.setDir(1, 0);
//   else if (keyCode === LEFT_ARROW) snake.setDir(-1, 0);
// }
//
// class Snake {
//   constructor() {
//     this.body = [createVector(1, 0), createVector(1, 1), createVector(1, 2)];
//     this.xdir = 0;
//     this.ydir = -1;
//   }
//
//   setDir(x, y) {
//     this.xdir = x;
//     this.ydir = y;
//   }
//
//   update() {
//     let head = this.body[this.body.length - 1].copy();
//     head.x += this.xdir;
//     head.y += this.ydir;
//     this.body.shift();
//     this.body.push(head);
//   }
//
//   grow() {
//     let tail = this.body[0].copy();
//     this.body.unshift(tail);
//   }
//
//   eatAny(foods) {
//     let head = this.body[this.body.length - 1];
//     for (let i = 0; i < foods.length; i++) {
//       let f = foods[i];
//       if (head.x === f.pos.x && head.y === f.pos.y) {
//         this.grow();
//         foods.splice(i, 1);
//         return true;
//       }
//     }
//     return false;
//   }
//
//   endGame() {
//     let head = this.body[this.body.length - 1];
//     if (head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows) return true;
//     for (let i = 0; i < this.body.length - 1; i++) {
//       if (head.equals(this.body[i])) return true;
//     }
//     return false;
//   }
//
//   show() {
//     stroke(0, 90, 255);
//     strokeWeight(scl / 4); // 1/4 of cell size
//     noFill();
//
//     drawingContext.shadowBlur = 15;
//     drawingContext.shadowColor = 'rgba(0, 90, 255, 0.6)';
//
//     beginShape();
//     for (let part of this.body) {
//       let px = part.x * scl + scl / 2;
//       let py = part.y * scl + scl / 2;
//       vertex(px, py);
//     }
//     endShape();
//
//     drawingContext.shadowBlur = 0;
//   }
//
//
// }
//
// class Particle {
//   constructor() {
//     this.reset();
//     this.size = random(1, 3);
//   }
//
//   reset() {
//     this.pos = createVector(random(width), random(height));
//     this.vel = p5.Vector.random2D().mult(random(0.2, 0.5));
//   }
//
//   update() {
//     this.pos.add(this.vel);
//     if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
//       this.reset();
//     }
//   }
//
//   show() {
//     push();
//     translate(this.pos.x, this.pos.y);
//     noStroke();
//     fill(0, 100, 255, 70);
//     ellipse(0, 0, this.size);
//     pop();
//   }
// }
//

// let scl = 80;
// let cols, rows;
// let snake;
// let foodWords = [];
// let words = ["Evolution", "Prophecy", "Conspiracy", "Inaction"];
// let particles = [];
// let gameStarted = false;

// function setup() {
//   createCanvas(800, 480);
//   cols = floor(width / scl);
//   rows = floor(height / scl);
//   snake = new Snake();

//   for (let i = 0; i < 50; i++) {
//     particles.push(new Particle());
//   }

//   textFont('monospace');
//   textAlign(CENTER, CENTER);
//   frameRate(4);
// }

// function draw() {
//   background(255);

//   for (let p of particles) {
//     p.update();
//     p.show();
//   }

//   drawGrid();

//   if (gameStarted) {
//     drawWords();
//     snake.update();
//     snake.show();

//     if (snake.eatAny(foodWords)) {
//       placeWords();
//     }

//     if (snake.endGame()) {
//       gameStarted = false;
//       snake = new Snake();
//       foodWords = [];
//     }
//   } else {
//     fill(0, 90, 255);
//     textSize(24);
//     text("PRESS ARROW KEYS TO START", width/2, height/2);
//   }
// }

// function drawGrid() {
//   // Base dotted grid with spacing
//   stroke(0, 90, 255, 70);
//   strokeWeight(1);
//   drawingContext.setLineDash([3, 6]);

//   for (let x = 0; x <= cols; x++) {
//     for (let y = 0; y <= rows; y++) {
//       let cx = x * scl;
//       let cy = y * scl;

//       // Vertical lines with offset
//       if (x < cols) line(cx + 2, cy, cx + 2, cy + scl);
//       // Horizontal lines with offset
//       if (y < rows) line(cx, cy + 2, cx + scl, cy + 2);
//     }
//   }

//   // Glowing corner accents
//   stroke(0, 90, 255);
//   strokeWeight(1.5);
//   drawingContext.shadowBlur = 15;
//   drawingContext.shadowColor = 'rgba(0, 90, 255, 0.25)';

//   for (let x = 0; x <= cols; x++) {
//     for (let y = 0; y <= rows; y++) {
//       let cx = x * scl;
//       let cy = y * scl;

//       if (x < cols && y < rows) {
//         // Top-left
//         line(cx + 4, cy + 4, cx + 12, cy + 4);
//         line(cx + 4, cy + 4, cx + 4, cy + 12);

//         // Top-right
//         line(cx + scl - 4, cy + 4, cx + scl - 12, cy + 4);
//         line(cx + scl - 4, cy + 4, cx + scl - 4, cy + 12);

//         // Bottom-left
//         line(cx + 4, cy + scl - 4, cx + 12, cy + scl - 4);
//         line(cx + 4, cy + scl - 4, cx + 4, cy + scl - 12);

//         // Bottom-right
//         line(cx + scl - 4, cy + scl - 4, cx + scl - 12, cy + scl - 4);
//         line(cx + scl - 4, cy + scl - 4, cx + scl - 4, cy + scl - 12);
//       }
//     }
//   }

//   drawingContext.setLineDash([]);
//   drawingContext.shadowBlur = 0;
// }

// function drawWords() {
//   fill(0, 90, 255);
//   noStroke();
//   textSize(14);
//   for (let fw of foodWords) {
//     let x = fw.pos.x * scl + scl / 2;
//     let y = fw.pos.y * scl + scl / 2;
//     text(fw.label, x, y);
//   }
// }

// function placeWords() {
//   foodWords = [];
//   let positions = new Set();
//   for (let i = 0; i < words.length; i++) {
//     let x, y;
//     do {
//       x = floor(random(cols));
//       y = floor(random(rows));
//     } while (positions.has(`${x},${y}`));
//     positions.add(`${x},${y}`);
//     foodWords.push({ pos: createVector(x, y), label: words[i] });
//   }
// }

// function keyPressed() {
//   if (!gameStarted) {
//     gameStarted = true;
//     placeWords();
//   }

//   if (keyCode === UP_ARROW && snake.ydir !== 1) snake.setDir(0, -1);
//   else if (keyCode === DOWN_ARROW && snake.ydir !== -1) snake.setDir(0, 1);
//   else if (keyCode === RIGHT_ARROW && snake.xdir !== -1) snake.setDir(1, 0);
//   else if (keyCode === LEFT_ARROW && snake.xdir !== 1) snake.setDir(-1, 0);
// }

// class Snake {
//   constructor() {
//     this.body = [createVector(1, 0), createVector(1, 1), createVector(1, 2)];
//     this.xdir = 0;
//     this.ydir = 1;
//     this.growthCounter = 0;
//   }

//   setDir(x, y) {
//     if (this.xdir !== -x && this.ydir !== -y) {
//       this.xdir = x;
//       this.ydir = y;
//     }
//   }

//   update() {
//     let head = this.body[this.body.length - 1].copy();
//     head.x += this.xdir;
//     head.y += this.ydir;

//     // Conditional tail removal
//     if (this.growthCounter > 0) {
//       this.growthCounter--;
//     } else {
//       this.body.shift();
//     }

//     this.body.push(head);
//   }

//   grow() {
//     this.growthCounter += 1; // Delay growth by 1 frame
//   }

//   eatAny(foods) {
//     let head = this.body[this.body.length - 1];
//     for (let i = 0; i < foods.length; i++) {
//       let f = foods[i];
//       if (head.x === f.pos.x && head.y === f.pos.y) {
//         this.grow();
//         foods.splice(i, 1);
//         return true;
//       }
//     }
//     return false;
//   }

//   endGame() {
//     let head = this.body[this.body.length - 1];
//     if (head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows) return true;
//     for (let i = 0; i < this.body.length - 1; i++) {
//       if (head.equals(this.body[i])) return true;
//     }
//     return false;
//   }

//   show() {
//     let first = this.body[0];
//     let last = this.body[this.body.length - 1];

//     // Soft inner glow layer
//     push();
//     drawingContext.shadowBlur = 10;
//     drawingContext.shadowColor = 'rgba(0, 90, 255, 0.2)';
//     stroke(0, 90, 255, 40); // transparent stroke for subtle inner glow
//     strokeWeight(scl / 4 + 2); // only slightly wider than body
//     noFill();

//     beginShape();
//     curveVertex(first.x * scl + scl / 2, first.y * scl + scl / 2);
//     for (let part of this.body) {
//       curveVertex(part.x * scl + scl / 2, part.y * scl + scl / 2);
//     }
//     curveVertex(last.x * scl + scl / 2, last.y * scl + scl / 2);
//     endShape();
//     pop();

//     // Actual snake body
//     push();
//     drawingContext.shadowBlur = 0;
//     stroke(0, 90, 255);
//     strokeWeight(scl / 4);
//     noFill();

//     beginShape();
//     curveVertex(first.x * scl + scl / 2, first.y * scl + scl / 2);
//     for (let part of this.body) {
//       curveVertex(part.x * scl + scl / 2, part.y * scl + scl / 2);
//     }
//     curveVertex(last.x * scl + scl / 2, last.y * scl + scl / 2);
//     endShape();
//     pop();
//   }


// }

// class Particle {
//   constructor() {
//     this.reset();
//     this.size = random(1, 3);
//   }

//   reset() {
//     this.pos = createVector(random(width), random(height));
//     this.vel = p5.Vector.random2D().mult(random(0.2, 0.5));
//   }

//   update() {
//     this.pos.add(this.vel);
//     if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
//       this.reset();
//     }
//   }

//   show() {
//     push();
//     translate(this.pos.x, this.pos.y);
//     noStroke();
//     fill(0, 100, 255, 70);
//     ellipse(0, 0, this.size);
//     pop();
//   }
// }


// updated

let scl = 90;
let cols, rows;
let snake;
let foodWords = [];
let words = ["Evolution", "Prophecy", "Conspiracy", "Inaction"];
let particles = [];
let gameStarted = false;
let collectedWords = [];

function setup() {
  createCanvas(1200, 880); // Extended width for word box
  cols = floor((width - 200) / scl); // Allocate 200px for word box
  rows = floor(height / scl);
  snake = new Snake();

  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }

  textFont('monospace');
  textAlign(CENTER, CENTER);
  frameRate(4);
}

function draw() {
  background(255);

  for (let p of particles) {
    p.update();
    p.show();
  }

  drawGrid();
  drawWordBox();

  if (gameStarted) {
    drawWords();
    snake.update();
    snake.show();

    if (snake.eatAny(foodWords)) {
      placeWords();
    }

    if (snake.endGame()) {
      gameStarted = false;
      snake = new Snake();
      foodWords = [];
      collectedWords = [];
    }
  } else {
    fill(0, 90, 255);
    textSize(22);
    text("PRESS ARROW KEYS TO START", width / 2 - 220, height / 2);
  }
}

function drawGrid() {
  stroke(0, 90, 255, 70);
  strokeWeight(1);
  drawingContext.setLineDash([3, 6]);

  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y <= rows; y++) {
      let cx = x * scl;
      let cy = y * scl;

      if (x < cols) line(cx + 2, cy, cx + 2, cy + scl);
      if (y < rows) line(cx, cy + 2, cx + scl, cy + 2);
    }
  }

  stroke(0, 90, 255);
  strokeWeight(1.5);
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = 'rgba(0, 90, 255, 0.25)';

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let cx = x * scl;
      let cy = y * scl;

      // Draw glowing corners
      line(cx + 4, cy + 4, cx + 12, cy + 4);
      line(cx + 4, cy + 4, cx + 4, cy + 12);

      line(cx + scl - 4, cy + 4, cx + scl - 12, cy + 4);
      line(cx + scl - 4, cy + 4, cx + scl - 4, cy + 12);

      line(cx + 4, cy + scl - 4, cx + 12, cy + scl - 4);
      line(cx + 4, cy + scl - 4, cx + 4, cy + scl - 12);

      line(cx + scl - 4, cy + scl - 4, cx + scl - 12, cy + scl - 4);
      line(cx + scl - 4, cy + scl - 4, cx + scl - 4, cy + scl - 12);
    }
  }

  drawingContext.setLineDash([]);
  drawingContext.shadowBlur = 0;
}

function drawWords() {
  fill(0, 90, 255);
  noStroke();
  textSize(14);
  for (let fw of foodWords) {
    let x = fw.pos.x * scl + scl / 2;
    let y = fw.pos.y * scl + scl / 2;
    text(fw.label, x, y);
  }
}

function drawWordBox() {
  let boxX = cols * scl + 10;
  let boxWidth = 180;

  fill(240);
  stroke(0, 90, 255);
  strokeWeight(2);
  rect(boxX, 20, boxWidth, height - 40, 10);

  noStroke();
  fill(0, 90, 255);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Collected Words", boxX + 10, 30);

  textSize(14);
  for (let i = 0; i < collectedWords.length; i++) {
    text("• " + collectedWords[i], boxX + 10, 60 + i * 20);
  }

  textSize(12);
  text(`Total: ${collectedWords.length}`, boxX + 10, height - 30);
}

function placeWords() {
  foodWords = [];
  let positions = new Set();
  for (let i = 0; i < words.length; i++) {
    let x, y;
    do {
      x = floor(random(cols));
      y = floor(random(rows));
    } while (positions.has(`${x},${y}`));
    positions.add(`${x},${y}`);
    foodWords.push({ pos: createVector(x, y), label: words[i] });
  }
}

function keyPressed() {
  if (!gameStarted) {
    gameStarted = true;
    placeWords();
  }

  if (keyCode === UP_ARROW && snake.ydir !== 1) snake.setDir(0, -1);
  else if (keyCode === DOWN_ARROW && snake.ydir !== -1) snake.setDir(0, 1);
  else if (keyCode === RIGHT_ARROW && snake.xdir !== -1) snake.setDir(1, 0);
  else if (keyCode === LEFT_ARROW && snake.xdir !== 1) snake.setDir(-1, 0);
}

class Snake {
  constructor() {
    this.body = [createVector(1, 0), createVector(1, 1), createVector(1, 2)];
    this.xdir = 0;
    this.ydir = 1;
    this.growthCounter = 0;
  }

  setDir(x, y) {
    if (this.xdir !== -x && this.ydir !== -y) {
      this.xdir = x;
      this.ydir = y;
    }
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    head.x += this.xdir;
    head.y += this.ydir;
  
    // Wrap around horizontally
    if (head.x >= cols) head.x = 0;
    else if (head.x < 0) head.x = cols - 1;
  
    // Wrap around vertically
    if (head.y >= rows) head.y = 0;
    else if (head.y < 0) head.y = rows - 1;
  
    if (this.growthCounter > 0) {
      this.growthCounter--;
    } else {
      this.body.shift();
    }
  
    this.body.push(head);
  }
  
  grow() {
    this.growthCounter += 1;
  }

  eatAny(foods) {
    let head = this.body[this.body.length - 1];
    for (let i = 0; i < foods.length; i++) {
      let f = foods[i];
      if (head.x === f.pos.x && head.y === f.pos.y) {
        this.grow();
        collectedWords.push(f.label);
        foods.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  endGame() {
    let head = this.body[this.body.length - 1];
    for (let i = 0; i < this.body.length - 1; i++) {
      if (head.equals(this.body[i])) return true; // self-collision death
    }
    return false;
  }
  

  show() {
    for (let part of this.body) {
      fill(0, 90, 255);
      noStroke();
      rect(part.x * scl, part.y * scl, scl, scl);
    }
  }
}  

class Particle {
  constructor() {
    this.reset();
    this.size = random(1, 3);
  }

  reset() {
    this.pos = createVector(random(width - 200), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.2, 0.5));
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.x < 0 || this.pos.x > width - 200 || this.pos.y < 0 || this.pos.y > height) {
      this.reset();
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(0, 100, 255, 70);
    ellipse(0, 0, this.size);
    pop();
  }
}
