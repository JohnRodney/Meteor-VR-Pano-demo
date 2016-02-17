function coordinateCopy(a, b) {
  a.x = b.x;
  a.y = b.y;
  a.z = b.z;
  return a;
}

Utils.sphereFactory = (name, pos) => {
  Utils.waypointMaterial = new THREE.MeshPhongMaterial({
    color: 0x00aa00, specular: 0xffffff, shininess: 430,
    shading: THREE.SmoothShading, transparent: true,
  });

  const geometry = new THREE.SphereGeometry(2, 20, 20);
  const mesh = new THREE.Mesh(geometry, Utils.waypointMaterial);

  geometry.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

  mesh.position = coordinateCopy(mesh.position, pos);
  mesh.name = name;

  return mesh;
};
