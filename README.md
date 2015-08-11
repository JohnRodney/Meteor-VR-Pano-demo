# Meteor-VR-Pano-demo

Drag and drop pano's from the public folder into the scene and you can see the viewer change.  Best viewed with occulus or remotely from cardboard for dragging.

# Objects

## SceneManager

Contains all objects needed for the rendering of a scene.

```
 .init()
 .camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 10000);
 .renderer = new THREE.WebGLRenderer({ antialias: true });
 .scene = new THREE.Scene();
 .light = new THREE.AmbientLight( 0xffffff );
 .controls = new THREE.VRControls(this.camera);
 .effect = new THREE.VREffect(this.renderer);
 .manager = new WebVRManager(this.renderer, this.effect, {hideButton: false});
```

## Utils

Contains utilities for building a scene

```
  .animate()  /* handles the animation loop */
  .panoFactory(image) /* takes a image path and returns a 3d sphere with the image as a texture */
```

## Usage in a template

Combine the SceneManager with utils in a template's rendered callback

```
Template.scene.rendered = function(){
  SceneManager.init();
  SceneManager.scene.add( Utils.panoFactory() );
  Utils.animate(SceneManager);
};
```
