import 'shaders/CopyShader';
import 'postprocessing/EffectComposer';
import 'postprocessing/ShaderPass';
import 'postprocessing/RenderPass';
import 'js/postprocessing/TexturePass';
import 'postprocessing/SavePass';
import 'postprocessing/ClearPass';
import 'shaders/BasicShader';

/*
 * initializes this.renderer this.composer
 * exposes addToRenderChain function 
 * listens to window resize event and updates aspect ratio and size accordingly
 */
export default class RenderChain {
  constructor(scene, camera, videoFeedback = false) {
    this.scene = scene;
    this.camera = camera;
    this.videoFeedback = videoFeedback;

    this.initRenderer();
    this.initComposer();
    if (this.videoFeedback) this.initVideoFeedback();

    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  }

  initComposer() {
    const clearPass = new THREE.ClearPass();

    const renderPass = new THREE.RenderPass( this.scene, this.camera ); 
    renderPass.clear = false;

    const effectCopy = new THREE.ShaderPass(THREE.CopyShader);
    effectCopy.renderToScreen = true;

    this.composer = new THREE.EffectComposer( this.renderer );
    this.composer.addPass(clearPass);
    this.composer.addPass(renderPass);
    this.composer.addPass(effectCopy);
  }

  initVideoFeedback() {
    const renderTargetParameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBFormat,
      stencilBuffer: false,
      wrapS: THREE.MirroredRepeatWrapping,
      wrapT: THREE.MirroredRepeatWrapping,
      repeat: { x: 2, y: 2 }
    };

    const renderTarget = new THREE.WebGLRenderTarget(
      2 * window.innerWidth,
      2 * window.innerHeight,
      this.renderTargetParameters,
    );

    const savePass = new THREE.SavePass(renderTarget);
    this.composer.addPass(savePass);

    const { texture } = renderTarget;
    const texturePass = new THREE.TexturePass(texture, 1, 1);
    this.composer.insertPass(texturePass, 1);
  }

  addToRenderChain(pass) {
    const { passes } = this.composer;
    let passOffset = 1;
    if (this.videoFeedback) passOffset = 2;
    this.composer.insertPass(pass, passes.length - passOffset);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.composer.setSize( window.innerWidth, window.innerHeight );
  }
}
