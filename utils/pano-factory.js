Utils.panoFactory = function(image, name) {
  geometry = new THREE.SphereGeometry( 500, 60, 40 );
  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
  material = new THREE.MeshBasicMaterial( {
    map: THREE.ImageUtils.loadTexture( image )
  });
  var mesh = new THREE.Mesh( geometry, material );
  mesh.name = name;
  return mesh;
};
