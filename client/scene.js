/* Waypoint should take an object; For now payload and position must be specified. We can also extend this by
 * merely adding new config options and implementing in Waypoint
 * * */
var waypoint1 = new Waypoint({
  payload: '10000.jpg',
  position: {
    x: -50,
    y: 0,
    z:-10
  }
});


Template.scene.onRendered (function() {
  var pano = Places.findOne({}).panos[0];
  var pano1 = Places.findOne({}).panos[1];

  SceneManager.init();
  SceneManager.addMultiple([ Utils.panoFactory( '40000.jpg' , 'pano' ),
    new Waypoint({
      pointer: pano.waypoints[0].index,
      position: {
        x: pano.waypoints[0].position.x,
        y: pano.waypoints[0].position.y,
        z: pano.waypoints[0].position.z
      }}
    ), new Waypoint({
      pointer: pano1.waypoints[0].index,
      position: {
        x: pano1.waypoints[0].position.x,
        y: pano1.waypoints[0].position.y,
        z: pano1.waypoints[0].position.z
      }}
    ),
  ]);

  Utils.animate( [SceneManager, Utils] );
});


