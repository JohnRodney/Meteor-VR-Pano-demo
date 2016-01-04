Meteor.startup(function() {
  if(Places.find().count() === 0){
    Places.insert({
      panos: [
        panoFactory([waypointFactory(2, -10, 0, -40), waypointFactory(1, 0, 0, 50)], 'lobby.jpeg'),
        panoFactory([waypointFactory(0, 50, 0, -20)], 'poolday.jpeg'),
        panoFactory([waypointFactory(0, -50, 0, 10)], 'courtyard.jpeg')
      ],
    });
  }
});

function panoFactory(waypoints, image) {
  return {
    waypoints: waypoints,
    imagePath: image,
  };
}

function waypointFactory(i, x, y, z) {
  return {
    index: i,
    position: {
      x: x,
      y: y,
      z: z,
    }
  };
}
