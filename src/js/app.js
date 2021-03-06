import AbstractApplication from 'js/utils/AbstractApplication';
import 'utils/GeometryUtils';
import 'postprocessing/ShaderPass';
import MouseFromCenterRotation from 'js/controls/MouseFromCenterRotation';

import 'shaders/RGBShiftShader';
import 'shaders/DotScreenShader';
import 'shaders/BasicShader';
import scene, { icoMaterial } from './scene';
import camera from './camera';
import * as ui from './ui';

const RGB_SHIFT_MAX = 0.004;

export default class App extends AbstractApplication {
  constructor(dev){
    super(scene, camera, dev, false);

    this.initNavigation();
    this.initPostProcessing();
    this.animate();
  }
  
  initNavigation() {
    const controls = new MouseFromCenterRotation(this);
  }

  initPostProcessing() {
    this.rgbShift = new THREE.ShaderPass( THREE.RGBShiftShader );
    this.addToRenderChain( this.rgbShift );
  }

  update() {
    super.update();

    const now = Date.now();
    icoMaterial.color = ui.icoColor._color;
    this.rgbShift.uniforms['amount'].value = Math.sin(now / 19000) * RGB_SHIFT_MAX;
    this.rgbShift.uniforms['angle'].value = Math.sin(now / 10000);
  }
}
