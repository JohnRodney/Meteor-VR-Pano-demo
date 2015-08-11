document.addEventListener( 'drop', function ( event ) {
  event.preventDefault();

  var reader = new FileReader();
  reader.addEventListener( 'load', function ( event ) {
    material.map.image.src = event.target.result;
    material.map.needsUpdate = true;
  }, false );

  reader.readAsDataURL( event.dataTransfer.files[ 0 ] );
  document.body.style.opacity = 1;

}, false );

document.addEventListener( 'dragover', function ( event ) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}, false );
