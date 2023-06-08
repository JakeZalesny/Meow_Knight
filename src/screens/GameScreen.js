import Container from "../../pop/Container.js"
import Player from "../../entities/player/player.mjs";
import Level from "../../resources/Levels/testLevel.mjs"

import Camera from "../../pop/Camera.js";

class GameScreen extends Container {
    constructor(controls, game, mousecontrols) {
        super()
        
        const level = new Level(game.w*4, game.h*4)
        const player = new Player(controls, mousecontrols);
        const camera = this.add(new Camera(player, {w: game.w, h: game.h}, {w: level.w, h: level.h}))
        
        camera.add(level)
        camera.add(player);
       
        player.pos = {x: game.w / 4 + 140, y: game.h / 4};
        
        this.player = player
        this.camera = camera
        
        
        
    }

    update(dt, t){
        super.update(dt, t)
    }
}

export default GameScreen