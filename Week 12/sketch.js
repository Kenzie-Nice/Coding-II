let boxRotation = 0;
let sphereRotation = 0;
let coneRotation = 0;
let torusRotation = 0;
let cylinderRotation = 0;
let textureImg;

function preload() {
  // Load the texture image
  textureImg = loadImage('sticks.jpg');
}

function setup() {
  createCanvas(600, 400, WEBGL);
}

function draw() {
  background(220);

  // Set up lights
  ambientLight(100);
  pointLight(255, 255, 255, -200, -200, 200);

  // Apply texture
  texture(textureImg);

  // Draw a rectangle (box) with texture
  push();
  translate(-100, 0, 0);
  rotateX(boxRotation);
  rotateY(boxRotation);
  rotateZ(boxRotation);
  box(50);
  pop();

  // Draw a rectangle (box) with texture
  push();
  translate(100, 0, 0);
  rotateX(boxRotation);
  rotateY(boxRotation);
  rotateZ(boxRotation);
  box(50);
  pop();

  // Draw a rectangle (box) with texture
  push();
  translate(-200, -100, 0);
  rotateX(boxRotation);
  rotateY(boxRotation);
  rotateZ(boxRotation);
  box(50);
  pop();

  // Apply texture
  texture(textureImg);

  // Draw a sphere with texture
  push();
  translate(200, -100, 0);
  rotateX(sphereRotation);
  rotateY(sphereRotation);
  rotateZ(sphereRotation);
  sphere(50);
  pop();

  // Draw a sphere with texture
  push();
  translate(0, 100, 0);
  rotateX(sphereRotation);
  rotateY(sphereRotation);
  rotateZ(sphereRotation);
  sphere(50);
  pop();

  // Update rotations
  boxRotation += 0.01;
  sphereRotation += 0.02;
}
