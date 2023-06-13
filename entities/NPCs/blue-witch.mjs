import pop from "../../pop/index.js";
import NPC from "./npc.mjs";
const { TileSprite, Texture, math, entity } = pop;

class BlueWitch extends NPC {
    constructor(width, height, texture) {
        super(texture, width, height);
        this.pos = {x:0, y: 0};
        this.anchor = { x: 0, y: 0 };
        this.scale = { x: 2, y: 2 };
        this.pivot = { x: 0, y: 0 };
        this.rotation = 0;
        this.hitBox = {x: 8, y: 8, w: 16, h: 16}
        const{anims} = this

    }
}