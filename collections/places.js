var PositionSchema = new SimpleSchema({
  x: {
    type: Number,
  },
  y: {
    type: Number,
  },
  z: {
    type: Number,
  }
});

var WaypointSchema = new SimpleSchema({
  index: {
    type: Number,
  },
  position: {
    type: PositionSchema,
  }
});

var PanoSchemea = new SimpleSchema({
  waypoints: {
    type: [WaypointSchema],
  },
  imagePath: {
    type: 'string',
  }
});

var PlaceSchema = new SimpleSchema({
  panos: {
    type: [PanoSchemea],
  },
});

Places = new Mongo.Collection('places');
Places.attachSchema(PlaceSchema);

