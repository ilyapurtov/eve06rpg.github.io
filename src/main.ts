import Phaser from "phaser";
import { scenes } from "./scenes/index";
import "./style.css";

new Phaser.Game({
  width: 800,
  height: 300,
  title: "My Game",
  scene: scenes,
  url: import.meta.env.URL || "",
  version: import.meta.env.VERSION || "0.0.1",
  backgroundColor: "#111",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  antialias: true,
});
