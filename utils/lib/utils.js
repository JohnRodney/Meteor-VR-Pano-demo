Utils = {};

Utils.handleCollisions = function(callback, name) {
  SceneManager.getLookAtCollisions().forEach( function(mesh) {
    if (mesh.object.name === name && !mesh.object.isAnimating) {
      callback(mesh.object);
    }
  });
};

Utils.handleAnimations = function() {
  Utils.animations.forEach(function(animation, i, animations){
    animation.applyAnimation.callback(animation.applyAnimation.opts, animation);
    if(!animation.isAnimating){
      animations.splice(i, 1);
    }
  });
};

Utils.uniforms = [];

Utils.update = function(){
  Utils.handleCollisions(changePanos, 'waypoint');
  Utils.handleAnimations();
  Utils.uniforms.forEach(function(mesh){
    mesh.material.uniforms['time'].value = .00025 * ( Date.now() - SceneManager.start );
    mesh.rotation.x += 0.01;
  });
};

function changePanos(mesh) {
  var targetPano = Places.findOne({}).panos[mesh.pointer];

  if(compareIncompleteUrls(targetPano.imagePath, Utils.material.map.image.src) || Utils.material.map.isLoading){
    return false;
  }

  SceneManager.activePano = mesh.pointer;
  Utils.changeScene();
  Utils.material.map.image.src = targetPano.imagePath;
  // Set Transition start event right here
  setOnLoadCallback();

  return true;
}

function compareIncompleteUrls(incomplete, complete) {
  return window.location.origin + '/' + incomplete === complete;
}

function setOnLoadCallback() {
  Utils.material.map.isLoading = true;

  Utils.material.map.image.addEventListener( 'load', function ( event ) {
    Utils.material.map.needsUpdate = true;
    Utils.material.map.isLoading = false;
  }, false );
}
