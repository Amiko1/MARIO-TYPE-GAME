import Phaser from 'phaser';
import collidable from '../../mixins/collidable'

class Enemy extends Phaser.Physics.Arcade.Sprite {
  gravity = 500;
  playerSpeed = 150;

  rayGraphics;
  platformsCollidersLayer;
  speed = 50;
  timeFromLastTurn = 0;
  changeLine = false;
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.config = scene.config;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    Object.assign(this, collidable);
    this.init();
    this.initEvents();
    this.rayGraphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });

  }

  init(): void {

    this.setGravityY(this.gravity);
    this.setSize(this.width, 45);
    this.setOffset(0, 20);
    this.setVelocityX(this.speed);
    this.platformsCollidersLayer = null;
    // this.setCollideWorldBounds(true);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
  }

  initEvents(): void {
    this.scene.events.on('update', this.update, this);
  }

  update(time, delta) {


    const { ray, hasHit } = this.raycast(this, this.body, this.platformsCollidersLayer, 30, 1);

    if (!hasHit && this.timeFromLastTurn + 100 < time) {
      this.setFlipX(!this.flipX);
      this.setVelocityX(this.speed = -this.speed);
      this.changeLine = !this.changeLine;
      this.timeFromLastTurn = time;

    }

    if (this.config.debug) {
      this.rayGraphics.clear();
      this.rayGraphics.strokeLineShape(ray);
    }

  }
  setPlatformColliders(platformsCollidersLayer) {
    this.platformsCollidersLayer = platformsCollidersLayer;
  }


}

export default Enemy;