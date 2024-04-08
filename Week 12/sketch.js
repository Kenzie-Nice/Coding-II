let boxRotation = 0;
let sphereRotation = 0;
let coneRotation = 0;
let torusRotation = 0;
let cylinderRotation = 0;
let textureImg;

function preload() {

  textureImg = loadImage('sticks.jpg');
}

function setup() {
  createCanvas(600, 400, WEBGL);
}

function draw() {
  background(220);


  ambientLight(100);
  pointLight(255, 255, 255, -200, -200, 200);

  texture(textureImg);

  // stick... that are actually cubes? cheese curd?
  push();
  translate(-100, 0, 0);
  rotateX(boxRotation);
  rotateY(boxRotation);
  rotateZ(boxRotation);
  box(50);
  pop();

  
  push();
  translate(100, 0, 0);
  rotateX(boxRotation);
  rotateY(boxRotation);
  rotateZ(boxRotation);
  box(50);
  pop();

  
  push();
  translate(-200, -100, 0);
  rotateX(boxRotation);
  rotateY(boxRotation);
  rotateZ(boxRotation);
  box(50);
  pop();


  texture(textureImg);

  //sauces? of sorts
  push();
  translate(200, -100, 0);
  rotateX(sphereRotation);
  rotateY(sphereRotation);
  rotateZ(sphereRotation);
  sphere(50);
  pop();

 
  push();
  translate(0, 100, 0);
  rotateX(sphereRotation);
  rotateY(sphereRotation);
  rotateZ(sphereRotation);
  sphere(50);
  pop();

 
  boxRotation += 0.01;
  sphereRotation += 0.02;
}
