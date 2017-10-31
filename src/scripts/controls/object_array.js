export default class ObjectArray extends THREE.Object3D {
  constructor(
      abstractApplication,
      copies = 7,
      radius = 100,
      angle = Math.PI * 2,
      amplitude = 0,
      frequency = 1,
      rateOfChange = 1 // TODO rate of change
  ) {
    super();

    this.copies = copies;
    this.radius = radius;
    this.angle = angle;
    this.amplitude = amplitude;
    this.frequency = frequency;

    this.initChildren(abstractApplication);
    this._updateChild = this.updateChild.bind(this);
    abstractApplication.addToScene(this);
    abstractApplication.subscribeToUpdate(this);
  }

  initChildren() {
    let geometry = new THREE.BoxGeometry(10,10,100);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let cube = new THREE.Mesh(geometry, material);

    for( let i = 0; i < this.copies; i++) {
      let clone = cube.clone();
      this.add(clone);
    }
  }

  update() {
    this.children.map(this._updateChild);
  }

  updateChild(object, index) {
    const proportion = index / this.copies;
    const angle = proportion * this.angle;

    const zAxis = new THREE.Vector3(0,0,1);
    object.setRotationFromAxisAngle( zAxis, angle);

    let position = new THREE.Vector2(this.radius, 0);
    let zPosition = this.amplitude * Math.cos(this.frequency * proportion * 2 * Math.PI); 
    const center = new THREE.Vector2(0,0);

    position.rotateAround( center, angle);
    object.position.set(position.x, position.y, zPosition);
  }
}
