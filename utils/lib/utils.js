Utils = {};

Utils.eventQue = {};

Utils.events = function(obj){
  for (var prop in obj ) {
    Utils.eventQue[prop] = obj[prop];
  }
};

Utils.handleCollisions = function() {
  SceneManager.getLookAtCollisions().forEach( function(mesh) {
    var fn = Utils.eventQue['lookAt .' + mesh.object.name];
    if(typeof(fn) === 'function'){
      fn(mesh.object);
    }
  });
};

Utils.handleAnimations = function() {
  Utils.animations.forEach(function(animation, i, animations){
    animation.applyAnimation.callback(animation.applyAnimation.opts, animation);
    if(!animation.isAnimating){
      console.log(typeof(animation.callback));
      if(typeof(animation.callback) === 'function'){
        animation.callback(animation.mesh);
      }
      animations.splice(i, 1);
    }
  });
};

Utils.uniforms = [];

Utils.update = function(){
  Utils.handleCollisions();
  Utils.handleAnimations();
};




function changePanos(mesh) {
  var targetPano = Places.findOne({}).panos[mesh.pointer];

  if(compareIncompleteUrls(targetPano.imagePath, Utils.material.map.image.src) || Utils.material.map.isLoading){
    return false;
  }

  return handlePanoChange(mesh.pointer, targetPano.imagePath);
}

function handlePanoChange(pointer, imagePath){
  Utils.material.map.isLoading = true;
  SceneManager.activePano = pointer;
  Utils.changeScene();
  Utils.material.map.image.src = imagePath;
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
  return true;
}
