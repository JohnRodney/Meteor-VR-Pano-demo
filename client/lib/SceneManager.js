function setLookAt() {
  this.raycaster.set(this.camera.position, new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion));
}

function update() {
  this.setLookAt();
  this.delta = this.clock.getDelta();
  this.controls.update();
  this.manager.render(this.scene, this.camera);
}

function getLookAtCollisions() {
  return this.raycaster.intersectObjects(this.scene.children);
}

function setupExtras() {
  this.setLookAt = setLookAt;
  this.getLookAtCollisions = getLookAtCollisions;
  this.update = update;
  this.start = new Date().getTime();
}

function addLights() {
  this.light = new THREE.PointLight(0x3f3f3f, 0.8, 100);
  this.scene.add(this.light);
}

function addCollisionTools() {
  this.clock = new THREE.Clock(true);
  this.raycaster = new THREE.Raycaster();
  this.mouse = new THREE.Vector2();
}

function addVRManager() {
  this.manager = new WebVRManager(this.renderer, this.effect, { hideButton: false });
}

function addVREffect() {
  this.effect = new THREE.VREffect(this.renderer);
  this.effect.setSize(window.innerWidth, window.innerHeight);
}

function addCamera() {
  this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 10000);
  this.controls = new THREE.VRControls(this.camera);
}

function deleteByName(name) {
  this.remove(this.getObjectByName(name));
}

function addScene() {
  this.scene = new THREE.Scene();
  this.scene.delete = deleteByName;
}

function addRenderer() {
  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(this.renderer.domElement);
}

SceneManager = {};

SceneManager.init = function init() {
  addRenderer.call(this);
  addScene.call(this);
  addCamera.call(this);
  addVREffect.call(this);
  addVRManager.call(this);
  addCollisionTools.call(this);
  addLights.call(this);
  setupExtras.call(this);
};

SceneManager.addMultiple = function addMultiple(arr) {
  arr.forEach((mesh) => { this.scene.add(mesh); });
};
