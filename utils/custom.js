Utils.glassGeometry = glassGeometry;
Utils.glassMaterial = glassMaterial;

function glassGeometry(){
  var geometry = new THREE.DodecahedronGeometry( 2, 5 );
  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
  return geometry;
}

function glassMaterial(){
  return new THREE.ShaderMaterial( {
    uniforms: {
      time: { type: "f", value: 0.0},
      texture1: { type: 't', value: 0, texture: THREE.ImageUtils.loadTexture( 'water.jpg' ) },
    },
    attributes: {
      displacement: {type: "f", value: [] },
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    transparent: true
  });
}

