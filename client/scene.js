
Template.scene.onRendered (function() {
  loadWrapper();
});

function loadWrapper(){
  if(Places.find().count() === 0){
    setTimeout(wrapper, 500);
  } else {
    init();
  }
}

function getWayPoints(index){
  return SceneManager.panos[index].waypoints.map(function(waypoint){
    console.log('CREATED');
    return new Waypoint({
      pointer: waypoint.index,
      position: {
        x: waypoint.position.x,
        y: waypoint.position.y,
        z: waypoint.position.z
      }});
    });
}

function init(){

  SceneManager.init();

  place = Places.findOne({});
  SceneManager.panos = place.panos;
  SceneManager.activePano = 0;

  SceneManager.addMultiple([
    Utils.panoFactory( SceneManager.panos[SceneManager.activePano].imagePath , 'pano' )]
    .concat(getWayPoints(SceneManager.activePano)));

  Utils.animate( [SceneManager, Utils] );

  Utils.changeScene = function(){
    deleteAllWaypointsInScene();
    addNewWayPointsToScene();
  };
}

function deleteAllWaypointsInScene(){
  SceneManager.scene.children.filter( function(child){
    if(child.name === 'waypoint'){
      return child;
    }
  }).map(function (res){
    SceneManager.scene.remove(res);
  });
}

function addNewWayPointsToScene(){
  SceneManager.addMultiple(getWayPoints(SceneManager.activePano));
}
