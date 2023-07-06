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
    constructor(target, pos) {
        super(target, 64, 64, mushroom_animations["idle"]);
        this.pos = {x: pos.x, y: pos.y};
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: -3.5, y: 3.5 };
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
        this.target = target
        this.speed = 0.5
        this.agro = false
        this.attacking = false
        this.doDamage = false
        this.dodging = false
        this.agro_offset = {right: -50, left:80, up:-150, down:-150}
        this.agroRange = 300
        this.hitBox = {x: 0, y: 28, w: 34, h: 36}
        this.lives = 12; 
        const{anims} = this

        anims.add("idle", [0, 1, 2].map(y => ({x:0, y})), 0.2)
        anims.add("run", [0, 1, 2, 3, 4, 5, 6, 7].map(y => ({x:0, y})), 0.2)
        anims.add("attack", [0, 1, 2, 3, 4, 5, 6].map(y => ({x:0, y})), 0.2)
        anims.play("idle")

    }

    update(dt, t) {
        super.update(dt, t)

        // Determines when he should attack
        if(this.pos.x - 100 < this.target.pos.x && this.pos.x + 50 > this.target.pos.x && this.pos.y + 200 > this.target.pos.y && this.pos.y < this.target.pos.y) this.attacking = true

        // if agroed plays the run anim
        if(this.agro == true && !this.attacking) {
            this.texture = mushroom_animations["run"]
            this.anims.play("run")
        }
            else if(!this.agro){
                this.texture = mushroom_animations["idle"]
                this.anims.play("idle")
            }
         
            // flips him right when player is left
        if(this.target.pos.x > this.pos.x){
            this.scale.x = 3.5
            this.anchor.x = -44
         }

         // flips him left when player is right
         if(this.target.pos.x < this.pos.x){
            this.scale.x = -3.5
            this.anchor.x = 44
         }




        if(this.attacking) {
            //switch textures
            this.texture = mushroom_animations["attack"];
            this.anims.play("attack");
            this.speed = 0

            // when to do damage
            if(this.frame.y >= 3 &&  this.frame.y <= 7){
                this.doDamage = true
            } else this.doDamage = false
            // when to stop animation
            if(this.frame.y == 6) {
                this.attacking = false;
                this.frame.y = 0;
                this.speed = 1
            }
        }

        // // // // // else {
        // // // // //     this.texture = mushroom_animations["idle"]
        // // // // //     this.anims.play("idle")
        // // // // // }
        //console.log(this.frame.y)
        // console.log(`Attacking: ${this.attacking}`)
        // console.log(`Agro: ${this.agro}`)


    }
}

export default Mushroom; 