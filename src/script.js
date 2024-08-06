import * as THREE from "three";
import "./style.css";

// loading
const textureLoader = new THREE.TextureLoader();
// const normalTexture = textureLoader.load("/textures/NormalMap.png");
// const normalTexture = textureLoader.load("/textures/NormalMap1.jpg");
const normalTexture = textureLoader.load("/textures/NormalMap2.jpg");

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereGeometry(0.6, 64, 64);

// Material

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.repeat = new THREE.Vector2(5, 5);
material.color = new THREE.Color(0xe0e5e5);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

// point light
const pointLight = new THREE.PointLight(0xc0c0c0, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 5;
pointLight.position.z = 10;
scene.add(pointLight);

// point light 2
const pointLight2 = new THREE.PointLight(0xde7f7f, 2.581);
pointLight2.position.set(-6.1, 7.3, 2.581);
pointLight2.intensity = 0.305;
scene.add(pointLight2);

// point light 3
const pointLight3 = new THREE.PointLight(0x7cf5, 3.905);
pointLight3.position.set(6.87, -8.96, 3.905);
pointLight3.intensity = 0.305;
scene.add(pointLight3);

// const matFol = gui.addFolder("Material");
// matFol.add(material, "metalness").min(0).max(1).step(0.001);
// matFol.add(material, "roughness").min(0).max(1).step(0.001);
// matFol.add(material, "repeat").min(0).max(10).step(0.001);

// gui.add(material, "roughness").min(0).max(1).step(0.001);
// gui.add(material, "metalness").min(0).max(1).step(0.001);

// const light0 = gui.addFolder("Light 0");
// light0.add(pointLight.position, "x").min(-10).max(10).step(0.01);
// light0.add(pointLight.position, "y").min(-10).max(10).step(0.01);
// light0.add(pointLight.position, "z").min(-10).max(10).step(0.01);
// light0.add(pointLight, "intensity").min(0).max(10).step(0.001);

// setup gui
// const light1 = gui.addFolder("Light 1");
// light1.add(pointLight2.position, "x").min(-10).max(10).step(0.01);
// light1.add(pointLight2.position, "y").min(-10).max(10).step(0.01);
// light1.add(pointLight2.position, "z").min(-10).max(10).step(0.01);
// light1.add(pointLight2, "intensity").min(0).max(10).step(0.001);

// changing of color inside the gui
// const light1Color = {
//   color: 0xff0000,
// };
// light1.addColor(light1Color, "color").onChange(() => {
//   pointLight2.color.set(light1Color.color);
// });

// const light2 = gui.addFolder("Light 2");
// light2.add(pointLight3.position, "x").min(-10).max(10).step(0.01);
// light2.add(pointLight3.position, "y").min(-10).max(10).step(0.01);
// light2.add(pointLight3.position, "z").min(-10).max(10).step(0.01);
// light2.add(pointLight3, "intensity").min(0).max(10).step(0.001);

// changing of color inside the gui
// const light2Color = {
//   color: 0xff0000,
// };
// light2.addColor(light2Color, "color").onChange(() => {
//   pointLight3.color.set(light2Color.color);
// });

// const normal = gui.addFolder("Normal");
// normal.add(material.normalScale, "x").min(0).max(10).step(0.01);
// normal.add(material.normalScale, "y").min(0).max(10).step(0.01);

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper);
// scene.add(pointLightHelper2);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

const onDocumentMouseMove = (event) => {
  mouseX = event.clientX - windowX * 2;
  mouseY = event.clientY - windowY * 2;
};

const updateSphere = () => {
  sphere.position.y = window.scrollY * -0.002;
  // sphere.rotation.x = window.scrollY * 0.0005;
  // sphere.rotation.z = window.scrollY * 0.0005;
};

document.addEventListener("mousemove", onDocumentMouseMove);
window.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  sphere.position.z += 0.05 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
