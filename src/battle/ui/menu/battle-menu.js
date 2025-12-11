
// Options du menu sub panel info
const BATTLE_MENU_OPTIONS = Object.freeze({
    FIGHT: 'FIGHT',
    SWITCH: 'SWITCH',
    ITEM: 'ITEM',
    FLEE: 'FLEE',
})

const batlleUiTextStyle = { color: 'black', fontSize: '30px' };

export class BattleMenu {
    #scene;

    constructor(scene) {
        this.#scene = scene;
    }

    #createMainBattleMenu() {
        // Render out the main info and sub info panel
        this.#createMainInfoPanel();
        this.#scene.add.container(520, 448, [
            this.#createMainInfoSubPanel(),
            this.#scene.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, batlleUiTextStyle),
            this.#scene.add.text(240, 22, BATTLE_MENU_OPTIONS.SWITCH, batlleUiTextStyle),
            this.#scene.add.text(55, 70, BATTLE_MENU_OPTIONS.ITEM, batlleUiTextStyle),
            this.#scene.add.text(240, 70, BATTLE_MENU_OPTIONS.FLEE, batlleUiTextStyle),
        ]);
    }

    #createMonsterAttackSubMenu() {
        this.#scene.add.container(0, 448, [
            this.#scene.add.text(55, 22, `Slash`, batlleUiTextStyle),
            this.#scene.add.text(240, 22, `growl`, batlleUiTextStyle),
            this.#scene.add.text(55, 70, `-`, batlleUiTextStyle),
            this.#scene.add.text(240, 70, `-`, batlleUiTextStyle),
        ])
    }

    #createMainInfoPanel() {
        const rectangleHeight = 124;
        const padding = 4;
        this.add
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