function loadAllImages() {
  SceneManager.panos.forEach((pano) => {
    pano.image = new Image();
    pano.image.src = pano.imagePath;
    pano.image.addEventListener('load', () => {
      console.log('loaded');
    }, false);
  });
}

function getWayPoints(index) {
  return SceneManager.panos[index].waypoints.map((waypoint) => {
    return new Waypoint({
      pointer: waypoint.index,
      position: {
        x: waypoint.position.x,
        y: waypoint.position.y,
        z: waypoint.position.z,
      },
    });
  });
}

function deleteAllWaypointsInScene() {
  SceneManager.scene.children.filter((child) => {
    if (child.name === 'waypoint') { return child; }
  })
  .map((res) => { SceneManager.scene.remove(res); });
}

function addNewWayPointsToScene() {
  SceneManager.addMultiple(getWayPoints(SceneManager.activePano));
}

function animateAndInitUtils() {
  Utils.animate([SceneManager, Utils]);

  Utils.changeScene = function change() {
    deleteAllWaypointsInScene();
    addNewWayPointsToScene();
  };
}

function addMeshesToScene() {
  SceneManager.addMultiple([
    Utils.panoFactory(SceneManager.panos[SceneManager.activePano].imagePath, 'pano'),
  ].concat(getWayPoints(SceneManager.activePano)));
}

function setupPanoSceneInfo() {
  SceneManager.panos = Places.findOne({}).panos;
  SceneManager.activePano = 0;
  loadAllImages();
}

function init() {
  SceneManager.init();
  setupPanoSceneInfo();
  addMeshesToScene();
  animateAndInitUtils();
}

function loadWrapper() {
  if (Places.find().count() === 0) {
    setTimeout(loadWrapper, 500);
  } else {
    init();
  }
}

Utils.events({
  'lookAt .waypoint'(mesh) {
    Utils.changePanos(mesh);
  },
});

Template.scene.onRendered(function renderScene() {
  loadWrapper();
});
