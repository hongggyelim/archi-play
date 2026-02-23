import * as THREE from "three";

export class WorldMap {
  scene: THREE.Scene;
  gridWidth: number = 10; // Number of tiles in width
  gridHeight: number = 10; // Number of tiles in height
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
  textures: Record<number, THREE.Texture> = {};
  mapData: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 2, 2, 1, 0, 1, 0],
    [0, 1, 0, 1, 2, 2, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  loader = new THREE.TextureLoader();

  constructor(scene: THREE.Scene, width: number, height: number) {
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.tileWidth = this.width / this.gridWidth;
    this.tileHeight = this.height / this.gridHeight;
    this.init();
  }

  init() {
    this.loadTextures();

    for (let y = 0; y < this.gridHeight; y++) {
      for (let x = 0; x < this.gridWidth; x++) {
        const tileType = this.mapData[y][x];
        if (this.textures[tileType] === undefined) continue; // 텍스처가 로드되지 않은 경우 건너뜀

        const texture = this.textures[tileType];

        const geometry = new THREE.PlaneGeometry(
          this.tileWidth,
          this.tileHeight
        );
        geometry.rotateX(-Math.PI / 2);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
        });
        const tile = new THREE.Mesh(geometry, material);

        const xOffset = this.tileWidth / 2;
        const zOffset = this.tileHeight / 2;

        // 브라우저 (0,0) 좌표는 왼쪽 상단이지만 threejs x-z평면에서는 화면 아래로 갈수록 z 음수
        // tile.position.set(
        //   x * this.tileWidth + xOffset,
        //   0,
        //   -(y * this.tileHeight) - zOffset
        // );

        tile.position.set(
          x * this.tileWidth - this.width / 2 + this.tileWidth / 2,
          0,
          -(y * this.tileHeight - this.height / 2 + this.tileHeight / 2)
        );
        this.scene.add(tile);
      }
    }
  }

  loadTextures() {
    if (this.loader === undefined) {
      console.log("TextureLoader is not available");
      return;
    }
    this.textures[0] = this.loader.load("/tile/tile_0000.png");
    this.textures[1] = this.loader.load("/tile/tile_0001.png");
    this.textures[2] = this.loader.load("/tile/tile_0002.png");

    Object.values(this.textures).forEach((t) => {
      t.magFilter = THREE.NearestFilter;
      t.minFilter = THREE.NearestFilter;
      t.generateMipmaps = false;
    });
  }
  update() {
    // 애니메이션이나 상호작용이 필요한 경우 여기에 로직 추가
  }
}
