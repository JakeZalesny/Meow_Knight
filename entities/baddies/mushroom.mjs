import pop from "../../pop/index.js";
import Baddie from "./baddie.mjs";
const { TileSprite, Texture, math, entity } = pop;

const mushroom_run = new Texture("./resources/Monsters_Creatures_Fantasy/Mushroom/Mushroom_Run_64.png") 
const mushroom_idle = new Texture("./resources/Monsters_Creatures_Fantasy/Mushroom/Mushroom_Idle_64.png") 
const mushroom_attack = new Texture("./resources/Monsters_Creatures_Fantasy/Mushroom/Mushroom_attack_1_64.png")

const mushroom_animations = {
    "run":mushroom_run,
    "idle":mushroom_idle,
    "attack":mushroom_attack
}


class Mushroom extends Baddie {
    constructor(target) {
        super(target, 64, 64, mushroom_animations["idle"]);
        this.pos = {x:0, y: 0};
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: -3.5, y: 3.5 };
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
        this.target = target
        this.speed = 1
        this.agro = false
        this.attacking = false
        this.doDamage = false
        this.dodging = false
        this.agroRange = 300
        this.hitBox = {x: 0, y: 28, w: 34, h: 36}
        const{anims} = this

        anims.add("idle", [0, 1, 2].map(y => ({x:0, y})), 0.2)
        anims.add("run", [0, 1, 2, 3, 4, 5, 6, 7].map(y => ({x:0, y})), 0.2)
        anims.add("attack", [0, 1, 2, 3, 4, 5, 6].map(y => ({x:0, y})), 0.2)
        anims.play("idle")

    }

    update(dt, t) {
        super.update(dt, t)

        //This was causing an issue due to the distance set. The left run won't come. May need to raise target range. 
        if(this.pos.x - this.target.pos.x <= (64 * 1.5) && this.pos.y - this.target.pos.y <= 30) {
            this.attacking = true
            
        }

        
        if(this.agro == true && this.target.pos.x > this.pos.x && !this.dodging) {
            this.texture = mushroom_animations["run"]
            this.anims.play("run")
            this.scale.x = 3.5
            this.anchor.x = 0
            
        }

        if(this.agro == true && !this.dodging) {
            this.texture = mushroom_animations["run"]
            this.anims.play("run")
            this.scale.x = -3.5
            this.anchor.x = -60
            
        }
         
        if(this.target.pos.x > this.pos.x){
            this.scale.x = 3.5
            this.anchor.x = -60
            
         }


        else if(!this.agro){
            this.texture = mushroom_animations["idle"]
            this.scale.x = -3.5
            this.anims.play("idle")
        }

        // if(this.attacking && this.agro) {
        //     //switch textures
        //     this.texture = mushroom_animations["attack"]
        //     this.anims.play("attack")
        //     console.log(this.frame.y)
        //     // when to do damage
        //     if(this.frame.y >= 3 &&  this.frame.y <= 7){
        //         this.doDamage = true
        //     } else this.doDamage = false

        //     // when to stop animation
        //     if(this.frame.y == 7) {
        //         this.attacking = false;
        //     }


        // }
        


    }
}

export default Mushroom; 