import AbstractApplication from 'js/views/AbstractApplication';
import 'utils/GeometryUtils';
import MouseFromCenterRotation from 'js/controls/MouseFromCenterRotation';

import 'shaders/RGBShiftShader';
import * as sceneObjects from './sceneObjects';
import * as ui from './ui';

const RGB_SHIFT_MAX = 0.004;

export default class App extends AbstractApplication {
  constructor(dev = false){
    super(dev);

    this.initNavigation();
    this.initScene();
    this.initPostProcessing();
    this.animate();
  }
  
  initNavigation() {
    const controls = new MouseFromCenterRotation(this);
  }

  initScene() {
    this.addToScene(sceneObjects.icoMesh);
    this.addToScene(sceneObjects.icoMeshWire);
  }

  initPostProcessing() {
    this.rgbShift = new THREE.ShaderPass( THREE.RGBShiftShader );
    this.rgbShift.uniforms[ 'amount' ].value = 0.0015;
    this.addToRenderChain( this.rgbShift );
  }

  update() {
    super.update();

    const now = Date.now();
    sceneObjects.icoMaterial.color = ui.icoColor._color;
    this.rgbShift.uniforms['amount'].value = Math.sin(now / 19000) * RGB_SHIFT_MAX;
  }
}
