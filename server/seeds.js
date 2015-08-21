Meteor.startup(function(){
  if(Places.find().count() === 0){
    Places.insert({
      panos: [{
        waypoints: [{
          index: 1,
          position: {
            x: 10,
            y: 0,
            z: -10,
          }
        }],
        imagePath: 'VJ2.jpg',
      }, {
        waypoints: [{
          index: 0,
          position: {
            x: 30,
            y: 0,
            z: 30,
          }
        }],
        imagePath: 'VJ1.jpg',
      }],
    });
  }
});


