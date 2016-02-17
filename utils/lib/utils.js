function setOnLoadCallback() {
  Utils.material.map.image.addEventListener('load', () => {
    Utils.material.map.needsUpdate = true;
    Utils.material.map.isLoading = false;
  }, false);
  return true;
}

function handlePanoChange(pointer, imagePath) {
  Utils.material.map.isLoading = true;
  SceneManager.activePano = pointer;
  Utils.changeScene();
  Utils.material.map.image.src = imagePath;
  return setOnLoadCallback();
}

function compareIncompleteUrls(incomplete, complete) {
  return window.location.origin + '/' + incomplete === complete;
}

Utils = {};

Utils.eventQue = {};

Utils.events = (obj) => {
  for (const prop in obj) {
    if ({}.hasOwnProperty.call(obj, prop)) {
      Utils.eventQue[prop] = obj[prop];
    }
  }
};

Utils.handleCollisions = () => {
  SceneManager.getLookAtCollisions().forEach((mesh) => {
    const fn = Utils.eventQue['lookAt .' + mesh.object.name];
    if (typeof(fn) === 'function') {
      fn(mesh.object);
    }
  });
};

Utils.handleAnimations = () => {
  Utils.animations.forEach((animation, i, animations) => {
    animation.applyAnimation.callback(animation.applyAnimation.opts, animation);
    if (!animation.isAnimating) {
      if (typeof(animation.callback) === 'function') {
        animation.callback(animation.mesh);
      }
      animations.splice(i, 1);
    }
  });
};

Utils.uniforms = [];

Utils.update = () => {
  Utils.handleCollisions();
  Utils.handleAnimations();
};

Utils.changePanos = (mesh) => {
  const targetPano = Places.findOne({}).panos[mesh.pointer];

  if (compareIncompleteUrls(targetPano.imagePath, Utils.material.map.image.src) || Utils.material.map.isLoading) {
    return false;
  }

  return handlePanoChange(mesh.pointer, targetPano.imagePath);
};
