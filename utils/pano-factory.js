Utils.panoFactory = function(image) {
  geometry = new THREE.SphereGeometry( 500, 60, 40 );
  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
  material = new THREE.MeshBasicMaterial( {
    map: THREE.ImageUtils.loadTexture( 'DantesView.jpg' )
  });
  return new THREE.Mesh( geometry, material );
};
