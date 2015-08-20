Utils.handleCollisions = function() {
  SceneManager.raycaster.set(SceneManager.camera.position,
    new THREE.Vector3(0,0,-1).applyQuaternion( SceneManager.camera.quaternion));

  var intersects = SceneManager.raycaster.intersectObjects( SceneManager.scene.children );

  for ( var i = 0; i < intersects.length; i++ ) {
    waypoint = intersects[ i ].object;
    if (waypoint.name == 'waypoint' && !waypoint.isAnimating) {
      Utils.transition({mesh: waypoint, type: 'move-x', opts: {stop: (Math.random()*50)-25}, duration: 3});
      Utils.transition({mesh: waypoint, type: 'move-y', opts: {stop: (Math.random()*50)-25}, duration: 3});
      Utils.transition({mesh: waypoint, type: 'move-z', opts: {stop: (Math.random()*50)-25}, duration: 3});
      waypoint.isAnimating = true;
    }
  }
};

Utils.handleAnimations = function() {
  Utils.animations.forEach(function(animation, i, animations){
    animation.apply.call(animation.apply.opts, animation);
    if(!animation.isAnimating){
      animations.splice(i, 1);
    }
  });
};

Utils.animate = function(SM) {

  SM.delta = SM.clock.getDelta();
  SM.controls.update();
  SM.manager.render(SceneManager.scene, SceneManager.camera);
  Utils.handleCollisions();
  Utils.handleAnimations();
  requestAnimationFrame( function() { this.animate( SM ); }.bind(this) );

};
