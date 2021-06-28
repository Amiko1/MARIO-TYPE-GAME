import Phaser from 'phaser';
import collidable from '../mixins/collidable';
import Animations from './anims/playerAnims';
import { SharedConfig } from '../../main';

class Player extends Phaser.Physics.Arcade.Sprite {
  gravity = 500;
  playerSpeed = 150;
  cursors: Phaser.Input.Keyboard;
  playerZones;
  config: SharedConfig;
  hasBeenHit = false;
  bounceVelocity = 250;
  healthIndicator = 2;

  constructor(scene, playerZones, config) {
    super(scene, playerZones.start.x, playerZones.start.y, 'player');
    this.config = config;
    this.playerZones = playerZones;
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
    this.setSize(25, 38);
    this.setOffset(5, 0)
    Animations(this.scene.anims);
    this.setCollideWorldBounds(true);
  }

  initEvents(): void {
    this.scene.events.on('update', this.update, this);
  }

  update() {
    if (this.hasBeenHit) { return; }
    // const cam = this.scene.cameras.main;
    // const speed = 2;
    const { left, right, space } = this.cursors;
    const onFloor = this.body.onFloor();

    if (left.isDown) {
      // cam.scrollX -= speed;
      this.setFlipX(true);
      this.setVelocityX(-this.playerSpeed);
    } else if (right.isDown) {
      this.setFlipX(false);
      // cam.scrollX += speed;
      this.setVelocityX(this.playerSpeed);
    } else {
      this.setVelocityX(0);
    }

    if (space.isDown && onFloor) {
      this.setVelocityY(-this.playerSpeed * 2.0);
    }
    onFloor
      ? this.body.velocity.x !== 0
        ? this.play('run', true)
        : this.play('idle', true)
      : this.play('jump', true);

    this.playerRespawn(this.playerZones);

  }

  playerRespawn({ start, end, firstRespawn, secondRespawn }) {
    let heightChecker = this.y > this.config.height;
    if (this.x < firstRespawn.x && heightChecker) {
      this.x = start.x;
      this.y = start.y;
    } else if (this.x > firstRespawn.x && this.x < secondRespawn.x && heightChecker) {

      this.x = firstRespawn.x;
      this.y = firstRespawn.y;
    } else if (this.x > secondRespawn.x && this.x < end.x && heightChecker) {

      this.x = secondRespawn.x;
      this.y = secondRespawn.y;
    }
  }

  playDamageTween() {
    return this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: -1,
      tint: 0xff25fff
    })
  }


  bounceOff() {
    this.body.touching.right ?
      this.setVelocityX(-this.bounceVelocity) :
      this.setVelocityX(this.bounceVelocity);

    setTimeout(() => this.setVelocityY(-this.bounceVelocity), 50);

  }

  takesHit(initiator) {
    if (this.hasBeenHit) { return; }
    let heatlhChildren = this.scene.health.getChildren();

    heatlhChildren[this.healthIndicator].setVisible(false);
    this.healthIndicator--;

    this.hasBeenHit = true;
    this.bounceOff();
    if (this.healthIndicator < -1) {
      this.scene.restart();
    }
    // this.playDamageTween();
    const hitAnim = this.playDamageTween();

    this.scene.time.delayedCall(1000, () => {
      this.hasBeenHit = false;
      hitAnim.stop();
      this.clearTint();
    })


  }

}

export default Player;
