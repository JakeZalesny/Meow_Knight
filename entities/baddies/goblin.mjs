import pop from "../../pop/index.js";
import Baddie from "./baddie.mjs";
const { TileSprite, Texture, math, entity } = pop;

const goblin_idle = new Texture("./resources/Monsters_Creatures_Fantasy/Monsters_Creatures_Fantasy/Goblin/Goblin_Idle_64.png");
const goblin_run = new Texture("./resources/Monsters_Creatures_Fantasy/Monsters_Creatures_Fantasy/Goblin/Goblin_Run_64.png");
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
        super(target, 64, 64, goblin_animations["idle"]);
        this.pos = {x:0, y: 0};
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: 1.5, y: 1.5 };
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
        this.target = target
        this.speed = 2
        this.agro = false
        this.agroRange = 200
        this.hitBox = {x: 0, y: 28, w: 34, h: 36}
        const{anims} = this

        anims.add("idle", [0, 1, 2].map(y => ({x:0, y})), 0.1)
        anims.add("run", [0, 1, 2, 3, 4, 5, 6, 7].map(y => ({x:0, y})), 0.1)
        anims.play("idle")

    }

    update(dt, t) {
        super.update(dt, t)
         if(this.agro == true) {
            this.texture = goblin_animations["run"]
            this.anims.play("run")
            this.scale.x = 1.5
         }
         if(this.pos.x > this.target.pos.x + this.target.hitBox.w){
            this.scale.x = -1.5
        }

        else if(!this.agro){
            this.texture = goblin_animations["idle"]
            this.anims.play("idle")
        }

    }
}

export default Goblin; 