let grid;
let w = 50;
let cols;
let rows;
let current;
let status = "playing";

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function setup() {
    createCanvas(502, 602);

    cols = floor(width / w);
    rows = floor((height - 100) / w);

    grid = make2DArray(cols, rows);

    let bees = [];
    let numBees = floor(cols * rows / 10);
    current = (cols * rows) - numBees;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            bees.push([i, j]);
        }
    }

    for (let n = 0; n < numBees; n++) {
        let index = floor(random(bees.length));
        let choice = bees[index];
        bees.splice(index, 1);
        grid[choice[0]][choice[1]].bee = true;
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].countBees();
        }
    }
}

function revealAllPanels() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].revealed = true;
        }
    }
}

function lostGame() {
    status = "lost";
    revealAllPanels();
}

function wonGame() {
    status = "won";
    revealAllPanels();
}

function mousePressed() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                grid[i][j].reveal();
                if (current === 0) {
                    wonGame();
                }
                if (grid[i][j].bee) {
                    lostGame();
                }
            }
        }
    }
}

function score() {
    textSize(32);
    textAlign(LEFT, CENTER);
    if (status === "playing") {
        fill(0);
        text("Left: " + current, 10, 550);
    } else if (status === "lost") {
        fill("red");
        text("You lost!", 10, 550);
    } else if (status === "won") {
        fill("green");
        text("You won!", 10, 550);
    }

}

function draw() {
    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }

    noStroke();
    fill(255);
    rect(0, 502, 502, 100);

    score();
}
