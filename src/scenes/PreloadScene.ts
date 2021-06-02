import phaser from "phaser";

type Asset = [string, string];
const assets = [["sky", "/assets/backgroundLvl1/png/sky.png"]];

class PreloadScene extends Phaser.Scene {
  // player: Phaser.GameObjects.Sprite;
  constructor() {
    super({
      key: "PreloadScene",
    });
  }

  preload() {
    this.loadBackground();

    // tiled map lvl1
    this.load.tilemapTiledJSON("map", "assets/lvl1.json");
    this.load.image(
      "floor",
      "assets/morning_adventures_tilemap/morning_adventures_tileset_16x16.png"
    );
  }

  create() {
    this.scene.start("PlayScene");
  }

  loadBackground() {
    // assets.forEach((gameObject) => {
    //   this.load.image(gameObject[0], gameObject[1]);
    // });

    this.load.image("sky", "/assets/backgroundLvl1/png/sky.png");
    this.load.image("clouds", "/assets/backgroundLvl1/png/clouds.png");
    this.load.image("column", "/assets/backgroundLvl1/png/column.png");
    this.load.image("grass1", "/assets/backgroundLvl1/png/grass1.png");
    this.load.image("grass2", "/assets/backgroundLvl1/png/grass2.png");
    this.load.image("ground", "/assets/backgroundLvl1/png/ground.png");
    this.load.image("hills", "/assets/backgroundLvl1/png/hills.png");
    this.load.image("mountains1", "/assets/backgroundLvl1/png/mountains1.png");
    this.load.image("mountains2", "/assets/backgroundLvl1/png/mountains2.png");
    this.load.image("mountains3", "/assets/backgroundLvl1/png/mountains3.png");
    this.load.image("rock1", "/assets/backgroundLvl1/png/rock1.png");
    this.load.image("rock2", "/assets/backgroundLvl1/png/rock2.png");
    this.load.image("rock3", "/assets/backgroundLvl1/png/rock3.png");
    this.load.image("tree1", "/assets/backgroundLvl1/png/tree1.png");
    this.load.image("tree2", "/assets/backgroundLvl1/png/tree2.png");
  }
}

export default PreloadScene;
