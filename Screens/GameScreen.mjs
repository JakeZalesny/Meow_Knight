import Camera from "../pop/Camera.js";
import Container from "../pop/Container.js";
import entity from "../pop/utils/entity.js";
import Level from "../resources/Levels/testLevel.mjs";
import Player from "../entities/player/player.mjs";
import Goblin from "../entities/baddies/goblin.mjs";
import BlueWitch from "../entities/NPCs/blue-witch.mjs"

class GameScreen extends Container {
    constructor(controls, game, mousecontrols) {
        super()

        const level = new Level(game.w*4, game.h*4)

        const player = new Player(controls, mousecontrols)
        player.pos = {x: game.w / 4 + 140, y: game.h / 4};

        const camera = this.add(new Camera(player, {w:game.w, h:game.h}, {w:level.w, h:level.h}))
        //Enemies Initialization
        const goblin = new Goblin(player)
        goblin.pos = {x: game.w/2 + 400, y: game.h/2}

        //NPC initialization
        const b_witch = new BlueWitch(player)
        b_witch.pos = {x: 40, y: 50}
        console.log(b_witch.texture)

        camera.add(level)
        camera.add(b_witch)
        camera.add(player)
        camera.add(goblin)

        this.goblin = goblin
        this.player = player
        this.camera = camera

        // entity.addDebug(goblin)

        console.log(this.goblin)
        console.log(this.goblin.anims)
    }
    
    update(dt,t) {
        super.update(dt, t)

        if(entity.hit(this.player, this.goblin)) this.player.dead = true
        if(this.player.doDamage) {
            if(entity.hurtToHit(this.player, this.goblin)) this.goblin.dead = true
        }

    }
}

export default GameScreen