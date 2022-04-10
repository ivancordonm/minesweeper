class Cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.x = i * w + 1;
        this.y = j * w + 1;
        this.w = w;
        this.bee = false;
        this.revealed = false;
        this.countNeighbors = 0;
    }

    show() {
        stroke(0);
        fill(255);
        rect(this.x, this.y, this.w, this.w);
        if (this.revealed) {
            if (this.bee) {
                fill(127);
                ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w / 2);
            } else {
                fill(200);
                rect(this.x, this.y, this.w, this.w);
                if (this.countNeighbors > 0) {
                    fill(0);
                    textSize(this.w / 2);
                    textAlign(CENTER, CENTER);
                    text(this.countNeighbors, this.x + this.w / 2, this.y + this.w / 2);
                }
            }
        }
    }

    countBees() {
        if (this.bee) {
            this.countNeighbors = -1;
            return;
        }
        for (let xoff = -1; xoff <= 1; xoff++) {
            for (let yoff = -1; yoff <= 1; yoff++) {
                if (xoff === 0 && yoff === 0) {
                    continue;
                }
                let col = this.i + xoff;
                let row = this.j + yoff;

                if (col >= 0 && col < cols && row >= 0 && row < rows) {
                    let neighbor = grid[col][row];
                    if (neighbor.bee) {
                        this.countNeighbors++;
                    }
                }
            }
        }
    }

    contains(x, y) {
        return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
    }

    reveal() {
        current--;
        this.revealed = true;
        if (this.countNeighbors === 0) {
            this.floodFill();
        }
    }

    floodFill() {
        for (let xoff = -1; xoff <= 1; xoff++) {
            for (let yoff = -1; yoff <= 1; yoff++) {
                if (xoff === 0 && yoff === 0) {
                    continue;
                }
                let col = this.i + xoff;
                let row = this.j + yoff;

                if (col >= 0 && col < cols && row >= 0 && row < rows) {
                    let neighbor = grid[col][row];
                    if (!neighbor.revealed && !neighbor.bee) {
                        neighbor.reveal();
                    }
                }
            }
        }


    }
}
