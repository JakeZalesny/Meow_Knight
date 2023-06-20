import pop from "../../pop/index.js";
import Baddie from "./baddie.mjs";
const { TileSprite, Texture, math, entity } = pop;

const flying_eye_flight = new Texture("resources/Monsters_Creatures_Fantasy/Flying_eye/Flying_Eye_Flight_64.png")  
// const flying_eye_attack_1 = new Texture("./resources/Monsters_Creatures_Fantasy/flying_eye/flying_eye_Attack_1_64.png")

const flying_eye_animations = {
    "flight":flying_eye_flight,
    // "attack_1":flying_eye_attack_1
}


class FlyingEye extends Baddie {
    constructor(target) {
        super(target, 64, 64, flying_eye_animations["flight"]);
        this.pos = {x:0, y: 0};
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: -1.0, y: 1.0 };
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
        this.target = target
        this.speed = 2.5
        this.agro = false
        this.attacking = false
        this.dodging = false
        this.agroRange = 200
        this.hitBox = {x: 0, y: 28, w: 34, h: 36}
        const{anims} = this

        anims.add("flight", [0, 1, 2, 3, 4, 5, 6].map(y => ({x:0, y})), 0.1)
        // anims.add("run", [0, 1, 2, 3, 4, 5, 6, 7].map(y => ({x:0, y})), 0.2)
        // anims.add("attack_1", [0, 1, 2, 3, 4, 5, 6, 7].map(y => ({x:0, y})), 0.2)
        anims.play("flight")

    }

    update(dt, t) {
        super.update(dt, t)

        //This was causing an issue due to the distance set. The left run won't come. May need to raise target range. 
        if(this.pos.x - this.target.pos.x <= 36 && this.pos.y - this.target.pos.y <= 34) {
            this.attacking = true
        }

        
        if(this.agro == true && this.target.pos.x > this.pos.x && !this.dodging) {
            this.scale.x = 1.0
        }

        if(this.agro == true && !this.dodging) {
            this.scale.x = -1.0
        }
         
        if(this.target.pos.x > this.pos.x){
            this.scale.x = 1.0
            this.anchor.x = 32
         }


        else if(!this.agro){
            this.texture = flying_eye_animations["flight"]
            this.anims.play("flight")
        }

        // if(this.attacking) {
        //     //switch textures
        //     this.texture = flying_eye_animations["attack_1"];
        //     this.anims.play("attack_1");

        //     // when to do damage
        //     if(this.frame.y >= 3 &&  this.frame.y <= 7){
        //         this.doDamage = true
        //     } else this.doDamage = false

        //     // when to stop animation
        //     if(this.frame.y == 7) {
        //         this.attacking = false;
        //         this.frame.y = 0;
        //     }
        // }
        


    }
}

export default FlyingEye; 