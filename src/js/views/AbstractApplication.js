import initDevTools from 'js/views/initDevTools';
import ResponsiveRenderChain from 'js/views/ResponsiveRenderChain';

/*
 * initializes dev tools if needed
 * implements boilerplate animation loop with update function
 * provides method for components to subscribe to being updated each frame
 *
 * inherits composer, renderer, addToRenderChain, camera, scene, and addToScene
 * from its parents
 */
export default class AbstractApplication extends ResponsiveRenderChain {
  constructor(dev = true){
    super();
    this.clock = new THREE.Clock();
    this.componentsToUpdate = [];
    this._animate = this.animate.bind(this);
    if (dev) initDevTools(this);
  }

  animate(timestamp) {
    requestAnimationFrame( this._animate );
    this.update();

    if (this.composer) {
      this.composer.render(); // render with post processing
    } else {
      this.renderer.render(this.scene, this.camera); // default render
    }
  }

  subscribeToUpdate(component) {
    this.componentsToUpdate.push(component);
  }

  update() {
    this.delta = this.clock.getDelta();
    this.componentsToUpdate.forEach((component) => component.update(this.delta));
  }
}
