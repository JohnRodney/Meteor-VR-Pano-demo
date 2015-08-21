Waypoint = function Waypoint(config) {

  var geometry = new THREE.SphereGeometry( 2, 20, 20 );
  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

  var material = new THREE.MeshBasicMaterial( {color: 0x00ffaa, wireframe: true} );

  this.mesh = new THREE.Mesh( geometry, material );
  this.mesh.name = 'waypoint';
  this.mesh.position = setPosition(this.mesh.position,config.position);
  this.mesh.payload = config.payload;

  return this.mesh;
};

function setPosition(a, b) {
  var pos = 0;
  a.x = b.x || pos;
  a.y = b.y || pos;
  a.z = b.z || pos;
  return a;
}

function listen() {
  alert('change!');
}

