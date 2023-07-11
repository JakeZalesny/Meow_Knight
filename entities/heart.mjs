import pop from "../../pop/index.js";
import Sprite from "../../pop/Sprite.js";
const { TileSprite, Texture, math } = pop;

const heart = new Texture("./resources/Hearts/Hearts/PNG/animated/border/heart_animated_1.png")

class heart_player extends TileSprite {
    constructor(pos) {
        super(heart, 18, 17)
        const{anims} = this
        this.pos = pos;
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: 2, y: 2 };
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
    }

    update(dt) {
        super.update(dt)

    }
}

export default heart_player; 