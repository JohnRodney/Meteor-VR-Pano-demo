Meteor.startup(function(){
  if(Places.find().count() === 0){
    Places.insert({
      panos: [
        panoFactory([waypointFactory(1, -25, 0, -10)], 'VJ2.jpg'),
        panoFactory([waypointFactory(0, -35, 0, 0), waypointFactory(2, 35, 0, 0)], 'VJ1.jpg'),
        panoFactory([waypointFactory(1, 3, 0, 35)], 'VJ3.jpg')
      ],
    });
  }
});

function panoFactory(waypoints, image){
  return {
    waypoints: waypoints,
    imagePath: image,
  };
}

function waypointFactory(i, x, y, z){
  return {
    index: i,
    position: {
      x: x,
      y: y,
      z: z,
    }
  };
}
