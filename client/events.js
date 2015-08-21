function onKey(event) {
  if (event.keyCode == 90) { // z
    SceneManager.controls.resetSensor();
  }
}

function onWindowResize() {
  SceneManager.camera.aspect = window.innerWidth / window.innerHeight;
  SceneManager.camera.updateProjectionMatrix();
  SceneManager.effect.setSize( window.innerWidth, window.innerHeight );
}

function onMouseClick(event) {

  SceneManager.mouse.x = (event.clientX / window.innerWidth ) * 2 - 1;
  SceneManager.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  var waypoint; //intialize var to hold waypoint; we'll use it to hold our instance

  SceneManager.raycaster.setFromCamera( SceneManager.mouse, SceneManager.camera );
  var intersects = SceneManager.raycaster.intersectObjects( SceneManager.scene.children );

  for ( var i = 0; i < intersects.length; i++ ) {
    waypoint = intersects[ i ].object;
    if (waypoint.name == 'waypoint') {
      Utils.material.map.image.src = '10000.jpg';
      Utils.material.map.needsUpdate = true;
    }
  }
}

window.addEventListener('keydown', onKey, true);
window.addEventListener('resize', onWindowResize, false);
window.addEventListener( 'click', onMouseClick, false );
