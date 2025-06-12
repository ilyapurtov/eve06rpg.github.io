import { Entity } from "./Entity";

export class Player extends Entity {
  private speed: number;
  private flipped: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    speed = 5
  ) {
    super(scene, x, y, texture);
    this.speed = speed;
    this.flipped = false;
    this.setScale(0.8);
    this.body.setSize(15, 15, false);
    this.setOffset(10, 15);

    const frameRate = 8;

    this.anims.create({
      key: "idle",
      frameRate: frameRate,
      frames: this.anims.generateFrameNumbers(texture, {
        start: 0,
        end: 3,
      }),
      repeat: -1,
    });

    this.anims.create({
      key: "walk",
      frameRate: frameRate,

      frames: this.anims.generateFrameNumbers(texture, {
        start: 15,
        end: 18,
      }),
      repeat: -1,
    });
  }

  private setFlipOffset() {
    if (!this.flipped) {
      this.body.setOffset(10, 15);
    } else {
      this.body.setOffset(25, 15);
    }
  }

  update(delta: number): void {
    const keys = this.scene.input.keyboard.createCursorKeys();
    if (keys.up.isDown) {
      this.setVelocity(0, -delta * this.speed);
      this.play("walk", true);
    } else if (keys.left.isDown) {
      this.setVelocity(-delta * this.speed, 0);
      this.setFlipX(true);
      if (!this.flipped) {
        this.flipped = true;
        this.setFlipOffset();
      }
      this.play("walk", true);
    } else if (keys.down.isDown) {
      this.setVelocity(0, delta * this.speed);
      this.play("walk", true);
    } else if (keys.right.isDown) {
      this.setVelocity(delta * this.speed, 0);
      this.setFlipX(false);
      this.flipped = false;
      this.setFlipOffset();
      this.play("walk", true);
    } else {
      this.setVelocity(0, 0);
      this.play("idle", true);
    }
  }
}
