import Phaser from 'phaser';
import collidable from "../../mixins/collidable"

class Enemies extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);
    Object.assign(this, collidable);
  }

}

export default Enemies;