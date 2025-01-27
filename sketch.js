let cam;
let videos = [];
let videoPaths = [
  "./assets/video/Paper plane.mp4", //0
  "./assets/video/whale_1.mp4", //1
  "./assets/video/final_cut_1.mp4", //2
  "./assets/video/27 rabit watches tv.mp4", //3
  "./assets/video/Comp 2.mp4", //4
  "./assets/video/24.mp4", //5
  "./assets/video/hottea.mp4", //6
  "./assets/video/runrunrun.mp4", //7
  "./assets/video/wind.mp4", //8
  "./assets/video/Comp 1_4.mp4", //9
  "./assets/video/rainy bonny from space ship.mp4", //10
  "./assets/video/jellyfish ani2.mp4", //11
  "./assets/video/day11.mp4", //12
  "./assets/video/Comp 1_2.mp4", //13
  "./assets/video/loop raddish.mp4", //14
];
let coverImages = [];
let cubes = [];
let cubeSize = 300;
let selectedCube = null;
let environment;
let loadingComplete = false;
let lastMouseX = 0;
let lastMouseY = 0;
let font;

function preload() {
  environment = loadImage("./assets/image/sky.jpg");
  font = loadFont("./assets/font/Urbanist-Bold.ttf");

  coverImages[0] = loadImage("./assets/image/Paper plane.jpg");
  coverImages[1] = loadImage("./assets/image/whale_1.jpg");
  coverImages[2] = loadImage("./assets/image/final_cut_1.jpg");
  coverImages[3] = loadImage("./assets/image/27 rabit watches tv.jpg");
  coverImages[4] = loadImage("./assets/image/gift.jpg");
  coverImages[5] = loadImage("./assets/image/Bird.jpg");
  coverImages[6] = loadImage("./assets/image/hottea.jpg");
  coverImages[7] = loadImage("./assets/image/runrunrun.jpg");
  coverImages[8] = loadImage("./assets/image/wind.jpg");
  coverImages[9] = loadImage("./assets/image/Comp 1_4.jpg");
  coverImages[10] = loadImage("./assets/image/rainy bonny from space ship.jpg");
  coverImages[11] = loadImage("./assets/image/jellyfish ani2.jpg");
  coverImages[12] = loadImage("./assets/image/day11.jpg");
  coverImages[13] = loadImage("./assets/image/Comp 1_2.jpg");
  coverImages[14] = loadImage("./assets/image/loop raddish.jpg");

  videos = videoPaths.map((path) => createVideo(path));
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);

  for (i = 0; i < coverImages.length; i++) {
    image(coverImages[i], 0, 0, cubeSize, cubeSize);
  }

  cam = createCamera();
  cam.setPosition(0, -200, 2000);
  cam.lookAt(0, 0, 0);

  videos.forEach((video) => {
    video.size(cubeSize, cubeSize);
    video.hide();
    video.volume(0);
  });

  setTimeout(() => {
    loadingComplete = true;
  }, 2000);

  function generateNewCube(
    x,
    y,
    z,
    size,
    videos,
    coverImages,
    gravity = 0.5,
    velocity = 0
  ) {
    let newCube = new Cube(
      x,
      y,
      z,
      size,
      videos,
      coverImages,
      gravity,
      velocity
    );

    return newCube;
  }

  // Create cubes
  cubes.push(
    generateNewCube(
      -1100,
      -700,
      0,
      cubeSize * random(0.8, 1.2),
      [videos[9], videos[9], videos[11], videos[11], videos[10], videos[10]],
      [
        coverImages[9],
        coverImages[9],
        coverImages[11],
        coverImages[11],
        coverImages[10],
        coverImages[10],
      ],
      0.6,
      0.3
    )
  ); //1
  cubes.push(
    generateNewCube(
      -500,
      -700,
      100,
      cubeSize * random(0.8, 1.2),
      [videos[2], videos[2], videos[4], videos[4], videos[5], videos[5]],
      [
        coverImages[2],
        coverImages[2],
        coverImages[4],
        coverImages[4],
        coverImages[5],
        coverImages[5],
      ],
      0.5,
      0.1
    )
  ); //2
  cubes.push(
    generateNewCube(
      0,
      -700,
      50,
      cubeSize * random(0.8, 1.2),
      [videos[6], videos[6], videos[8], videos[8], videos[7], videos[7]],
      [
        coverImages[6],
        coverImages[6],
        coverImages[8],
        coverImages[8],
        coverImages[7],
        coverImages[7],
      ],
      0.7,
      0.2
    )
  ); //3
  cubes.push(
    generateNewCube(
      500,
      -700,
      150,
      cubeSize * random(0.8, 1.2),
      [videos[1], videos[1], videos[0], videos[0], videos[3], videos[3]],
      [
        coverImages[1],
        coverImages[1],
        coverImages[0],
        coverImages[0],
        coverImages[3],
        coverImages[3],
      ],

      0.8,
      0.2
    )
  ); //4
  cubes.push(
    generateNewCube(
      1100,
      -700,
      100,
      cubeSize * random(0.8, 1.2),
      [videos[12], videos[12], videos[14], videos[14], videos[13], videos[13]],
      [
        coverImages[12],
        coverImages[12],
        coverImages[14],
        coverImages[14],
        coverImages[13],
        coverImages[13],
      ],
      0.3,
      0.2
    )
  ); //5
}

function keyPressed() {
  let cubeToSelect = selectedCube;

  switch (key) {
    case "1":
      cubeToSelect = cubes[0];
      break;
    case "2":
      cubeToSelect = cubes[1];
      break;
    case "3":
      cubeToSelect = cubes[2];
      break;
    case "4":
      cubeToSelect = cubes[3];
      break;
    case "5":
      cubeToSelect = cubes[4];
      break;
    case "0":
      location.reload();
  }

  if (selectedCube != null && selectedCube != cubeToSelect) {
    selectedCube.resetTextures();
    selectedCube.resetScale();
    selectedCube.pushAside();
  }

  selectedCube = cubeToSelect;
  selectedCube.setToVideoTextures();
  selectedCube.scaleUp();
  selectedCube.moveToCenter();
}

function mouseDragged(event) {
  console.log(event);

  if (selectedCube != null && lastMouseX != 0 && lastMouseY != 0) {
    selectedCube.rotationY += (mouseX - lastMouseX) / 10;
    selectedCube.rotationX -= (mouseY - lastMouseY) / 10;
  }
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function mouseReleased() {
  lastMouseX = 0;
  lastMouseY = 0;
}

function draw() {
  if (!loadingComplete) {
    // Loading screen
    background(255);
    panorama(environment);
    textFont(font);
    fill(255);
    textSize(128);
    textAlign(CENTER, CENTER);
    text("Loading...", 0, 0);
  } else {
    // Interactive scene
    background(200);
    panorama(environment);

    cubes.forEach((cube) => {
      if (selectedCube != cube) {
        cube.applyGravity();
      }
      cube.draw();
    });
  }
}

class Cube {
  constructor(x, y, z, size, videos, coverImages, gravity, velocity) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.originalZ = z;
    this.size = size;
    this.videos = videos;
    this.coverImages = coverImages;
    this.textures = coverImages || new Array(6).fill(null);
    this.g = size / 2;
    this.velocity = velocity || 0;
    this.gravity = gravity || 0.5;
    this.bounceFactor = 0.7;
    this.rotationX = random(TWO_PI);
    this.rotationY = random(TWO_PI);
    this.rotationZ = random(TWO_PI);
    this.rotationSpeedX = random(0.01, 0.05);
    this.rotationSpeedY = random(0.01, 0.05);
    this.rotationSpeedZ = random(0.01, 0.05);
    this.isFalling = true;
    this.scaleFactor = 1;
    this.scaled = false;
  }
  scaleUp() {
    if (!this.scaled) {
      this.scaleFactor = 2;
      this.z += 500;
      this.scaled = true;
    }
  }

  resetScale() {
    this.scaleFactor = 1;
    this.z = this.originalZ;
    this.scaled = false;
  }

  setToVideoTextures() {
    this.textures = this.videos;
    this.videos.forEach((video) => {
      video.loop();
      video.autoplay();
    });
  }

  resetTextures() {
    this.textures = this.coverImages;
    this.videos.forEach((video) => {
      video.stop();
      video.hide();
      1;
    });
  }

  applyGravity() {
    if (this.y + this.g < height / 2) {
      // Cube is falling
      this.velocity += this.gravity;
      this.isFalling = true;

      // Update rotation while falling
      this.rotationX += this.rotationSpeedX;
      this.rotationY += this.rotationSpeedY;
      this.rotationZ += this.rotationSpeedZ;
    } else {
      // Cube has hit the ground
      if (abs(this.velocity) > 1) {
        this.velocity *= -this.bounceFactor;
      } else {
        this.velocity = 0;
      }
      this.y = height / 2 - this.g;
      this.isFalling = false;

      this.rotationSpeedX = 0;
      this.rotationSpeedY = 0;
      this.rotationSpeedZ = 0;
    }
    this.y += this.velocity;
  }

  draw() {
    if (dist(this.x, this.y, 0, 0) < 50) {
      this.x = lerp(this.x, 0, 0.1);
      this.y = lerp(this.y, 0, 0.1);
    }

    push();
    translate(this.x, this.y, this.z);
    scale(this.scaleFactor);

    rotateX(this.rotationX);
    rotateY(this.rotationY);
    rotateZ(this.rotationZ);

    for (let i = 0; i < 6; i++) {
      texture(this.textures[i]);
      beginShape();
      const vertices = this.getFaceVertices(i);
      for (let j = 0; j < vertices.length; j += 5) {
        vertex(
          vertices[j],
          vertices[j + 1],
          vertices[j + 2],
          vertices[j + 3],
          vertices[j + 4]
        );
      }
      endShape(CLOSE);
    }

    pop();
  }

  getFaceVertices(faceIndex) {
    const g = this.g;
    const faces = [
      // Front face
      [-g, -g, g, 0, 0, g, -g, g, 1, 0, g, g, g, 1, 1, -g, g, g, 0, 1],
      // Back face
      [g, -g, -g, 0, 0, -g, -g, -g, 1, 0, -g, g, -g, 1, 1, g, g, -g, 0, 1],
      // Right face
      [g, -g, g, 0, 0, g, -g, -g, 1, 0, g, g, -g, 1, 1, g, g, g, 0, 1],
      // Left face
      [-g, -g, -g, 0, 0, -g, -g, g, 1, 0, -g, g, g, 1, 1, -g, g, -g, 0, 1],
      // Top face
      [-g, -g, -g, 0, 0, g, -g, -g, 1, 0, g, -g, g, 1, 1, -g, -g, g, 0, 1],
      // Bottom face
      [-g, g, g, 0, 0, g, g, g, 1, 0, g, g, -g, 1, 1, -g, g, -g, 0, 1],
    ];
    return faces[faceIndex];
  }

  moveToCenter() {
    this.x = 0 - this.size / 2;
    this.y = 0 - this.size / 2;
  }

  pushAside() {
    this.isFalling = true;
    this.rotationSpeedX = random(0.01, 0.05);
    this.rotationSpeedY = random(0.01, 0.05);
    this.rotationSpeedZ = random(0.01, 0.05);
    this.x += random(-1000, 1000);
    this.y += random(-1000, 1000);
    this.z += random(-300, 300);
  }
}
