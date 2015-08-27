document.addEventListener( 'drop', function ( event ) {
  event.preventDefault();

  var reader = new FileReader();

  registerLoadCallback(reader);
  reader.readAsDataURL( event.dataTransfer.files[ 0 ] );
  document.body.style.opacity = 1;

}, false );

document.addEventListener( 'dragover', function ( event ) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}, false );

function registerLoadCallback(reader) {
  reader.addEventListener( 'load', function ( event ) {
    Utils.material.map.image.src = event.target.result;
    Utils.material.map.needsUpdate = true;
  }, false );
}
