import pop from "../../pop/index.js";
const { TileSprite, Texture, math, entity } = pop;

class NPC extends TileSprite {
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

        
        
        }
}

export default NPC; 