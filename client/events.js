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

}

window.addEventListener('keydown', onKey, true);
window.addEventListener('resize', onWindowResize, false);
//window.addEventListener( 'click', onMouseClick, false );
