import initDevTools from 'js/utils/initDevTools';
import RenderChain from 'js/utils/RenderChain';

/*
 * initializes dev tools if needed
 * implements boilerplate animation loop with update function
 * provides method for components to subscribe to being updated each frame
 *
 * inherits composer, renderer, and addToRenderChain
 * from its parents
 */
export default class AbstractApplication extends RenderChain {
  constructor(scene, camera, dev = true, videoFeedback){
    super(scene, camera, videoFeedback);
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
