import Phaser from "../../../lib/phaser.js";
import { MONSTER_ASSET_KEYS, UI_ASSET_KEYS } from "../../../assets/assets-keys.js";
import { DIRECTION } from "../../../common/direction.js";
import { exhaustedGuard } from "../../../utils/guard.js";
import { ACTIVE_BATTLE_MENU, ATTACK_MOVE_OPTIONS, BATTLE_MENU_OPTIONS } from "./battle-menu-options.js";
import { BATTLE_UI_TEXT_STYLE } from "./battle-menu-config.js";





const BATTLE_MENU_CURSOR_POSITION = Object.freeze({
    x: 42,
    y: 38
})
const ATTACK_MENU_CURSOR_POSITION = Object.freeze({
    x: 42,
    y: 38,
})

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
    /** @type {Phaser.GameObjects.Image} */
    #mainBattleMenuCursorPhaserImageGameObject;
    /** @type {Phaser.GameObjects.Image} */
    #attackBattleMenuCursorPhaserImageGameObject;
    /** @type {import("./battle-menu-options.js").BattleMenuOptions} */
    #selectedBattleMenuOption;
    /** @type {import("./battle-menu-options.js").AttackMoveOptions} */
    #selectedAttackMenuOption;
    /** @type {import("./battle-menu-options.js").ActiveBattleMenu} */
    #activeBattleMenu;

    /**
     * 
     * @param {Phaser.Scene} scene Scene the battle menu will be added to
     */
    constructor(scene) {
        this.#scene = scene;
        this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
        this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_1;
        this.#activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
        this.#createMainInfoPanel();
        this.#createMainBattleMenu();
        this.#createMonsterAttackSubMenu();
    }

    showMainBattleMenu() {
        this.#activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
        this.#battleTextGameObjectLine1.setText('What should');
        this.#mainBattleMenuPhaserContainerGameObject.setAlpha(1);
        this.#battleTextGameObjectLine1.setAlpha(1);
        this.#battleTextGameObjectLine2.setAlpha(1);

        this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT; // set the default position
        this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITION.x, BATTLE_MENU_CURSOR_POSITION.y);
    }

    hideMainBattleMenu() {
        this.#mainBattleMenuPhaserContainerGameObject.setAlpha(0);
        this.#battleTextGameObjectLine1.setAlpha(0);
        this.#battleTextGameObjectLine2.setAlpha(0);
    }

    showMonsterAttackSubMenu() {
        this.#activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT;
        this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(1);
    }

    hideMonsterAttackSubMenu() {
        this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(0);
    }

    /**
     * 
     * @param {import("../../../common/direction.js").Direction | "OK" | "Cancel"} input 
     */
    // ==== Gestion des actions ====
    handlePlayerInput(input) {
        console.log(input);
        if (input === "CANCEL") {
            this.hideMonsterAttackSubMenu();
            this.showMainBattleMenu();
            return;
        }

        if (input === "OK") {
            this.hideMainBattleMenu();
            this.showMonsterAttackSubMenu();
            return;
        }

        this.#updateSelectedBattleMenuOptionFromInput(input);
        this.#moveMainBattleCursor();
        this.#updateSelectedMoveMenuOptionsFromInput(input);
        this.#moveSelectBattleMenuCursor();
    }

    // ==== Gestion de l'affichage des menus ====
    #createMainBattleMenu() {
        this.#battleTextGameObjectLine1 = this.#scene.add.text(20, 460, `What should`, BATTLE_UI_TEXT_STYLE);

        // Todo: update to use monster data that is passed into this class instance
        this.#battleTextGameObjectLine2 = this.#scene.add.text(20, 512, `${MONSTER_ASSET_KEYS.IGUANIGNITE} do next?`, BATTLE_UI_TEXT_STYLE);

        this.#mainBattleMenuCursorPhaserImageGameObject = this.#scene.add
            .image(BATTLE_MENU_CURSOR_POSITION.x, BATTLE_MENU_CURSOR_POSITION.y, UI_ASSET_KEYS.CURSOR, 0)
            .setOrigin(0.5)
            .setScale(2.5);

        this.#mainBattleMenuPhaserContainerGameObject = this.#scene.add.container(520, 448, [
            this.#createMainInfoSubPanel(),
            this.#scene.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, BATTLE_UI_TEXT_STYLE),
            this.#scene.add.text(240, 22, BATTLE_MENU_OPTIONS.SWITCH, BATTLE_UI_TEXT_STYLE),
            this.#scene.add.text(55, 70, BATTLE_MENU_OPTIONS.ITEM, BATTLE_UI_TEXT_STYLE),
            this.#scene.add.text(240, 70, BATTLE_MENU_OPTIONS.FLEE, BATTLE_UI_TEXT_STYLE),
            this.#mainBattleMenuCursorPhaserImageGameObject,
        ]);

        this.hideMainBattleMenu();
    }

    #createMonsterAttackSubMenu() {
        this.#attackBattleMenuCursorPhaserImageGameObject = this.#scene.add
            .image(ATTACK_MENU_CURSOR_POSITION.x, ATTACK_MENU_CURSOR_POSITION.y, UI_ASSET_KEYS.CURSOR, 0)
            .setOrigin(0.5)
            .setScale(2.5);

        this.#moveSelectionSubBattleMenuPhaserContainerGameObject = this.#scene.add.container(0, 448, [
            this.#scene.add.text(55, 22, `Slash`, BATTLE_UI_TEXT_STYLE),
            this.#scene.add.text(240, 22, `growl`, BATTLE_UI_TEXT_STYLE),
            this.#scene.add.text(55, 70, `-`, BATTLE_UI_TEXT_STYLE),
            this.#scene.add.text(240, 70, `-`, BATTLE_UI_TEXT_STYLE),
            this.#attackBattleMenuCursorPhaserImageGameObject,
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

    /**
     * @param {import("../../../common/direction.js").Direction} direction 
     */
    // ==== Gestion des menus (sélection) ====
    #updateSelectedBattleMenuOptionFromInput(direction) {
        if (this.#activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
            return;
        }

        if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FIGHT) {
            switch (direction) {
                case DIRECTION.RIGHT:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.SWITCH;
                    return;
                case DIRECTION.DOWN:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM;
                    return;
                case DIRECTION.LEFT:
                case DIRECTION.UP:
                case DIRECTION.NONE:
                    return;

                default:
                    exhaustedGuard(direction);
            }
            return;
        }

        if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.SWITCH) {
            switch (direction) {
                case DIRECTION.LEFT:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
                    return;
                case DIRECTION.DOWN:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
                    return;
                case DIRECTION.RIGHT:
                case DIRECTION.UP:
                case DIRECTION.NONE:
                    return;

                default:
                    exhaustedGuard(direction);
            }
            return;
        }

        if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.ITEM) {
            switch (direction) {
                case DIRECTION.UP:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
                    return;
                case DIRECTION.RIGHT:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
                    return;
                case DIRECTION.LEFT:
                case DIRECTION.DOWN:
                case DIRECTION.NONE:
                    return;

                default:
                    exhaustedGuard(direction);
            }
            return;
        }

        if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FLEE) {
            switch (direction) {
                case DIRECTION.LEFT:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM;
                    return;
                case DIRECTION.UP:
                    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.SWITCH;
                    return;
                case DIRECTION.RIGHT:
                case DIRECTION.DOWN:
                case DIRECTION.NONE:
                    return;

                default:
                    exhaustedGuard(direction);
            }
            return;
        }

        exhaustedGuard(this.#selectedBattleMenuOption);
    }

    #moveMainBattleCursor() {
        if (this.#activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
            return;
        }

        switch (this.#selectedBattleMenuOption) {
            case BATTLE_MENU_OPTIONS.FIGHT:
                this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITION.x, BATTLE_MENU_CURSOR_POSITION.y);
                return;
            case BATTLE_MENU_OPTIONS.SWITCH:
                this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(228, BATTLE_MENU_CURSOR_POSITION.y);
                return;
            case BATTLE_MENU_OPTIONS.ITEM:
                this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITION.x, 86);
                return;
            case BATTLE_MENU_OPTIONS.FLEE:
                this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(228, 86);
                return;

            default:
                exhaustedGuard(this.#selectedBattleMenuOption);
        }
    }

    /**
     * @param {import("../../../common/direction.js").Direction} direction 
     */
    #updateSelectedMoveMenuOptionsFromInput(direction) {
        if (this.#activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT) {
            return;
        }

        if (this.#selectedAttackMenuOption === ATTACK_MOVE_OPTIONS.MOVE_1) {
            switch (direction) {
                case DIRECTION.RIGHT:
                    this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_2;
                    return;
                case DIRECTION.DOWN:
                    this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_3;
                    return;
                case DIRECTION.LEFT:
                case DIRECTION.UP:
                case DIRECTION.NONE:
                    return;

                default:
                    exhaustedGuard(direction);
            }
            return;
        }

        if (this.#selectedAttackMenuOption === ATTACK_MOVE_OPTIONS.MOVE_2) {
            switch (direction) {
                case DIRECTION.LEFT:
                    this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_1;
                    return;
                case DIRECTION.DOWN:
                    this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_4;
                    return;
                case DIRECTION.RIGHT:
                case DIRECTION.UP:
                case DIRECTION.NONE:
                    return;

                default:
                    exhaustedGuard(direction);
            }
            return;
        }

        if (this.#selectedAttackMenuOption === ATTACK_MOVE_OPTIONS.MOVE_3) {
            switch (direction) {
                case DIRECTION.UP:
                    this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_1;
                    return;
                case DIRECTION.RIGHT:
                    this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_4;
                    return;
                case DIRECTION.LEFT:
                case DIRECTION.DOWN:
                case DIRECTION.NONE:
                    return;

                default:
                    exhaustedGuard(direction);
            }
            return;
        }

        if (this.#selectedAttackMenuOption === ATTACK_MOVE_OPTIONS.MOVE_4) {
            switch (direction) {
                case DIRECTION.LEFT:
                    this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_3;
                    return;
                case DIRECTION.UP:
                    this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_2;
                    return;
                case DIRECTION.RIGHT:
                case DIRECTION.DOWN:
                case DIRECTION.NONE:
                    return;

                default:
                    exhaustedGuard(direction);
            }
            return;
        }


        exhaustedGuard(this.#selectedAttackMenuOption);
    }

    #moveSelectBattleMenuCursor() {
        if (this.#activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT) {
            return;
        }

        switch (this.#selectedAttackMenuOption) {
            case ATTACK_MOVE_OPTIONS.MOVE_1:
                this.#attackBattleMenuCursorPhaserImageGameObject.setPosition(ATTACK_MENU_CURSOR_POSITION.x, ATTACK_MENU_CURSOR_POSITION.y);
                return;
            case ATTACK_MOVE_OPTIONS.MOVE_2:
                this.#attackBattleMenuCursorPhaserImageGameObject.setPosition(228, ATTACK_MENU_CURSOR_POSITION.y);
                return;
            case ATTACK_MOVE_OPTIONS.MOVE_3:
                this.#attackBattleMenuCursorPhaserImageGameObject.setPosition(ATTACK_MENU_CURSOR_POSITION.x, 86);
                return;
            case ATTACK_MOVE_OPTIONS.MOVE_4:
                this.#attackBattleMenuCursorPhaserImageGameObject.setPosition(228, 86);
                return;

            default:
                exhaustedGuard(this.#selectedAttackMenuOption);
        }
    }
}