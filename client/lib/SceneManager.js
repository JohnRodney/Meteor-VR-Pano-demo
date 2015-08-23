SceneManager = {};

SceneManager.init = function(){

  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(this.renderer.domElement);

  this.scene = new THREE.Scene();
  this.scene.delete = deleteByName;

  this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 10000);
  this.controls = new THREE.VRControls(this.camera);

  this.effect = new THREE.VREffect(this.renderer);
  this.effect.setSize(window.innerWidth, window.innerHeight);

  this.manager = new WebVRManager(this.renderer, this.effect, {hideButton: false});
  this.clock = new THREE.Clock(true);

  this.clock = new THREE.Clock(true);
  this.raycaster = new THREE.Raycaster();
  this.mouse = new THREE.Vector2();

  this.light = new THREE.AmbientLight( 0xafafaf ); // soft white light
  this.scene.add( this.light );

  this.setLookAt = setLookAt;
  this.getLookAtCollisions = getLookAtCollisions;
  this.update = update;
  this.start = new Date().getTime();
};

SceneManager.addMultiple = function(arr){
  arr.forEach( function(mesh) { this.scene.add( mesh ); }.bind(this) );
};

function deleteByName(name){
  this.remove( this.getObjectByName( name ) );
}

function setLookAt(){
  this.raycaster.set(this.camera.position, new THREE.Vector3(0,0,-1).applyQuaternion( this.camera.quaternion));
}

function getLookAtCollisions(){
  return this.raycaster.intersectObjects( this.scene.children );
}

function update() {
  this.setLookAt();
  this.delta = this.clock.getDelta();
  this.controls.update();
  this.manager.render(this.scene, this.camera);
}
