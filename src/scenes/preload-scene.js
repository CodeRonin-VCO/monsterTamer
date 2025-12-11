import { BATTLE_ASSET_KEYS, BATTLE_BACKGROUND_ASSET_KEYS, HEALTH_BAR_ASSET_KEYS, MONSTER_ASSET_KEYS } from "../assets/assets-keys.js";
import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./scene-keys.js";

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.PRELOAD_SCENE,
            active: true, // permet de démarrer la scene
        })

        console.log(SCENE_KEYS.PRELOAD_SCENE);
    }

    // init() {
    //     // ==== Code de démarrage de la scène (ex: réinitiliser le score au démarrage de la scène)
    //     console.log('init');
    // }


    preload() {
        // ==== Méthode de préchargement (charger les ressources et les mettre dans la file d'attente dans l'ordre et phaser attend que toutes les ressources soient chargées)
        // console.log('preload');
        console.log(`[${PreloadScene.name}:preload] invoked`);

        const monsterTamerAssetPath = 'assets/images/monster-tamer';
        const kenneysAssetPath = 'assets/images/kenneys-assets';

        // Battle bg
        this.load.image(BATTLE_BACKGROUND_ASSET_KEYS.FOREST, `${monsterTamerAssetPath}/battle-backgrounds/forest-background.png`);

        // Battle assets
        this.load.image(BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND, `${kenneysAssetPath}/ui-space-expansion/custom-ui.png`);

        // Health bar assets
        this.load.image(HEALTH_BAR_ASSET_KEYS.RIGHT_CAP, `${kenneysAssetPath}/ui-space-expansion/barHorizontal_green_right.png`);
        this.load.image(HEALTH_BAR_ASSET_KEYS.MIDDLE, `${kenneysAssetPath}/ui-space-expansion/barHorizontal_green_mid.png`);
        this.load.image(HEALTH_BAR_ASSET_KEYS.LEFT_CAP, `${kenneysAssetPath}/ui-space-expansion/barHorizontal_green_left.png`);

        // Monster assets
        this.load.image(MONSTER_ASSET_KEYS.CARNODUSK, `${monsterTamerAssetPath}/monsters/carnodusk.png`);
        this.load.image(MONSTER_ASSET_KEYS.IGUANIGNITE, `${monsterTamerAssetPath}/monsters/iguanignite.png`);
    }


    create() {
        // // ==== Créer des objets et les placer dans notre scène (exemple: bg)
        // console.log('create');
        // console.log(this.textures.get(BATTLE_BACKGROUND_ASSET_KEYS.FOREST));

        // // ==== Créer un nouvel objet en fonction de la méthode qu'on appelle → méthode image, positionnée aux coordonnées x et y (0,0) donc top left (en pixel). On peut rajouter d'autres méthode dessus avec setOrigin
        // this.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.FOREST).setOrigin(0)

        // ==== Indiquer qu'on veut passer à la scene suivante (start)
        console.log(`[${PreloadScene.name}:create] invoked`);
        
        this.scene.start(SCENE_KEYS.BATTLE_SCENE);
    }


    // update() {
    //     // ==== Permet de mettre à jour les éléments dans la scène (ex: entrées du joueur)
    //     console.log('update');
    // }
}