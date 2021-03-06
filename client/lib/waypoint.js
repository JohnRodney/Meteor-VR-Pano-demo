function waypointGeometry() {
  return new THREE.SphereGeometry(2, 32, 32);
}

function waypointMaterial() {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(1, 1, 1),
  });
}

function setPosition(a, b) {
  a.x = b.x || 0;
  a.y = b.y || 0;
  a.z = b.z || 0;
  return a;
}

function setUpWayPointMesh(config) {
  const mesh = new THREE.Mesh(waypointGeometry(), waypointMaterial());

  mesh.name = 'waypoint';
  mesh.position = setPosition(mesh.position, config.position);
  mesh.pointer = config.pointer;

  return mesh;
}

Waypoint = function waypoint(config) {
  return setUpWayPointMesh(config);
};
