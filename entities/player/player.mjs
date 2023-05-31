import pop from "../../pop/index.js";
import Sprite from "../../pop/Sprite.js";
const { TileSprite, Texture, math } = pop;

const idle = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Idle_32.png");
const run = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Run_32.png");
const attack_1 = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Attack_1.png");
const attack_2 = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Attack_2.png");
const attack_3 = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Attack_3.png");
const attack_4 = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Attack_4.png");
const dodge = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Dodge.png");
const jump = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Jump.png");
const damaged = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Take_Damage.png");
const death = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Death.png");


const animations = {
    "idle":idle, 
    "run":run,
    "attack_1":attack_1,
    "attack_2":attack_2,
    "attack_3":attack_3,
    "attack_4":attack_4,
    "dodge":dodge,
    "jump":jump,
    "damaged":damaged,
    "death":death
}

class Player extends TileSprite {
    constructor(controls) {
        super(animations["idle"], 32, 34);
        this.pos = {x:0, y: 0};
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: 2, y: 2 };
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
        this.controls = controls
        this.hitBox = {x: 1, y: 1, w: 13, h: 16}
        const{anims} = this

        anims.add("idle", [0, 1, 2, 3, 4, 5].map(y => ({x:0, y})), .1)
        this.anims.add("run", [0, 1, 2, 3, 4, 5, 6, 7, 8].map(y=> ({x:0, y})), 0.1);
        anims.play("idle")

    }

    update(dt) {
        super.update(dt)
        const {x, y} = this.controls;
        this.pos.x += x * dt * 150
        this.pos.y += y * dt * 150

        if(x == 1) {
            this.texture = animations["run"];
            this.scale.x = 2; 
            this.anchor.x = 0; 

        }

        else if(x == -1) {
            this.texture = animations["run"];
            this.scale.x = -2;  
            this.anchor.x = 32;  
        }
        else {
            this.texture = animations["idle"];
            this.rotation = 0; 
            this.scale.x = 2; 
            this.anchor.x = 0; 
        }
        
    }
}

export default Player; 