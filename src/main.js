import Phaser from "./lib/phaser.js";
import { SCENE_KEYS } from "./scenes/scene-keys.js";
import { PreloadScene } from "./scenes/preload-scene.js";
import { BattleScene } from "./scenes/battle-scene.js";


const game = new Phaser.Game({
    type: Phaser.CANVAS,
    pixelArt: false,
    scale: { // gère les échelles et le container parent du canvas (responsive grâce à fit)
        parent: 'game-container',
        width: 1024,
        height: 576,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    backgroundColor: '#000000',
    scene: [
        PreloadScene, // permet d'ajouter et de démarrer la scene avec le active dans preload-scene.js
        BattleScene,
    ]
})