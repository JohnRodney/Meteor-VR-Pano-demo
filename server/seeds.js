Meteor.startup(function(){
  if(Places.find().count() === 0){
    Places.insert({
      panos: [{
        waypoints: [{
          index: 1,
          position: {
            x: -25,
            y: 0,
            z: -10,
          }
        }],
        imagePath: 'VJ2.jpg',
      }, {
        waypoints: [{
          index: 0,
          position: {
            x: -35,
            y: 0,
            z: 0,
          }
        }, {
          index: 2,
          position: {
            x: 35,
            y: 0,
            z: 0,
          }
        }],
        imagePath: 'VJ1.jpg',
      }, {
        waypoints: [{
          index: 1,
          position: {
            x: 3,
            y: 0,
            z: 35,
          }
        }],
        imagePath: 'VJ3.jpg',
      }
      ],
    });
  }
});


