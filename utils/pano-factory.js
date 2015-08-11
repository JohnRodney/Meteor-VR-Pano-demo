
Utils.panoFactory = function(image, name) {

  Utils.material = new THREE.MeshBasicMaterial( {
    map: THREE.ImageUtils.loadTexture( image )
  });

  var geometry = new THREE.SphereGeometry( 500, 60, 40 ),
      mesh = new THREE.Mesh( geometry, Utils.material );

  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
  mesh.name = name;

  return mesh;

};
