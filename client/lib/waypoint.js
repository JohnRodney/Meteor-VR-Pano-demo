Waypoint = function Waypoint(config) {

  var geometry = new THREE.DodecahedronGeometry( 2, 5 );
  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

  var material = new THREE.ShaderMaterial( {
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


  this.mesh = new THREE.Mesh( geometry, material );
  this.mesh.name = 'waypoint';
  this.mesh.position = setPosition(this.mesh.position,config.position);
  this.mesh.pointer = config.pointer;

  Utils.uniforms.push(this.mesh);

  return this.mesh;
};

function setPosition(a, b) {
  a.x = b.x || 0;
  a.y = b.y || 0;
  a.z = b.z || 0;
  return a;
}
