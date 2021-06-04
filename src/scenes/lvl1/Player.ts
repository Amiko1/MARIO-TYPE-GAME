import Phaser from 'phaser';
import collidable from '../mixins/collidable';
import Animations from './playerAnims';

class Player extends Phaser.Physics.Arcade.Sprite {
  gravity = 500;
  playerSpeed = 150;
  cursors: Phaser.Input.Keyboard;

  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    Object.assign(this, collidable);
    this.init();
    this.initEvents();
  }

  init(): void {
    this.setGravityY(this.gravity);
    // this.setCollideWorldBounds(true);
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    Animations(this.scene.anims);
  }

  initEvents(): void {
    this.scene.events.on('update', this.update, this);
  }

  update() {
    const cam = this.scene.cameras.main;
    const speed = 2;
    const { left, right, space } = this.cursors;
    const onFloor = this.body.onFloor();

    if (left.isDown) {
      cam.scrollX -= speed;
      this.setFlipX(true);
      this.setVelocityX(-this.playerSpeed);
    } else if (right.isDown) {
      this.setFlipX(false);
      cam.scrollX += speed;
      this.setVelocityX(this.playerSpeed);
    } else {
      this.setVelocityX(0);
    }

    if (space.isDown && onFloor) {
      this.setVelocityY(-this.playerSpeed * 1.5);
    }
    onFloor
      ? this.body.velocity.x !== 0
        ? this.play('run', true)
        : this.play('idle', true)
      : this.play('jump', true);
  }
}

export default Player;
