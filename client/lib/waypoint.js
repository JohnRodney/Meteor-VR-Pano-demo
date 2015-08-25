Waypoint = function Waypoint(config) {
  return this.mesh = setUpWayPointMesh(config);
};

function setUpWayPointMesh(config){
  var mesh = new THREE.Mesh( sphereGeometry(), waypointMaterial()  );

  mesh.name = 'waypoint';
  mesh.position = setPosition(mesh.position,config.position);
  mesh.pointer = config.pointer;
  //Utils.uniforms.push(mesh);

  return mesh;
}

function sphereGeometry(){
  return new THREE.SphereGeometry(2, 32, 32);
}

function waypointMaterial(){
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(1, 1, 1),
  });
}

function glassGeometry(){
  var geometry = new THREE.DodecahedronGeometry( 2, 5 );
  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
  return geometry;
}

function glassMaterial(){
  return new THREE.ShaderMaterial( {
    uniforms: {
      time: { type: "f", value: 0.0},
      texture1: { type: 't', value: 0, texture: THREE.ImageUtils.loadTexture( 'water.jpg' ) },
    },
    attributes: {
      displacement: {type: "f", value: [] },
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    transparent: true
  });
}

function setPosition(a, b) {
  a.x = b.x || 0;
  a.y = b.y || 0;
  a.z = b.z || 0;
  return a;
}
