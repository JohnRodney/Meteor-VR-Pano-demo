Utils.sphereFactory = function(name, pos) {

  Utils.waypointMaterial = new THREE.MeshPhongMaterial( { color: 0x00aa00, specular: 0xffffff, shininess: 430, shading: THREE.SmoothShading, transparent: true} );

  var geometry = new THREE.SphereGeometry( 2, 20, 20 ),
      mesh = new THREE.Mesh( geometry, Utils.waypointMaterial );

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
