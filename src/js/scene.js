const scene = new THREE.Scene();

export const icoMaterial = new THREE.MeshBasicMaterial({ wireframe: false });
const icoGeometry = new THREE.IcosahedronGeometry(100, 0);
const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
scene.add(icoMesh);

const wireMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: "#000000"
});
const icoMeshWire = new THREE.Mesh(icoGeometry, wireMaterial);
scene.add(icoMeshWire);

export default scene;
