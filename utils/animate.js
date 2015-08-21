Utils.animate = function(objsToUpdate) {
  objsToUpdate.forEach( function( obj ) { obj.update(); } );
  requestAnimationFrame( function() { this.animate( objsToUpdate ); }.bind(this) );
};
