var bcenterX;
var bcenterY;
var bdiam;
var fuseEndX;
var fuseEndY;
var gameState;
var newState;
var secretKey;
var secretKey1;
var countDown;
var hotKey;
var hotKey1;
var hotKey2;
var previousKey;

function setup() {
    createCanvas(512, 512);
    textSize(32);
    strokeWeight(5);

    // initialise variables
    bdiam = 250;
    gameState = 0;
    secretKey = "D";
    secretKey1 = "F";
    previousKey = "";
    hotKey = "G";
    hotKey1 = "H";
    hotKey2 = "J";
}

function draw() {
    bcenterX = width / 2;
    bcenterY = height / 2;

    if (gameState == 1) {
        // wobble the bomb
        bcenterX += random(-10, 10);
        bcenterY += random(-10, 10);

        countDown--;
        if (countDown <= 0) {
            gameState = 2;
        }
    }

    fuseEndX = bcenterX + 20;
    fuseEndY = bcenterY - bdiam / 2 - 30;

    background(100);

    // draw the fuse
    noFill();
    stroke(200, 100, 0);
    line(
        bcenterX,
        bcenterY - bdiam / 2,
        fuseEndX,
        fuseEndY
    );

    if (gameState == 1) {
        // draw the flame 
        fill(255, 255, 0);
        noStroke();
        beginShape();
        vertex(fuseEndX, fuseEndY);
        vertex(fuseEndX + 20, fuseEndY - 20);
        vertex(fuseEndX + 20, fuseEndY - 50);
        vertex(fuseEndX - 10, fuseEndY - 30);
        endShape(CLOSE);
    }

    // draw the bomb
    noStroke();
    fill(0);
    ellipse(bcenterX, bcenterY, bdiam, bdiam);
    fill(255);
    quad(
        bcenterX + 40, bcenterY - 60,
        bcenterX + 80, bcenterY - 60,
        bcenterX + 70, bcenterY - 30,
        bcenterX + 50, bcenterY - 30
    );

    fill(255);

    if (gameState == 0) {
        text("Press any key to start", 20, height / 2);
    } else if (gameState == 1) {
        text("Press a key to diffuse the bomb", 20, height - 50);
        text("CountDown " + countDown, 20, 40);
    } else if (gameState == 2) {
        text("Game Over", 20, height / 2);
    } else if (gameState == 3) {
        text("You Won!", width / 2 - 60, height / 2);
    }
}

function keyPressed() {
    newState = gameState; // Default to keep current state

    if (gameState == 0) {
        newState = 1;
        countDown = 200;
        previousKey = "";
    } else if (gameState == 1) {
        if (previousKey === "" && key === secretKey) {
            previousKey = key; // Correct first key
        } else if (previousKey === secretKey && key === secretKey1) {
            newState = 3; // Win!
        } else if (key === hotKey || key === hotKey1 || key === hotKey2) {
            countDown += 20; // Bonus time
        } else {
            newState = 2; // Game over
        }
    } else if (gameState == 2 || gameState == 3) {
        newState = 0; // Reset game
    }

    gameState = newState;
    console.log("GameState:", gameState);
}
