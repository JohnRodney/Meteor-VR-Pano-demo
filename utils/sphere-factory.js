Utils.sphereFactory = function(name, pos) {

  var geometry = new THREE.SphereGeometry( 2, 20, 20 ),
      material = new THREE.MeshBasicMaterial( {color: 0x00ffaa, wireframe: true} ),
      mesh = new THREE.Mesh( geometry, material );

  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

  mesh.position = Utils.coordinateCopy(mesh.position, pos);
  mesh.name = name;

  return mesh;
};

/* Copy b to a */
Utils.coordinateCopy = function(a, b) {
  a.x = b.x;
  a.y = b.y;
  a.z = b.z;
  return a;
};
