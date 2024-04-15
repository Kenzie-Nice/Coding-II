let shapes = [];
let textureImg;

function preload() {
  textureImg = loadImage('sticks.jpg');
}

function setup() {
  createCanvas(800, 800, WEBGL);

  // Create an array of shape objects
  shapes.push({ type: 'box', x: -100, y: 0, z: 0, rotation: 0, rotationSpeed: 0.01 });
  shapes.push({ type: 'box', x: 100, y: 0, z: 0, rotation: 0, rotationSpeed: 0.01 });
  shapes.push({ type: 'box', x: -200, y: -100, z: 0, rotation: 0, rotationSpeed: 0.09 });
  shapes.push({ type: 'sphere', x: 200, y: -100, z: 0, rotation: 0, rotationSpeed: 0.02 });
  shapes.push({ type: 'sphere', x: 0, y: 100, z: 0, rotation: 0, rotationSpeed: 0.03 });
}

function draw() {
  background(220);

  ambientLight(100);
  pointLight(255, 255, 255, -200, -200, 200);

  texture(textureImg);

  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];

    push();
    translate(shape.x, shape.y, shape.z);
    rotateX(shape.rotation);
    rotateY(shape.rotation);
    rotateZ(shape.rotation);

    if (shape.type === 'box') {
      box(50);
    } else if (shape.type === 'sphere') {
      sphere(50);
    }

    pop();

    shape.rotation += shape.rotationSpeed;
  }

  // Add your name and title to the piece
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("kenzie", width / 2, height - 20);
  text("Nice", width / 2, height - 10);
}

function mouseClicked() {
  // Randomly select at least two shapes
  let indexes = [];
  while (indexes.length < 2) {
    let index = floor(random(shapes.length));
    if (!indexes.includes(index)) {
      indexes.push(index);
    }
  }

  // Move selected shapes to new random locations
  for (let i = 0; i < indexes.length; i++) {
    let index = indexes[i];
    shapes[index].x = random(-width / 2, width / 2);
    shapes[index].y = random(-height / 2, height / 2);
    shapes[index].z = random(-200, 200);
  }
}
