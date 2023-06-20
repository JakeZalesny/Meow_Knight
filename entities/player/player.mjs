import pop from "../../pop/index.js";
import Sprite from "../../pop/Sprite.js";
const { TileSprite, Texture, math } = pop;

const idle = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Idle_32.png");
const run = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Run_32.png");
const attack_1 = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Attack_1_64.png");
const attack_2 = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Attack_2_32.png");
const attack_3 = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Attack_3_32.png");
const attack_4 = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Attack_4.png");
const dodge = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Dodge_32.png");
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
    constructor(controls, mousecontrols) {
        super(animations["idle"], 32, 34);
        this.pos = {x:0, y: 0};
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: 2, y: 2 };
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
        this.controls = controls
        this.mousecontrols = mousecontrols
        this.hitBox = {x: 1, y: 18, w: 13, h: 16}
        this.hurtBox = {x: 1, y: 18, w: 34, h: 16}
        this.attacking = false;
        this.doDamage = false
        this.dodging = false;
        this.speed = 1
        const{anims} = this

        anims.add("idle", [0, 1, 2, 3, 4, 5].map(y => ({x:0, y})), 0.1)
        this.anims.add("run", [0, 1, 2, 3, 4, 5, 6, 7].map(y=> ({x:0, y})), 0.1);
        this.anims.add("dodge", [0, 1, 2, 3, 4, 5, 6, 7].map(y=> ({x:0, y})), 0.1);
        this.anims.add("attack_1", [0, 1, 2, 3, 4, 5, 6, 7, 8].map(y=> ({x:0, y})), 0.07);
        anims.play("idle")

    }

    update(dt) {
        super.update(dt)
        const {x, y, action} = this.controls;
        const {up, down, move} = this.mousecontrols;

        // Attacks
        if(this.mousecontrols.pressed && !this.dodging) {
            this.attacking = true; 
        }
        
        //Dodge movement handling
        if(action && !this.attacking && (x || y)) {
            this.dodging = true; 
        }


        // Normal movement handling

        //Movement for y and diagonal
        if(y && x && ! this.dodging && !this.attacking){
            this.pos.y += y * dt * 150
        }

        // Only running up and down animation
        if(y && !x && ! this.dodging && !this.attacking){
            this.texture = animations["idle"];
            this.anims.play("idle");
            this.pos.y += y * dt * 150
        }

        //running right animation
        if(x == 1 && !this.dodging && !this.attacking) {
            this.texture = animations["run"];
            this.anims.play("run");
            this.scale.x = 2; 
            this.anchor.x = 0; 
            this.anims.play("run");
            this.pos.x += x * dt * 150
        }

        //Running left animation
        else if(x == -1 && !this.dodging && !this.attacking) {
            this.texture = animations["run"];
            this.scale.x = -2;
            this.anchor.x = 32;
            this.anims.play("run");  
            this.pos.x += x * dt * 150

        }
        //Idle animation
        if(!x && !y && !this.dodging && !this.attacking) {
            this.texture = animations["idle"];
            this.anims.play("idle"); 
            this.rotation = 0; 
        }

        // Attacking animation
        if(this.attacking) {
            //switch textures
            this.texture = animations["attack_1"];
            this.anims.play("attack_1");

            // when to do damage
            if(this.frame.y >= 3 &&  this.frame.y <= 7){
                this.doDamage = true
            } else this.doDamage = false

            // when to stop animation
            if(this.frame.y == 8) {
                this.attacking = false;
                this.frame.y = 0;
            }
        }

        // dodging animation
        if(this.dodging) {
            this.speed = 1.5
            this.texture = animations["dodge"];
            this.anims.play("dodge");
            if(this.frame.y == 7) {
                this.dodging = false;
                this.frame.y = 0;
                this.speed = 1
            }
            this.pos.x += x * dt * 150 * this.speed
            this.pos.y += y * dt * 150 * this.speed
        }



        this.mousecontrols.update();  
    }
}

export default Player; 