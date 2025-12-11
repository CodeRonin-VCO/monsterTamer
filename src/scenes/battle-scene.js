import { BATTLE_BACKGROUND_ASSET_KEYS, MONSTER_ASSET_KEYS } from "../assets/assets-keys.js";
import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./scene-keys.js";

export class BattleScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.BATTLE_SCENE,
            active: true, // permet de démarrer la scene
        })

        console.log(SCENE_KEYS.BATTLE_SCENE);
    }


    create() {
        console.log(`[${BattleScene.name}:create] invoked`);

        // Créer le bg
        this.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.FOREST).setOrigin(0)

        // Créer les players et ennemi
        this.add.image(768, 144, MONSTER_ASSET_KEYS.CARNODUSK, 0);
        this.add.image(256, 316, MONSTER_ASSET_KEYS.IGUANIGNITE, 0).setFlipX(true); // setFlip permet de retourner un élément
    }

}