Meteor.startup(function(){
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
        imagePath: '20000.jpg',
      }],
    });
});


