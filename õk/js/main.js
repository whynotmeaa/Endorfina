// Import necessary modules from Three.js
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

document.body.style.cursor = 'url("Curs/ArrowFarCursor.png"), auto';




// Create a Three.js scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a WebGL renderer with transparent background
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Setup OrbitControls for camera interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

// Lighting: ambient and directional lights
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);
scene.add(new THREE.AmbientLight(0x333333, 1));

// Load the GLTF model
const loader = new GLTFLoader();
loader.load(
  './models/Endorfina/scene.gltf',
  (gltf) => {
    const object = gltf.scene;
    object.scale.set(6, 7, 6); // Scale the model
    object.position.set(-100, 150, 0); // Position it appropriately
    scene.add(object);
  },
  (xhr) => console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`),
  (error) => console.error(error)
);

// Set camera position and controls
camera.position.z = 500;

// Disable right-click context menu
document.addEventListener('contextmenu', (event) => event.preventDefault());

// Resize handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update the controls
  renderer.render(scene, camera); // Render the scene
}

// Start the animation loop
animate();
