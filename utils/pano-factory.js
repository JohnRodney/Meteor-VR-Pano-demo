Utils.panoFactory = (image, name) => {
  Utils.material = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture(image),
  });

  /* This is required if the textures are not a power of two in order
   * for shaders and tranisions to work properly on the image texture
   *  this will build your textures as the nearest power of 2 ratio
   *  from its current */
  Utils.material.map.minFilter = THREE.NearestFilter;

  const geometry = new THREE.SphereGeometry(500, 60, 40);
  const mesh = new THREE.Mesh(geometry, Utils.material);

  geometry.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

  mesh.name = name;
  return mesh;
};
