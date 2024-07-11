import * as temp1 from "/js/temp1.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 3);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", render);
controls.minDistance = 1.2;
controls.maxDistance = 1.5;
controls.enablePan = false;
controls.enableDamping = true;
controls.minPolarAngle = 0;
controls.maxPolarAngle = 1.4;
controls.dampingFactor = 0.09;
controls.rotateSpeed = 0.4;
let directionalLight = new THREE.HemisphereLight(0xffffff, 0x080820, 3);
directionalLight.position.z = 3;
scene.add(directionalLight);
let loader = new GLTFLoader();

const genCubeUrls = function (prefix, postfix) {
  return [
    prefix + "px" + postfix,
    prefix + "nx" + postfix,
    prefix + "py" + postfix,
    prefix + "ny" + postfix,
    prefix + "pz" + postfix,
    prefix + "nz" + postfix,
  ];
};
var models = [];
const urls = genCubeUrls("./textures/cube/", ".png");
const whiteUrls = genCubeUrls("./textures/white/", ".png");
let tempCubeTexture;
new THREE.CubeTextureLoader().load(urls, function (cubeTexture) {
  tempCubeTexture = cubeTexture;
  cubeTexture.encoding = THREE.sRGBEncoding;

  scene.environment = cubeTexture;
});
new THREE.CubeTextureLoader().load(whiteUrls, function (cubeTexture) {
  cubeTexture.encoding = THREE.sRGBEncoding;

  scene.background = cubeTexture;
});

let park;
for (var i = 0; i < 9; i++) {
  loadTemp(i);
}
loader.load(`./model/Pano_Sphere.gltf`, function (gltf2) {
  gltf2.scene.position.set(0.05, 0.04, -0.05);
  gltf2.scene.scale.set(0.3, 0.3, 0.3);
  gltf2.scene.rotation.y = -0.85;
  gltf2.scene.children[0].children[0].material.side = 2;
  gltf2.scene.children[0].children[0].material.roughness = 1;
  gltf2.scene.children[0].children[0].material.lightMap =
    gltf2.scene.children[0].children[0].material.map;
  scene.add(gltf2.scene);
  renderer.render(scene, camera);
});

const map = new THREE.TextureLoader().load("./textures/images/point.png");
const material = new THREE.SpriteMaterial({ map: map });
const sprite_WelcomePlaza = new THREE.Sprite(material);
const sprite_Skycommunity = new THREE.Sprite(material);
const sprite_ArtLake = new THREE.Sprite(material);
const sprite_Gate = new THREE.Sprite(material);
const sprite_GrandField = new THREE.Sprite(material);
scene.add(sprite_WelcomePlaza);
scene.add(sprite_Skycommunity);
scene.add(sprite_ArtLake);
scene.add(sprite_Gate);
scene.add(sprite_GrandField);
sprite_WelcomePlaza.position.set(-0.04, -0.065, 0.3);
sprite_WelcomePlaza.scale.set(0.02, 0.03, 0.02);
sprite_WelcomePlaza.name = "sprite_WelcomePlaza";
sprite_Skycommunity.position.set(-0.11, 0.11, 0.17);
sprite_Skycommunity.scale.set(0.02, 0.03, 0.02);
sprite_Skycommunity.name = "sprite_Skycommunity";

sprite_ArtLake.position.set(0.2, -0.065, -0.055);
sprite_ArtLake.scale.set(0.02, 0.03, 0.02);
sprite_ArtLake.name = "sprite_ArtLake";

sprite_Gate.position.set(-0.23, -0.065, -0.15);
sprite_Gate.scale.set(0.02, 0.03, 0.02);
sprite_Gate.name = "sprite_Gate";

sprite_GrandField.position.set(-0.08, -0.065, 0.04);
sprite_GrandField.scale.set(0.02, 0.03, 0.02);
sprite_GrandField.name = "sprite_GrandField";

console.log(scene.children);
renderer.outputEncoding = THREE.sRGBEncoding;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
window.addEventListener("pointermove", onPointerMove);
window.addEventListener("click", onclick);
function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // controls.log(pointer);
}
function onclick(event) {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.type == "Sprite") {
      console.log(intersects[i].object.name);
      // break;
    }
  }
}

function render() {
  renderer.render(scene, camera);
}

// camera.position.z = 5;
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function loadTemp(i) {
  loader.load(
    `./model/LOD/50K/Bugae_UE_0709_50K_${i.toString().padStart(7, "0")}.glb`,
    function (gltf) {
      park = gltf;
      scene.add(gltf.scene);
      park.scene.position.set(-0.13, -0.1, 0.17);
      park.scene.scale.set(0.03, 0.03, 0.03);
      park.scene.rotation.x = -1.6;
      models.push(gltf.scene);
      renderer.render(scene, camera);
      loader.load(
        `./model/LOD/500K/Bugae_UE_0709_500K_${i
          .toString()
          .padStart(7, "0")}.glb`,
        function (gltf1) {
          gltf1.scene.position.set(-0.13, -0.1, 0.17);
          gltf1.scene.scale.set(0.03, 0.03, 0.03);
          gltf1.scene.rotation.x = -1.6;
          models[i].visible = false;
          scene.add(gltf1.scene);
          renderer.render(scene, camera);
        }
      );
    }
  );
}
animate();
