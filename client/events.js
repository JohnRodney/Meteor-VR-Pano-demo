// Reset the position sensor when 'z' pressed.
function onKey(event) {
  if (event.keyCode == 90) { // z
    SceneManager.controls.resetSensor();
  }
}

// Handle window resizes
function onWindowResize() {
  SceneManager.camera.aspect = window.innerWidth / window.innerHeight;
  SceneManager.camera.updateProjectionMatrix();

  SceneManager.effect.setSize( window.innerWidth, window.innerHeight );
}

// Handle mouse click
function onMouseClick(event) {

	SceneManager.mouse.x = (event.clientX / window.innerWidth ) * 2 - 1;
	SceneManager.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	var waypoint = undefined; //intialize var to hold waypoint; we'll use it to hold our instance

	SceneManager.raycaster.setFromCamera( SceneManager.mouse, SceneManager.camera );
	var intersects = SceneManager.raycaster.intersectObjects( SceneManager.scene.children );

	for ( var i = 0; i < intersects.length; i++ ) {

		waypoint = intersects[ i ].object;
		if (waypoint.name == 'waypoint') {

			Utils.material.map.image.src = waypoint.payload;
			Utils.material.map.needsUpdate = true;
			$('canvas').velocity({
				    opacity: 1,
				    tween: 15 // Optional
				},
				{
				duration: 1500,
				easing: 'easeInSine',
				progress: function(elements, complete, remaining, start, tweenValue) {
					SceneManager.camera.position.z =remaining;
				     console.log((complete * 100) + "%");
        			console.log(remaining + "ms remaining!");
        			console.log("The current tween value is " + tweenValue)
				}
			})

			

			
		}
	
	}
	


}



window.addEventListener('keydown', onKey, true);
window.addEventListener('resize', onWindowResize, false);
// SceneManager.controls.addEventListener('change', listen);
// window.addEventListener( 'click', onMouseClick, false );
