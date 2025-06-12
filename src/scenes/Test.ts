import { config } from "../config";
import testMapJson from "../assets/test-map.json";
import { Player } from "../entities/Player";

export class Test extends Phaser.Scene {
  private player?: Player;

  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image(
      config.SCENES.MAIN,
      "src/assets/overworld_tileset_grass.png"
    );
    this.load.tilemapTiledJSON("map", "src/assets/test-map.json");
    this.load.spritesheet(
      config.SPRITES.PLAYER,
      "src/assets/characters/Samurai.png",
      {
        frameWidth: config.SIZES.PLAYER.WIDTH,
        frameHeight: config.SIZES.PLAYER.HEIGHT,
      }
    );

    this.load.audio(config.AUDIO.OST, "src/assets/music/ost.ogg");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileSet = map.addTilesetImage(
      testMapJson.tilesets[0].name,
      config.SCENES.MAIN,
      config.SIZES.TILE,
      config.SIZES.TILE
    );
    const groundLayer = map.createLayer(config.LAYERS.GROUND, tileSet, 0, 0);
    const wallsLayer = map.createLayer(config.LAYERS.WALLS, tileSet, 0, 0);

    this.player = new Player(this, 250, 220, config.SPRITES.PLAYER);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, wallsLayer);
    wallsLayer.setCollisionByExclusion([-1]);

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setRoundPixels(true);
    this.cameras.main.setZoom(1.5);

    this.cameras.main.zoomTo(2.5, 2000);

    const music = this.sound.add(config.AUDIO.OST, {
      volume: 0.05,
      loop: true,
    });
    music.play();
  }

  update(_: number, delta: number): void {
    this.player.update(delta);
  }
}
