import Camera from "../pop/Camera.js";
import Container from "../pop/Container.js";
import entity from "../pop/utils/entity.js";
import Level from "../resources/Levels/testLevel.mjs";
import Player from "../entities/player/player.mjs";
import Goblin from "../entities/baddies/goblin.mjs";
import BlueWitch from "../entities/NPCs/blue-witch.mjs"
import Mushroom from "../entities/baddies/mushroom.mjs";
import FlyingEye from "../entities/baddies/flyingeye.mjs";
import Overworld1 from "../resources/Levels/Overworld1.mjs";

class GameScreen extends Container {
    constructor(controls, game, mousecontrols) {
        super()

        const player = new Player(controls, mousecontrols)
        const camera = new Camera(null, {w:game.w, h:game.h})
        this.add(camera)

        player.pos = {x: 0, y: 0};

        //Enemies Initialization
        const goblin = new Goblin(player)
        goblin.pos = {x: game.w/2 + 400, y: game.h/2}
        
        const mushroom = new Mushroom(player)
        mushroom.pos = {x: 500, y: 500}

        const flying_eye = new FlyingEye(player)
        flying_eye.pos = {x: 500, y: 500}

        //NPC initialization
        const b_witch = new BlueWitch(player)
        b_witch.pos = {x: 40, y: 50}

        const overworld = new Overworld1(camera)
        this.overworld = overworld; 
        

        this.goblin = goblin
        this.player = player
        this.flying_eye = flying_eye
        this.mushroom = mushroom
        this.b_witch = b_witch
        this.camera = camera

    }

    async init() {

        await this.overworld.init()
        this.camera.setSubject(this.player)     
        this.camera.add(this.b_witch)
        this.camera.add(this.player)
        this.camera.add(this.goblin)
        this.camera.add(this.mushroom)
        this.camera.add(this.flying_eye)
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