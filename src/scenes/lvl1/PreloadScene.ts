import Phaser from 'phaser';

type Asset = String[][];
const background: Asset = [
  ['sky', '/assets/lvl1/background/png/sky.png'],
  ['clouds', '/assets/lvl1/background/png/clouds.png'],
  ['column', '/assets/lvl1/background/png/column.png'],
  ['grass1', '/assets/lvl1/background/png/grass1.png'],
  ['grass2', '/assets/lvl1/background/png/grass2.png'],
  ['ground', '/assets/lvl1/background/png/ground.png'],
  ['hills', '/assets/lvl1/background/png/hills.png'],
  ['mountains1', '/assets/lvl1/background/png/mountains1.png'],
  ['mountains2', '/assets/lvl1/background/png/mountains2.png'],
  ['mountains3', '/assets/lvl1/background/png/mountains3.png'],
  ['rock1', '/assets/lvl1/background/png/rock1.png'],
  ['rock2', '/assets/lvl1/background/png/rock2.png'],
  ['rock3', '/assets/lvl1/background/png/rock3.png'],
  ['tree1', '/assets/lvl1/background/png/tree1.png'],
  ['tree2', '/assets/lvl1/background/png/tree2.png'],
];

class PreloadScene extends Phaser.Scene {
  // player: Phaser.GameObjects.Sprite;
  constructor() {
    super({
      key: 'PreloadScene',
    });
  }

  preload() {
    this.loadBackground();
    this.loadTiledMapLvl1();

    this.load.spritesheet('player', 'assets/lvl1/player/move_sprite_1.png', {
      frameWidth: 28,
      frameHeight: 38,
      spacing: 36,
    });
  }

  create() {
    this.scene.start('PlayScene');
  }

  loadTiledMapLvl1() {
    this.load.tilemapTiledJSON('map', 'assets/lvl1/tileMap.json');
    this.load.image(
      'floor',
      'assets/lvl1/platforms/morning_adventures_tileset_16x16.png'
    );
  }

  loadBackground() {
    background.forEach((gameObject) => {
      this.load.image(gameObject[0], gameObject[1]);
    });
  }
}

export default PreloadScene;
