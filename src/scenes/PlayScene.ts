import phaser from 'phaser'

const creeateAligned = (scene, heght: number, count: number, texture:string, scrollFactor: number, scale: number): void => {
	let x = 0;
	
	for (let i = 0; i < count; ++i) {
		console.log(x)
	let layot = scene.add.image(x, heght, texture)
		.setScale(scale)
		.setOrigin(0, 1)
		.setScrollFactor(scrollFactor);
		x += scene.config.width + 70;
	}
	

}

export default class PlayScene extends Phaser.Scene {
	// player: Phaser.GameObjects.Sprite;

  
	 config: any;

	constructor(config) {
    super({
			key: 'PlayScene'
		});
		this.config = config
	}
	
	preload() {
		
	}

	create() {
		
		this.background();
		this.cameras.main.setBounds(0,0, this.config.width * 10, this.config.height)

		//  const player = this.createPlayer();
		 const map = this.createMap();
		 const layers = this.createLayers(map);

		// this.physics.add.collider(player, layers.platformsCollider);

	}
	
	update() {
		
		const cam = this.cameras.main
		console.log(cam.x)
		const speed = 3;
		let keyObjA = this.input.keyboard.addKey('A');  // Get key object
		let keyObjD = this.input.keyboard.addKey('D');  // Get key object
	

		if ( keyObjA.isDown) {
			cam.scrollX -= speed
		}else if (keyObjD.isDown) {
			cam.scrollX += speed
		}
	}

	createMap() {
		const map = this.make.tilemap({key: 'map'});
		const tileset1 =map.addTilesetImage('morning_adventures_tileset_16x16', 'floor');

		return {map, tileset1 } ;
	}
	
	createLayers(parameters) {
		const platformsCollider = parameters.map.createStaticLayer('main' , parameters.tileset1)
    platformsCollider.setCollisionByExclusion(-1 , true);

		return { platformsCollider };
	}

	createPlayer(): phaser.Physics.Arcade.Sprite {
		const player = this.physics.add.sprite(this.config.width*0.2, this.config.height/2, 'player');
		player.setGravityY(100);
		player.setCollideWorldBounds(true);
		return player;
	}

	background() {
		let scale = 0.35 ;
		this.add.image(this.config.width/2, this.config.height/2, 'sky').setScale(scale).setScrollFactor(0);
		this.add.image(this.config.width/2, this.config.height/4, 'clouds').setScale(scale).setScrollFactor(0);;
		const ground = this.add.image(this.config.width * 0, this.config.height  , 'ground1').setScale(scale).setOrigin(0, 1).setScrollFactor(0);
		creeateAligned(this, this.config.height - ground.height* 1.1, 5, 'mountains1', 0.2, scale);
		creeateAligned(this, this.config.height - ground.height/2.5, 5,  'mountains2', 0.4, scale);
		creeateAligned(this, this.config.height - ground.height/1.8, 5,  'mountains3', 0.6, scale);
		const hills = this.add.image(this.config.width * 0, this.config.height  , 'hills').setScale(scale* 1.5).setOrigin(0, 1).setScrollFactor(0);
	}
}






