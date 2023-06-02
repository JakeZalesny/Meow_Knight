import pop from "../../pop/index.js";
const { TileSprite, Texture, math, entity } = pop;

const texture = new Texture("./resources/skeleton/Sprites/Skeleton.png")

class Baddie extends TileSprite {
    constructor(target, speed) {
        super(texture, 32, 32);
        this.pos = {x:0, y: 0};
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: 2, y: 2 };
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
        this.target = target
        this.speed = speed
        this.agro = false
        this.hitBox = {x: 8, y: 8, w: 16, h: 16}
        
        const{anims} = this

        anims.add("idle_reg", [0, 1, 2, 3].map(x => ({x, y:0})), .1)
        anims.play("idle_reg")

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

            
            if(this.pos.x < this.target.pos.x - this.target.hitBox.w * 3.8){
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

export default Baddie; 