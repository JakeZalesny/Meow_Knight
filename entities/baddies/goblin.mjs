import pop from "../../pop/index.js";
import Baddie from "./baddie.mjs";
const { TileSprite, Texture, math, entity, SoundPool } = pop;

const goblin_idle = new Texture("./resources/Monsters_Creatures_Fantasy/Goblin/Goblin_Idle_64.png");
const goblin_run = new Texture("./resources/Monsters_Creatures_Fantasy/Goblin/Goblin_Run_64.png");
const goblin_attack = new Texture("./resources/Monsters_Creatures_Fantasy/Goblin/Goblin_Attack_1_64.png");
const goblin_hit = new Texture("./resources/Monsters_Creatures_Fantasy/Goblin/Take-Hit.png")

const goblin_animations = {
    "idle":goblin_idle,
    "run":goblin_run,
    "attack_1":goblin_attack,
    "hit":goblin_hit
};

const slash = new SoundPool("./resources/sounds/goblin.mp3")
class Goblin extends Baddie {
    constructor(target, pos) {
        super(target, 64, 64, goblin_animations["idle"]);
        this.pos = {x:pos.x, y: pos.y};
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: -1.5, y: 1.5 };
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
        this.target = target
        this.speed = 2
        this.agro = false
        this.attacking = false
        this.dodging = false
        this.agro_offset = {right: -20, left: 50, up: -30, down: -30}
        this.agroRange = 200
        this.lives = 4
        this.sounding = false
        this.hitBox = {x: 0, y: 28, w: 34, h: 36}
        this.lastAttack = 0
        this.attackDelay = 1
        const{anims} = this

        anims.add("idle", [0, 1, 2].map(y => ({x:0, y})), 0.1)
        anims.add("run", [0, 1, 2, 3, 4, 5, 6, 7].map(y => ({x:0, y})), 0.1)
        anims.add("attack_1", [0, 1, 2, 3, 4, 5, 6, 7].map(y => ({x:0, y})), 0.1)
        anims.play("idle")

    }

    update(dt, t) {
        super.update(dt, t)
        // console.log(this.lives)
        //This was causing an issue due to the distance set. The left run won't come. May need to raise target range. 
        if(this.lastAttack > this.attackDelay && this.pos.x - this.target.pos.x <= (64 * 1.5) && this.pos.y - this.target.pos.y <= (64 * 1.5)) {
            this.attacking = true
            this.lastAttack = 0
        } else{ this.lastAttack += dt}

        
        if(this.agro == true && !this.attacking) {
            this.texture = goblin_animations["run"]
            this.anims.play("run")
        }
            else if(!this.agro){
                this.texture = goblin_animations["idle"]
                this.anims.play("idle")
            }

         
        if(this.target.pos.x > this.pos.x){
            this.scale.x = 1.5
            this.anchor.x = -32
         }

         
        if(this.target.pos.x < this.pos.x){
            this.scale.x = -1.5
            this.anchor.x = 32
         }


        else if(!this.agro){
            this.texture = goblin_animations["idle"]
            this.anims.play("idle")
            
        }

        if(this.attacking) {
            if(!this.sounding){
                this.sounding = true
                slash.play()
            }
            //switch textures
            this.texture = goblin_animations["attack_1"];
            this.anims.play("attack_1");

            // when to do damage
            if(this.frame.y >= 3 &&  this.frame.y <= 7){
                this.doDamage = true
            } else this.doDamage = false

            // when to stop animation
            if(this.frame.y == 7) {
                this.attacking = false;
                this.frame.y = 0;
            }
        } else{
            this.sounding = false
        }
        

    }
}

export default Goblin; 