const PositionSchema = new SimpleSchema({
  x: { type: Number },
  y: { type: Number },
  z: { type: Number },
});

const WaypointSchema = new SimpleSchema({
  index: { type: Number },
  position: { type: PositionSchema },
});

const PanoSchemea = new SimpleSchema({
  waypoints: { type: [WaypointSchema] },
  imagePath: { type: 'string' },
});

const PlaceSchema = new SimpleSchema({
  panos: { type: [PanoSchemea] },
});

Places = new Mongo.Collection('places');
Places.attachSchema(PlaceSchema);
