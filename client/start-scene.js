Template.scene.rendered = function(){
  SceneManager.init();
  SceneManager.scene.add( Utils.panoFactory() );
  Utils.animate(SceneManager);
};
