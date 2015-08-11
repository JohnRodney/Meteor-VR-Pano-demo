Template.scene.rendered = function(){

  SceneManager.init();
  SceneManager.addMultiple( [Utils.panoFactory( 'DantesView.jpg' , 'pano') , Utils.sphereFactory( 'target' )] );
  Utils.animate( SceneManager );

};
