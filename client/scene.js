Template.scene.rendered = function(){
  //Waypoint should take an object; For now payload and position must be specified. We can also extend this by
  // merely adding new config options and implementing in Waypoint
  var waypoint1 = new Waypoint({
    payload: 'OlympicHurricaneRidge.jpg',
    position: {
      x:0,
      y:0,
      z:-10
    }
  });

  SceneManager.init();
  SceneManager.addMultiple(
    [ Utils.panoFactory( '40000.jpg' , 'pano' ),
      waypoint1]);

  Utils.animate( SceneManager );

};
