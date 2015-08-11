// Reset the position sensor when 'z' pressed.
function onKey(event) {
  if (event.keyCode == 90) { // z
    SceneManager.controls.resetSensor();
  }
}

window.addEventListener('keydown', onKey, true);

// Handle window resizes
function onWindowResize() {
  SceneManager.camera.aspect = window.innerWidth / window.innerHeight;
  SceneManager.camera.updateProjectionMatrix();

  SceneManager.effect.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', onWindowResize, false);
