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
  Utils.handleAnimations();
  requestAnimationFrame( function() { this.animate( SM ); }.bind(this) );

};


