import Phaser from "../../../lib/phaser.js";
import { MONSTER_ASSET_KEYS } from "../../../assets/assets-keys.js";

// Options du menu sub panel info
const BATTLE_MENU_OPTIONS = Object.freeze({
    FIGHT: 'FIGHT',
    SWITCH: 'SWITCH',
    ITEM: 'ITEM',
    FLEE: 'FLEE',
})

const batlleUiTextStyle = { color: 'black', fontSize: '30px' };

export class BattleMenu {
    /** @type {Phaser.Scene} */
    #scene;
    /** @type {Phaser.GameObjects.Container} */
    #mainBattleMenuPhaserContainerGameObject;
    /** @type {Phaser.GameObjects.Container} */
    #moveSelectionSubBattleMenuPhaserContainerGameObject;
    /** @type {Phaser.GameObjects.Text} */
    #battleTextGameObjectLine1;
    /** @type {Phaser.GameObjects.Text} */
    #battleTextGameObjectLine2;

    /**
     * 
     * @param {Phaser.Scene} scene Scene the battle menu will be added to
     */
    constructor(scene) {
        this.#scene = scene;
        this.#createMainInfoPanel();
        this.#createMainBattleMenu();
        this.#createMonsterAttackSubMenu();
    }

    showMainBattleMenu() {
        this.#battleTextGameObjectLine1.setText('What should');
        this.#mainBattleMenuPhaserContainerGameObject.setAlpha(1);
        this.#battleTextGameObjectLine1.setAlpha(1);
        this.#battleTextGameObjectLine2.setAlpha(1);
    }
    
    hideMainBattleMenu() {
        this.#mainBattleMenuPhaserContainerGameObject.setAlpha(0);
        this.#battleTextGameObjectLine1.setAlpha(0);
        this.#battleTextGameObjectLine2.setAlpha(0);
    }

    showMonsterAttackSubMenu() {
        this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(1);
    }
    
    hideMonsterAttackSubMenu() {
        this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(0);
    }

    #createMainBattleMenu() {
        this.#battleTextGameObjectLine1 = this.#scene.add.text(20, 460, `What should`, batlleUiTextStyle);
        // Todo: update to use monster data that is passed into this class instance
        this.#battleTextGameObjectLine2 = this.#scene.add.text(20, 512, `${MONSTER_ASSET_KEYS.IGUANIGNITE} do next?`, batlleUiTextStyle);
        this.#mainBattleMenuPhaserContainerGameObject = this.#scene.add.container(520, 448, [
            this.#createMainInfoSubPanel(),
            this.#scene.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, batlleUiTextStyle),
            this.#scene.add.text(240, 22, BATTLE_MENU_OPTIONS.SWITCH, batlleUiTextStyle),
            this.#scene.add.text(55, 70, BATTLE_MENU_OPTIONS.ITEM, batlleUiTextStyle),
            this.#scene.add.text(240, 70, BATTLE_MENU_OPTIONS.FLEE, batlleUiTextStyle),
        ]);

        this.hideMainBattleMenu();
    }

    #createMonsterAttackSubMenu() {
        this.#moveSelectionSubBattleMenuPhaserContainerGameObject = this.#scene.add.container(0, 448, [
            this.#scene.add.text(55, 22, `Slash`, batlleUiTextStyle),
            this.#scene.add.text(240, 22, `growl`, batlleUiTextStyle),
            this.#scene.add.text(55, 70, `-`, batlleUiTextStyle),
            this.#scene.add.text(240, 70, `-`, batlleUiTextStyle),
        ])

        this.hideMonsterAttackSubMenu();
    }

    #createMainInfoPanel() {
        const rectangleHeight = 124;
        const padding = 4;
        this.#scene.add
            .rectangle(
                padding, // position x (on tient compte du padding)
                this.#scene.scale.height - rectangleHeight - padding, // position Y
                this.#scene.scale.width - padding * 2, // width
                rectangleHeight, // height
                0xede4f3, // color
                1, // alpha
            )
            .setOrigin(0)
            .setStrokeStyle(8, 0xe4434a, 1); // border (width, color, alpha)
    }

    #createMainInfoSubPanel() {
        const rectangleHeight = 124;
        const rectangleWidth = 500;
        return this.#scene.add // return pour pouvoir faire le rendu dans le container (voir méthode create)
            .rectangle(0, 0, rectangleWidth, rectangleHeight, 0xede4f3, 1,)
            .setOrigin(0)
            .setStrokeStyle(8, 0x905ac2, 1); // border (width, color, alpha)
    }
}