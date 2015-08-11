Utils.sphereFactory = function(name) {
  var geometry = new THREE.SphereGeometry( 2, 20, 20 ),
      material = new THREE.MeshBasicMaterial( {color: 0x00ffaa, wireframe: true} ),
      mesh = new THREE.Mesh( geometry, material );

  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

  mesh.position.z = -10;
  mesh.name = name;

  return mesh;
};

