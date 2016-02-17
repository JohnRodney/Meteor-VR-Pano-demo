function animateWaypoint(mesh) {
  if (this.waypointIsAnimating) { return false; }

  this.waypointIsAnimating = true;

  Utils.transition({
    mesh,
    type: 'gradient-shift',
    opts: { stop: new THREE.Color(0.0, 1.0, 0.0) },
    duration: 3,
  });
}

Pano = {};

Pano.animateWaypoint = animateWaypoint;
Pano.waypointIsAnimating = false;
