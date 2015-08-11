window.onload = function(){

  //Setup three.js WebGL renderer
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);

  // Append the canvas element created by the renderer to document body element.
  document.body.appendChild(renderer.domElement);

  // Create a three.js scene.
  var scene = new THREE.Scene();

  // Create a three.js camera.
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 10000);

  // Apply VR headset positional data to camera.
  var controls = new THREE.VRControls(camera);

  // Apply VR stereo rendering to renderer.
  var effect = new THREE.VREffect(renderer);
  effect.setSize(window.innerWidth, window.innerHeight);

  // Create a VR manager helper to enter and exit VR mode.
  var manager = new WebVRManager(renderer, effect, {hideButton: false});

  // Create 3D objects.
  var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  var material = new THREE.MeshNormalMaterial();
  var cube = new THREE.Mesh(geometry, material);

  // Position cube mesh
  cube.position.z = -1;

  // Add cube mesh to your three.js scene
  scene.add(cube);

  geometry = new THREE.SphereGeometry( 500, 60, 40 );
  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

  material = new THREE.MeshBasicMaterial( {
    map: THREE.ImageUtils.loadTexture( 'DantesView.jpg' )
  } );

  mesh = new THREE.Mesh( geometry, material );

  scene.add( mesh );

  // Request animation frame loop function
  function animate() {
    // Apply rotation to cube mesh
    cube.rotation.y += 0.01;

    // Update VR headset position and apply to camera.
    controls.update();

    // Render the scene through the manager.
    manager.render(scene, camera);

    requestAnimationFrame(animate);
  }

  // Kick off animation loop
  animate();

  // Reset the position sensor when 'z' pressed.
  function onKey(event) {
    if (event.keyCode == 90) { // z
      controls.resetSensor();
    }
  };

  window.addEventListener('keydown', onKey, true);

  // Handle window resizes
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    effect.setSize( window.innerWidth, window.innerHeight );
  }

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

  document.addEventListener( 'dragenter', function ( event ) {

    document.body.style.opacity = 0.5;

  }, false );

  document.addEventListener( 'dragleave', function ( event ) {

    document.body.style.opacity = 1;

  }, false );

  window.addEventListener('resize', onWindowResize, false);
}

