import Scene from 'js/views/Scene';
import 'shaders/CopyShader';
import 'postprocessing/EffectComposer';
import 'postprocessing/RenderPass';
import 'postprocessing/MaskPass';
import 'postprocessing/ShaderPass';

/*
 * initializes this.renderer this.composer
 * exposes addToRenderChain function 
 */
export default class RenderChain extends Scene {
  constructor() {
    super();
    this.initRenderer();
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  }

  initComposer() {
    this.composer = new THREE.EffectComposer( this.renderer );
    const renderPass = new THREE.RenderPass( this.scene, this.camera ); 
    renderPass.renderToScreen = true;
    this.composer.addPass(renderPass);
  }

  addToRenderChain(pass) {
    if (!this.composer) this.initComposer();

    this.composer.passes.forEach(function(pass) { pass.renderToScreen = false; });
    pass.renderToScreen = true;
    this.composer.addPass( pass );
  }
}
