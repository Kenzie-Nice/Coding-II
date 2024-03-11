let myImageArray = [];
let imageX = 100;
let imageY = 100; // Add variable for vertical movement
let i = 0;
let myFood1; // Additional food item
let myFood2; // Additional food item
let timer = 60; // Countdown timer in seconds
let movementSpeed = 5; // Increase movement speed
let eatGoodSound;
let eatBadSound;
let health = 100; // Initialize health
let healthBarWidth = 200;
let healthBarHeight = 20;
let bgMusic;

function preload() {
    eatGoodSound = loadSound("sounds/385892__spacether__262312__steffcaffrey__cat-meow1.mp3"); // Adjusted file path for good sound
    eatBadSound = loadSound("sounds/159367__huminaatio__7-error.wav"); // Adjusted file path for bad sound
    bgMusic = loadSound("sounds/645486__skylarmianlind__pulse-width.wav"); // Background music
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Create character images
    for (let n = 1; n <= 10; n++) {
        let img = loadImage("images/Idle (" + n + ").png");
        let myImage = new MyImage(img, imageX, imageY, 100, 100); // Adjust image creation to include vertical movement
        myImageArray.push(myImage);
    }

    // Create food objects
    myFood1 = new Food(random(width), random(height)); // Random initial position
    myFood2 = new Food(random(width), random(height), [0, 255, 0]); // Random initial position, green color

    // Set interval for animation
    setInterval(updateImage, 50);

    // Set interval for random movement of food
    setInterval(moveFoodRandomly, 1000);

    // Play background music
    bgMusic.loop();
}

function draw() {
    background(220);

    // Draw character and food
    myImageArray[i].draw();
    myFood1.display();
    myFood2.display();

    // Handle character movement
    if (keyIsDown(65)) { // A key
        imageX -= movementSpeed;
    }
    if (keyIsDown(68)) { // D key
        imageX += movementSpeed;
    }
    if (keyIsDown(87)) { // W key
        imageY -= movementSpeed;
    }
    if (keyIsDown(83)) { // S key
        imageY += movementSpeed;
    }

    // Update character positions
    myImageArray.forEach(myImage => {
        myImage.update(imageX, imageY);
    });

    // Check for collision between character and food
    myFood1.isCollected(myImageArray[i].x, myImageArray[i].y, myImageArray[i].width, myImageArray[i].height);
    myFood2.isCollected(myImageArray[i].x, myImageArray[i].y, myImageArray[i].width, myImageArray[i].height);

    // Display timer
    displayTimer();

    // Display health
    displayHealth();
}

function updateImage() {
    i = (i + 1) % myImageArray.length;
}

function moveFoodRandomly() {
    myFood1.moveRandomly();
    myFood2.moveRandomly();
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

function displayHealth() {
    // Draw health bar background
    fill(255);
    rect(width / 2 - healthBarWidth / 2, 20, healthBarWidth, healthBarHeight);

    // Draw filled portion of health bar based on health percentage
    let filledWidth = map(health, 0, 100, 0, healthBarWidth);
    fill(0, 255, 0);
    rect(width / 2 - healthBarWidth / 2, 20, filledWidth, healthBarHeight);
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
        image(this.img, this.x, this.y, this.width, this.height);
    }

    update(newX, newY) {
        this.x = newX;
        this.y = newY; // Update both x and y positions
    }
}

class Food {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.color = color || [255, 0, 0]; // Default to red if color is not specified
    }

    display() {
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    }

    moveRandomly() {
        this.x += random(-5, 5);
        this.y += random(-5, 5);
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    isCollected(x, y, width, height) {
        let distance = dist(this.x, this.y, x + width / 2, y + height / 2);
        if (distance < (this.size + min(width, height)) / 2) {
            if (this.color[0] === 255 && this.color[1] === 0 && this.color[2] === 0) { // Checking if food is red
                health += 10; // Increase health for food1
                eatGoodSound.play(); // Play sound for food1
            } else {
                health -= 10; // Decrease health for food2
                eatBadSound.play(); // Play sound for food2
            }
            this.reset();
        }
    }

    reset() {
        this.x = random(width);
        this.y = random(height);
    }
}
