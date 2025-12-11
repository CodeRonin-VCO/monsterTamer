import { BATTLE_ASSET_KEYS, BATTLE_BACKGROUND_ASSET_KEYS, HEALTH_BAR_ASSET_KEYS, MONSTER_ASSET_KEYS } from "../assets/assets-keys.js";
import { BattleMenu } from "../battle/ui/menu/battle-menu.js";
import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./scene-keys.js";


export class BattleScene extends Phaser.Scene {
    /** @type {BattleMenu} */
    #battleMenu;

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

        // Render out the player health bar
        const playerMonsterName = this.add.text(30, 20, MONSTER_ASSET_KEYS.IGUANIGNITE, { color: "#7E3D3F", fontSize: '32px' });
        this.add.container(556, 318, [
            this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0),
            playerMonsterName,
            this.#createHealthBar(34, 34), // appel de la méthode privée
            this.add.text(playerMonsterName.width + 35, 23, `L5`, { color: "#ED474B", fontSize: '28px' }),
            this.add.text(30, 55, `HP`, { color: "#FF6505", fontSize: '24px', fontStyle: 'italic' }),
            this.add.text(443, 80, `25/25`, { color: "#7E3D3F", fontSize: '16px' }).setOrigin(1, 0),
        ]);

        // Render out the enemy health bar
        const enemyMonsterName = this.add.text(30, 20, MONSTER_ASSET_KEYS.CARNODUSK, { color: "#7E3D3F", fontSize: '32px' });
        this.add.container(0, 0, [
            this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0).setScale(1, 0.8),
            enemyMonsterName,
            this.#createHealthBar(34, 34), // appel de la méthode privée
            this.add.text(enemyMonsterName.width + 35, 23, `L5`, { color: "#ED474B", fontSize: '28px' }),
            this.add.text(30, 55, `HP`, { color: "#FF6505", fontSize: '24px', fontStyle: 'italic' }),
        ]);

        // Render out the main info and sub info panel
        this.#battleMenu = new BattleMenu(this)
        this.#battleMenu.showMainBattleMenu();
    }
    // Le # permet de créer une méthode privée
    #createHealthBar(x, y) {
        const scaleY = 0.7;

        const leftCap = this.add
            .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP)
            .setOrigin(0, 0.5)
            .setScale(1, scaleY); // gérer les dimensions (100% de large et 70% de haut par rapport à la taille de base de l'image)
        const middle = this.add
            .image(leftCap.x + leftCap.width, y, HEALTH_BAR_ASSET_KEYS.MIDDLE)
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);
        middle.displayWidth = 360;
        const rightCap = this.add
            .image(middle.x + middle.displayWidth, y, HEALTH_BAR_ASSET_KEYS.RIGHT_CAP)
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);

        return this.add.container(x, y, [leftCap, middle, rightCap])
    }



}