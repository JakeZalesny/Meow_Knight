import pop from "../../pop/index.js";
import NPC from "./npc.mjs";
const { TileSprite, Texture, math, entity } = pop;

const bw_idle = new Texture("./resources/Blue-Witch/B_Witch_Idle_64_2.png")

class BlueWitch extends NPC {
    constructor(target) {
        super(bw_idle, 80, 64);
        this.texture = bw_idle
        this.pos = {x:0, y: 0};
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: 2.0, y: 2.0};
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
        this.target = target; 
        this.hitBox = {x: 8, y: 8, w: 16, h: 16}
        const{anims} = this
        anims.add("idle", [0, 1, 2, 3, 4].map(y => ({x:0, y})), 0.1)
        anims.play("idle")

    }
    
    update(dt, t) {
        super.update(dt, t)
    }

}

export default BlueWitch; 