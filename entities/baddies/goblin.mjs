import pop from "../../pop/index.js";
import Baddie from "./baddie.mjs";
const { TileSprite, Texture, math, entity } = pop;

const goblin_idle = new Texture("./resources/Monsters_Creatures_Fantasy/Monsters_Creatures_Fantasy/Goblin/Idle.png");
const goblin_run = new Texture("./resources/Monsters_Creatures_Fantasy/Monsters_Creatures_Fantasy/Goblin/Run.png");
const goblin_attack = new Texture("./resources/Monsters_Creatures_Fantasy/Monsters_Creatures_Fantasy/Goblin/Attack.png");
const goblin_hit = new Texture("./resources/Monsters_Creatures_Fantasy/Monsters_Creatures_Fantasy/Goblin/Take-Hit.png")

const goblin_animations = {
    "idle":goblin_idle,
    "run":goblin_run,
    "attack":goblin_attack,
    "hit":goblin_hit
};

class Goblin extends Baddie {
    constructor(target) {
        super(target, 150, 150, goblin_animations["idle"]);
        this.pos = {x:0, y: 0};
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: 2, y: 2 };
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
        this.target = target
        this.speed = 1
        this.agro = false
        this.hitBox = {x: 8, y: 8, w: 16, h: 16}
        const{anims} = this

        anims.add("idle", [0, 1, 2].map(y => ({x:0, y})), 0.1)
        anims.play("idle")

    }

    update(dt, t) {
        super.update(dt, t)

        if(entity.distance(this.target, this) < 200){
            this.agro = true
        }
        else if(entity.distance(this.target, this) > 300){
            this.agro = false
        }

        if(this.agro == true){

            
            if(this.pos.x < this.target.pos.x - this.target.hitBox.w * 3.3){
            this.pos.x +=  dt * 60 * this.speed
        }
            if(this.pos.x > this.target.pos.x + this.target.hitBox.w){
            this.pos.x -= dt * 60 * this.speed
        }
            if(this.pos.y < this.target.pos.y + this.target.hitBox.h * 1.4){
            this.pos.y += dt * 60 * this.speed
        }
            if(this.pos.y > this.target.pos.y + this.target.hitBox.h * 1.4){
            this.pos.y -= dt * 60 * this.speed
        }
    }
        
        
        }
}

export default Goblin; 