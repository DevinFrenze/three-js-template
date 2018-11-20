import 'shaders/CopyShader';
import 'postprocessing/EffectComposer';
import 'postprocessing/RenderPass';

/*
 * initializes this.renderer this.composer
 * exposes addToRenderChain function 
 * listens to window resize event and updates aspect ratio and size accordingly
 */
export default class RenderChain {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.initRenderer();
    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
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

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.composer.setSize( window.innerWidth, window.innerHeight );
  }
}
