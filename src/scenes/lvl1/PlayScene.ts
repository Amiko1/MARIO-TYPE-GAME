import Phaser from 'phaser';
import { SharedConfig } from '../../main';
import Player from './Player'
import Birdman from './enemies/Birdman'
import Enemies from './groups/Enemies'


const creeateAligned = (
  scene: Phaser.Scene,
  heght: number,
  count: number,
  texture: string,
  scrollFactor: number,
  scale: number
): void => {
  let x = 0;

  for (let i = 0; i < count; ++i) {
    let layot = scene.add
      .image(x, heght, texture)
      .setScale(scale)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor);
    x += scene.config.width + 70;
  }
};

interface Props {
  config: SharedConfig;
}

export default class PlayScene extends Phaser.Scene {
  // player: Phaser.GameObjects.Sprite;
  config: SharedConfig;
  playingArea = 6000;
  plotting: boolean;
  health: Phaser.Physics.Arcade.Group;
  healthBar
  constructor(config) {
    super({
      key: 'PlayScene',
    });
    this.config = config;

  }

  preload() { }

  create() {
    this.background();
    this.cameras.main.setBounds(
      0,
      0,
      this.config.width * 10,
      this.config.height
    );



    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);
    const player = this.createPlayer(playerZones);
    const enemies = this.createEnemies(layers.enemySpawns, layers.platformsCollider);

    this.createHealthBar();
    this.playerCollider(player, layers.platformsCollider);
    this.enemyCollider(enemies, layers.platformsCollider, player, this.health)
    this.setupFollowUpCamera(player);

  }


  createMap() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset1 = map.addTilesetImage(
      'morning_adventures_tileset_16x16',
      'floor'
    );

    return { map, tileset1 };
  }

  createLayers(parameters) {
    const platformsCollider = parameters.map.createStaticLayer(
      'main',
      parameters.tileset1
    );
    const playerZones = parameters.map.getObjectLayer('player_zones').objects;
    const enemySpawns = parameters.map.getObjectLayer('enemy_spawns').objects;

    platformsCollider.setCollisionByExclusion(-1, true);

    return { platformsCollider, playerZones, enemySpawns };
  }

  createPlayer(playerZones): Phaser.Physics.Arcade.Sprite {
    return new Player(this, playerZones, this.config);
  }

  createEnemies(spawnLayers, platformsCollider) {
    const enemies = new Enemies(this);
    spawnLayers.map((spawnPoint, i) => {
      // if (i === 1 || i === 2) { return; }
      const enemy = new Birdman(this, spawnPoint.x, spawnPoint.y);
      enemy.setPlatformColliders(platformsCollider)
      enemies.add(enemy)
    });

    return enemies
  }

  onPlayerCollision(enemy, player) {
    player.takesHit(enemy, this.health);
  }

  enemyCollider(enemies, object, player) {
    this.physics.add.collider(enemies, object);
    this.physics.add.collider(enemies, player, this.onPlayerCollision);
  }

  playerCollider(player, object) {
    player.addCollider(object);
  }

  background() {
    let scale = 0.35;

    this.add
      .image(this.config.width / 2, this.config.height / 2, 'sky')
      .setScale(scale)
      .setScrollFactor(0);
    // this.add
    //   .image(this.config.width / 2, this.config.height / 4, 'clouds')
    //   .setScale(scale)
    //   .setScrollFactor(0);
    creeateAligned(this, this.config.height / 2, 5, 'clouds', 0.05, scale);
    const ground = this.add
      .image(this.config.width * 0, this.config.height, 'ground1')
      .setScale(scale)
      .setOrigin(0, 1)
      .setScrollFactor(0);
    creeateAligned(
      this,
      this.config.height - ground.height * 1.1,
      5,
      'mountains1',
      0.2,
      scale
    );
    creeateAligned(
      this,
      this.config.height - ground.height / 2.5,
      5,
      'mountains2',
      0.4,
      scale
    );
    creeateAligned(
      this,
      this.config.height - ground.height / 1.8,
      5,
      'mountains3',
      0.6,
      scale
    );
    const hills = this.add
      .image(this.config.width * 0, this.config.height, 'hills')
      .setScale(scale * 1.5)
      .setOrigin(0, 1)
      .setScrollFactor(0);
  }

  setupFollowUpCamera(player) {
    this.physics.world.setBounds(0, 0, this.playingArea);
    this.cameras.main.setBounds(0, 0, this.playingArea, this.config.height);
    this.cameras.main.startFollow(player);
  }

  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer;

    return {
      start: playerZones.find((zone) => zone.name == 'startZone'),
      firstRespawn: playerZones.find((zone) => zone.name == 'spawnZone1'),
      secondRespawn: playerZones.find((zone) => zone.name == 'spawnZone2'),
      end: playerZones.find((zone) => zone.name == 'endZone'),
    };
  }

  createHealthBar() {
    this.health = this.physics.add.group();
    let position = 20;
    for (let i = 0; i <= 2; i++) {
      this.health.create(position, 20, 'health').setScrollFactor(0);
      position += 40;
    }
    return this.health
  }


}
