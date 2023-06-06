import pop from "../../pop/index.js";
const { TileSprite, Texture, math, entity } = pop;

class Baddie extends TileSprite {
    constructor(target, width, height, texture) {
        super(texture, width, height);
        this.pos = {x:0, y: 0};
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: 2, y: 2 };
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
        this.target = target
        this.speed = 1
        this.agro = false
        this.agroRange = 200
        this.hitBox = {x: 8, y: 8, w: 16, h: 16}
        const{anims} = this

    }

    update(dt, t) {
        super.update(dt, t)

        if(entity.distance(this.target, this) < this.agroRange){
            this.agro = true
        }
        else if(entity.distance(this.target, this) > this.agroRange + 100){
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

export default Baddie; 