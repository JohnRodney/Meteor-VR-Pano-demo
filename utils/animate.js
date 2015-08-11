Utils.animate = function(SM) {

  SM.controls.update();
  SM.manager.render(SceneManager.scene, SceneManager.camera);
  requestAnimationFrame( function() { this.animate( SM ); }.bind(this) );

};
