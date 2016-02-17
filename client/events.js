function onKey(event) {
  if (event.keyCode === 90) { // z
    SceneManager.controls.resetSensor();
  }
}

function onWindowResize() {
  SceneManager.camera.aspect = window.innerWidth / window.innerHeight;
  SceneManager.camera.updateProjectionMatrix();
  SceneManager.effect.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('keydown', onKey, true);
window.addEventListener('resize', onWindowResize, false);
