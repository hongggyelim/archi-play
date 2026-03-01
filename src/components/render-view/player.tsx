import * as THREE from "three";

export type Direction = "front" | "back" | "left" | "right";

export class Player {
  scene: THREE.Scene;
  mesh: THREE.Mesh | null = null;
  position = {
    gridX: 0,
    gridY: 0,
  };

  loader = new THREE.TextureLoader();
  textures: Record<Direction, THREE.Texture> = {} as Record<
    Direction,
    THREE.Texture
  >;
  size: number = 50;
  direction: Direction = "front";
  movement: number = this.size;
  speed: number = 0.6;

  constructor(
    scene: THREE.Scene,
    initX: number = 0,
    initY: number = 0,
    size: number = 50
  ) {
    this.scene = scene;
    this.position = {
      gridX: initX,
      gridY: initY,
    };
    this.size = size;
    this.init();
  }

  init() {
    this.loadTexture();

    const geometry = new THREE.PlaneGeometry(this.size, this.size);
    geometry.rotateX(-Math.PI / 2);

    const material = new THREE.MeshBasicMaterial({
      map: this.textures[this.direction],
      transparent: true,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(this.position.gridX, 1, -this.position.gridY);
    this.scene.add(this.mesh);
  }

  loadTexture() {
    if (this.loader === undefined) return;
    this.textures["front"] = this.loader.load("/player/front.png");
    this.textures["back"] = this.loader.load("/player/back.png");
    this.textures["left"] = this.loader.load("/player/left.png");
    this.textures["right"] = this.loader.load("/player/right.png");

    Object.values(this.textures).forEach((t) => {
      t.magFilter = THREE.NearestFilter;
      t.minFilter = THREE.NearestFilter;
      t.generateMipmaps = false;
    });
  }
  update() {
    if (!this.mesh) return;

    const pos = this.mesh.position;

    pos.x += (this.position.gridX - pos.x) * this.speed;
    pos.z += (-this.position.gridY - pos.z) * this.speed;
  }

  setTexture(dir: Direction) {
    if (!this.mesh) return;

    const material = this.mesh.material as THREE.MeshBasicMaterial;
    material.map = this.textures[dir];
    material.needsUpdate = true;
  }

  move(dx: number, dy: number) {
    const limit = 400 - this.size / 2;
    let dir = this.direction;
    if (dx === 0 && dy === 0) return;

    if (dx === 1) dir = "right";
    else if (dx === -1) dir = "left";
    else if (dy === 1) dir = "back";
    else if (dy === -1) dir = "front";
    if (dir !== this.direction) {
      this.direction = dir;
    }
    this.setTexture(this.direction);

    this.position.gridX = THREE.MathUtils.clamp(
      this.position.gridX + dx * this.movement,
      -limit,
      limit
    );

    this.position.gridY = THREE.MathUtils.clamp(
      this.position.gridY + dy * this.movement,
      -limit,
      limit
    );
  }
}
