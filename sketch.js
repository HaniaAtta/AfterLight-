


let scl = 120;
let cols, rows;
let snake;
let foodWords = [];
let levels = [
    ["Water", "Heat", "Wires", "Energy", "Depletion", "Data"],
    ["Climate", "emergency", "Intelligence", "Cost", "Loss"],
    ["Heat", "Heat", "Heat", "Heat", "Heat"]
];

let currentLevel = 0;
let particles = [];
let gameStarted = false;
let collectedWords = [];

function setup() {
    let canvas = createCanvas(1200, 880);
    canvas.parent('canvas-container');
    cols = floor((width - 200) / scl);
    rows = floor(height / scl);
    snake = new Snake();
    placeWords();

    for (let i = 0; i < 15; i++) {
        particles.push(new Particle());
    }

    textFont('monospace');
    textAlign(CENTER, CENTER);
    frameRate(4);
}

function draw() {
    background(255);

    if (gameStarted) {
        for (let p of particles) {
            p.update();
            p.show();
        }
    }
    
    drawGrid();
    drawWordBox();

    if (gameStarted) {
        drawWords();
        snake.update();
        snake.show();

        if (snake.eatAny(foodWords)) {
            if (foodWords.length === 0) {
                if (currentLevel < levels.length - 1) {
                    currentLevel++;
                    collectedWords = [];
                    placeWords();
                } else {
                    showGameComplete();
                    return;
                }
            }
        }

        if (snake.endGame()) {
            showGameOver();
            gameStarted = false;
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
    noStroke();
    textAlign(CENTER, CENTER);

    let fixedSize = scl * 0.15; // Adjust this multiplier for size (e.g., 0.2 to 0.3)
    textSize(fixedSize);
    fill(0, 90, 255);

    for (let fw of foodWords) {
        let word = fw.label;
        let x = fw.pos.x * scl + scl / 2;
        let y = fw.pos.y * scl + scl / 2;
        text(word, x, y);
    }
}



function placeWords() {
    foodWords = [];
    let positions = new Set();
    let levelWords = levels[currentLevel];
    
    for (let word of levelWords) {
        let x, y;
        do {
            x = floor(random(cols));
            y = floor(random(rows));
        } while (positions.has(`${x},${y}`));
        positions.add(`${x},${y}`);
        foodWords.push({ pos: createVector(x, y), label: word });
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
    text(`Level ${currentLevel + 1} Words`, boxX + 10, 30);

    textSize(14);
    for (let i = 0; i < collectedWords.length; i++) {
        text("• " + collectedWords[i], boxX + 10, 60 + i * 20);
    }

    textSize(12);
    text(`Total: ${collectedWords.length}`, boxX + 10, height - 30);
}

function resetGame() {
    loop();
    document.getElementById('game-over').style.display = 'none';
    snake = new Snake();
    currentLevel = 0;
    collectedWords = [];
    placeWords();
    gameStarted = true;
}

function showGameComplete() {
    const gameOverDiv = document.getElementById('game-over');
    const wordsList = document.getElementById('collected-words-list');
    
    wordsList.innerHTML = `
        <div class="complete-message">SYSTEM ANALYSIS COMPLETE</div>
        ${collectedWords.map(word => `<div class="word-item">${word}</div>`).join('')}
    `;
    
    gameOverDiv.style.display = 'block';
    noLoop();
}

function showGameOver() {
    const gameOverDiv = document.getElementById('game-over');
    const wordsList = document.getElementById('collected-words-list');
    
    wordsList.innerHTML = collectedWords.map(word => 
        `<div class="word-item">${word}</div>`
    ).join('');
    
    gameOverDiv.style.display = 'block';
    noLoop();
}

function keyPressed() {
    if (!gameStarted) {
        gameStarted = true;
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

        // Boundary checks
        if (head.x >= cols) head.x = 0;
        else if (head.x < 0) head.x = cols - 1;
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
      // Check collision with body segments only
      for (let i = 0; i < this.body.length - 1; i++) {
          if (head.equals(this.body[i])) return true;
      }
      return false;
  }
  show() {
        stroke(0, 90, 255);
        strokeWeight(scl / 4); // 1/4 of cell size
        noFill();
    
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = 'rgba(0, 90, 255, 0.6)';
    
        beginShape();
        for (let part of this.body) {
          let px = part.x * scl + scl / 2;
          let py = part.y * scl + scl / 2;
          vertex(px, py);
        }
        endShape();
    
        drawingContext.shadowBlur = 0;
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

// Make resetGame globally accessible
window.resetGame = resetGame;