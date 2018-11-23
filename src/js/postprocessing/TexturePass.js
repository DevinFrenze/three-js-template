/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.TexturePass = function ( map, opacity, scale ) {

  THREE.Pass.call( this );

  if ( THREE.CopyShader === undefined )
    console.error( "THREE.TexturePass relies on THREE.CopyShader" );

  var shader = THREE.CopyShader;

  this.map = map;
  this.opacity = ( opacity !== undefined ) ? opacity : 1.0;
  this.scale = ( scale !== undefined ) ? scale : 1.0;

  this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

  this.material = new THREE.ShaderMaterial( {

    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader,
    depthTest: false,
    depthWrite: false

  } );

  this.needsSwap = false;

  this.camera = new THREE.OrthographicCamera( - scale, scale, scale, - scale, 0, scale );
  this.scene  = new THREE.Scene();

  const plane = new THREE.PlaneBufferGeometry( 2, 2 );
  plane.attributes.uv = new THREE.BufferAttribute(new Float32Array([0.1, 0.9, 0.9, 0.9, 0.1, 0.1, 0.9, 0.1]), 2);
  this.quad = new THREE.Mesh( plane, null );
  this.quad.frustumCulled = false; // Avoid getting clipped
  this.scene.add( this.quad );

};

THREE.TexturePass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {

  constructor: THREE.TexturePass,

  render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

    var oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;

    this.quad.material = this.material;

    this.uniforms[ "opacity" ].value = this.opacity;
    this.uniforms[ "tDiffuse" ].value = this.map;
    this.material.transparent = ( this.opacity < 1.0 );

    renderer.render( this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear );

    renderer.autoClear = oldAutoClear;
  }

} );
