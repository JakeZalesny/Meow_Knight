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

        this.flying_eyes = []
        this.goblins = []
        this.mushrooms = []

        player.pos = {x: 50, y: 60};

        //Enemies Initialization
        const goblin_right_1 = new Goblin(player, {x: 1500, y: 300})
        const goblin_right_2 = new Goblin(player, {x: 1500, y: 400})
        this.goblins.push(goblin_right_1)
        this.goblins.push(goblin_right_2)

        
        
        const mushroom_middle_1 = new Mushroom(player, {x: 500, y: 500})
        const mushroom_lower_2 = new Mushroom(player, {x: 900, y: 1205})
        this.mushrooms.push(mushroom_middle_1)
        this.mushrooms.push(mushroom_lower_2)


        const flying_eye_lower_1 = new FlyingEye(player, {x: 500, y: 1201})
        const flying_eye_lower_2 = new FlyingEye(player, {x: 700, y: 1250})
        const flying_eye_lower_3 = new FlyingEye(player, {x: 600, y: 1220})
        this.flying_eyes.push(flying_eye_lower_1)
        this.flying_eyes.push(flying_eye_lower_2)
        this.flying_eyes.push(flying_eye_lower_3)

        //NPC initialization
        const b_witch = new BlueWitch(player)
        b_witch.pos = {x: 5, y: 50}

        const overworld = new Overworld1(camera)
        this.overworld = overworld; 
        
        this.player = player
        this.b_witch = b_witch
        this.camera = camera

        // entity.addDebug(this.mushroom)

    }

    async init() {

        await this.overworld.init()
        this.camera.setSubject(this.player)     
        this.camera.add(this.b_witch)
        this.camera.add(this.player)
        // this.camera.add(this.goblin)
        // this.camera.add(this.mushroom)
        // this.camera.add(this.flying_eye)
        this.flying_eyes.forEach(flying_eye => this.camera.add(flying_eye))
        this.goblins.forEach(goblin => this.camera.add(goblin))
        this.mushrooms.forEach(mushroom => this.camera.add(mushroom))
    }
    
    update(dt,t) {
        super.update(dt, t)
        // if(entity.hit(this.player, this.goblin)) this.player.dead = true
        if(this.player.doDamage) {
            this.goblins.forEach(goblin => {
                if(entity.hurtToHit(this.player, goblin)) goblin.lives -= 1 
                
                // else if(entity.hurtToHit(this.player, goblin) && goblin.lives == 1) goblin.dead = true 
            })  
            this.flying_eyes.forEach(flying_eye => {
                if(entity.hurtToHit(this.player, flying_eye)) flying_eye.lives -= 1

                // else if(entity.hurtToHit(this.player, flying_eye && flying_eye.lives == 1)) flying_eye.dead = true 
            })
            this.mushrooms.forEach(mushroom => {
                if(entity.hurtToHit(this.player, mushroom)) {
                    mushroom.lives -= 1
                    console.log(`Mushroom: ${mushroom.lives}`)
                }

                else if(entity.hurtToHit(this.player, mushroom) && mushroom.lives == 1) mushroom.dead = true
            })

        }
    }
}

export default GameScreen