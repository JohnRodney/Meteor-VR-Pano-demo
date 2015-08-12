Template.scene.rendered = function(){

  SceneManager.init();
  SceneManager.addMultiple(
    [ Utils.panoFactory( '40000.jpg' , 'pano' ),
      Utils.sphereFactory( 'target', new THREE.Vector3(-50, 0, -4) )]);

  Utils.animate( SceneManager );

};
