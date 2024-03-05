let myImageArray = [];
let imageX = 100;
let i = 0;
let myFood;
let score = 0;
let timer = 60; // Countdown timer in seconds

function setup() {
  createCanvas(600, 600);

  // Create character images
  for (let n = 1; n <= 10; n++) {
    let img = loadImage("images/Idle (" + n + ").png");
    let myImage = new MyImage(img, imageX, 100, 640, 472);
    myImageArray.push(myImage);
  }

  // Create food object
  myFood = new Food();

  // Set interval for animation
  setInterval(updateImage, 50);

  // Set interval for random movement of food
  setInterval(moveFoodRandomly, 1000);
}

function draw() {
  background(220);

  // Draw character and food
  myImageArray[i].draw();
  myFood.display();

  // Handle character movement
  if (keyIsPressed) {
    if (key === "a") {
      imageX -= 1;
    }
    if (key === "d") {
      imageX += 1;
    }
  }

  // Update character positions
  myImageArray.forEach(myImage => {
    myImage.updateX(imageX);
  });

  // Check for collision between character and food
  myFood.isCollected(myImageArray[i].x, myImageArray[i].y, myImageArray[i].size);

  // Display timer
  displayTimer();

  // Display score
  displayScore();
}

function updateImage() {
  i = (i + 1) % myImageArray.length;
}

function moveFoodRandomly() {
  myFood.moveRandomly();
}

function displayTimer() {
  textAlign(LEFT);
  textSize(20);
  fill(0);
  text("Time: " + timer, width / 10, height / 10);
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  if (timer === 0) {
    // Game over
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2);
    noLoop(); // Stop the draw loop
  }
}

function displayScore() {
  textAlign(RIGHT);
  textSize(20);
  fill(0);
  text("Score: " + score, width - 20, height / 10);
}

class MyImage {
  constructor(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    image(this.img, this.x, this.y);
  }

  updateX(newX) {
    this.x = newX;
  }
}

class Food {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 20;
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size, this.size);
  }

  moveRandomly() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  isCollected(x, y, size) {
    let distance = dist(this.x, this.y, x, y);
    if (distance < (size + this.size) / 2) {
      score++;
      this.reset();
    }
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
  }
}
