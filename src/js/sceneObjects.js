export const icoMaterial = new THREE.MeshBasicMaterial({ wireframe: false });
const icoGeometry = new THREE.IcosahedronGeometry(100, 0);
export const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);

const wireMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: "#000000"
});
export const icoMeshWire = new THREE.Mesh(icoGeometry, wireMaterial);

/*
 * keep adding more objects
 */
