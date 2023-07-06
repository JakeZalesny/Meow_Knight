import pop from "../../pop/index.js";
const { TileSprite, Texture, math, entity, Timer } = pop;

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
        this.agro_offset = {right:0, left:0, up:0, down:0}
        this.agroRange = 200
        this.canBeDamaged = true
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
            // Attack Right
            if(this.pos.x < this.target.pos.x + this.agro_offset.right){
            this.pos.x +=  dt * 60 * this.speed
        }
            // Attack Left
            if(this.pos.x > this.target.pos.x + this.agro_offset.left){
            this.pos.x -= dt * 60 * this.speed
        }
            //Attack Down
            if(this.pos.y < this.target.pos.y + this.agro_offset.down){
            this.pos.y += dt * 60 * this.speed
        }

            // Attack Up
            if(this.pos.y > this.target.pos.y + this.agro_offset.up){
            this.pos.y -= dt * 60 * this.speed
        }
    }

    // makes damageble again after
    console.log(this.canBeDamaged)
        if(this.canBeDamaged == false)
        {
            if(this.target.frame.y = 0){
                this.canBeDamaged = true
            }
        }
        
        }
}

export default Baddie; 