Utils.sphereFactory = function(name) {
  geometry = new THREE.SphereGeometry( 2, 20, 20 );
  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
  material = new THREE.MeshBasicMaterial( {color: 0x00ffaa, wireframe: true} );
  var mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -10;
  mesh.name = name;
  return mesh;
};

