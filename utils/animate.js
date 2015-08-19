Utils.handleCollisions = function() {
SceneManager.raycaster.set(SceneManager.camera.position,
  new THREE.Vector3(0,0,-1).applyQuaternion( SceneManager.camera.quaternion));
var intersects = SceneManager.raycaster.intersectObjects( SceneManager.scene.children );

  for ( var i = 0; i < intersects.length; i++ ) {

    waypoint = intersects[ i ].object;
    if (waypoint.name == 'waypoint') {
        console.log('Watcha looking at!');

      
    }
  
  }

}
Utils.animate = function(SM) {

    SM.controls.update();
    SM.manager.render(SceneManager.scene, SceneManager.camera);
    Utils.handleCollisions();
    requestAnimationFrame(function() {
        this.animate(SM);
    }.bind(this));


};