import pop from "../../pop/index.js";
const { TileSprite, Texture, math } = pop;

const texture = new Texture("./resources/skeleton/Sprites/Skeleton.png")
// const idle = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Idle_32.png");
// const run = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Run_32.png");
// const attack_1 = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Attack_1.png");
// const attack_2 = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Attack_2.png");
// const attack_3 = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Attack_3.png");
// const attack_4 = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Attack_4.png");
// const dodge = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Dodge.png");
// const jump = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Jump.png");
// const damaged = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Take_Damage.png");
// const death = new Texture("./resources/Meow-Knight/Meow-Knight/Meow-Knight_Death.png");


// const animations = {
//     "idle":idle, 
//     "run":run,
//     "attack_1":attack_1,
//     "attack_2":attack_2,
//     "attack_3":attack_3,
//     "attack_4":attack_4,
//     "dodge":dodge,
//     "jump":jump,
//     "damaged":damaged,
//     "death":death
// }

class Baddie extends TileSprite {
    constructor(target) {
        super(texture, 32, 32);
        this.pos = {x:0, y: 0};
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: 2, y: 2 };
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
        this.target = target
        // this.controls = controls
        this.hitBox = {x: 8, y: 8, w: 16, h: 16}
        const{anims} = this

        anims.add("idle_reg", [0, 1, 2, 3].map(x => ({x, y:0})), .1)
        anims.play("idle_reg")

    }

    update(dt) {
        super.update(dt)

        if(this.pos.x < this.target.pos.x){
            this.pos.x += dt * 60
        }
        
        if(this.pos.x > this.target.pos.x){
            this.pos.x -= dt * 60
        }

        if(this.pos.y < this.target.pos.y){
            this.pos.y += dt * 60
        }

        if(this.pos.y > this.target.pos.y){
            this.pos.y -= dt * 60
        }

        }
}

export default Baddie; 