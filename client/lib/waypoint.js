Waypoint = function Waypoint(geometry, material,payload) {

	this.mesh = new THREE.Mesh( geometry, material );
	this.mesh.name = 'waypoint';
	this.payload = payload;

	return this.mesh;
}
