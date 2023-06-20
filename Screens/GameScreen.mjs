import Camera from "../pop/Camera.js";
import Container from "../pop/Container.js";
import entity from "../pop/utils/entity.js";
import Level from "../resources/Levels/testLevel.mjs";
import Player from "../entities/player/player.mjs";
import Goblin from "../entities/baddies/goblin.mjs";
import BlueWitch from "../entities/NPCs/blue-witch.mjs"
import Mushroom from "../entities/baddies/mushroom.mjs";
import FlyingEye from "../entities/baddies/flyingeye.mjs";

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
        
        const mushroom = new Mushroom(player)
        mushroom.pos = {x: 500, y: 500}

        const flying_eye = new FlyingEye(player)
        flying_eye.pos = {x: 900, y: 600}

        //NPC initialization
        const b_witch = new BlueWitch(player)
        b_witch.pos = {x: 40, y: 50}

        camera.add(level)
        camera.add(b_witch)
        camera.add(player)
        camera.add(goblin)
        camera.add(mushroom)
        camera.add(flying_eye)

        this.goblin = goblin
        this.player = player
        this.flying_eye = flying_eye
        this.mushroom = mushroom
        this.b_witch = b_witch
        this.camera = camera

        entity.addDebug(goblin)
        entity.addDebug(mushroom)
        entity.addDebug(player)
        // entity.addDebug(flying_eye)

        console.log(this.goblin)
        console.log(this.goblin.anims)
    }
    
    update(dt,t) {
        super.update(dt, t)

        if(entity.hit(this.player, this.goblin)) this.player.dead = true
        if(this.player.doDamage) {
            if(entity.hurtToHit(this.player, this.goblin)) this.goblin.dead = true
            if(entity.hurtToHit(this.player, this.flying_eye)) this.flying_eye.dead = true
            if(entity.hurtToHit(this.player, this.mushroom)) this.mushroom.dead = true
        }

    }
}

export default GameScreen