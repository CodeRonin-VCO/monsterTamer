# Monster Tamer
Apprentissage de phaser avec le tutoriel : https://www.youtube.com/playlist?list=PLmcXe0-sfoSgq-pyXrFx0GZjHbvoVUW8t

Ressources: https://github.com/scottwestover

Code avec les assets : https://github.com/devshareacademy/monster-tamer

## Setup

### Structure

```
index.html
assets/                             → images
src/
    /assets
        assets-keys.js              → freeze object name
    /battle
        /ui
            /menu
                battle-menu.js
    /common
        direction.js                → freeze object direction keyboards
    /lib                            → Export phaser
    /scene
        battle-scene.js
        preload-scene.js
        scene-keys.js
    main.js                         → Main scenes manager (canvas)
```

### Install
```
npm init
```
```
npm i phaser
```
