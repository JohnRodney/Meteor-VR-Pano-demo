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
  SceneManager.init();
  SceneManager.addMultiple([ Utils.panoFactory( '40000.jpg' , 'pano' ), waypoint1]);
  Utils.animate( [SceneManager, Utils] );
});
