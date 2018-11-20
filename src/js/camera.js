const camera = new THREE.PerspectiveCamera(
  70,                                     // vertial field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  1,                                      // near plane
  10000                                   // far plane
);
camera.position.set( 0, 0, 400);
export default camera;
