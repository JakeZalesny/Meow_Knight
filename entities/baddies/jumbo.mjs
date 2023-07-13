import pop from "../../pop/index.js";
import Baddie from "./baddie.mjs";
import Mushroom from "./mushroom.mjs";
const { TileSprite, Texture, math, entity, SoundPool } = pop;

const mushroom_run = new Texture("./resources/Monsters_Creatures_Fantasy/Mushroom/Mushroom_Run_64.png") 
const mushroom_idle = new Texture("./resources/Monsters_Creatures_Fantasy/Mushroom/Mushroom_Idle_64.png") 
const mushroom_attack = new Texture("./resources/Monsters_Creatures_Fantasy/Mushroom/Mushroom_attack_1_64.png")
const smash = new SoundPool("./resources/sounds/mushroom.mp3")

const mushroom_animations = {
    "run":mushroom_run,
    "idle":mushroom_idle,
    "attack":mushroom_attack
}

class Jumbo extends Mushroom {
    constructor(target, pos) {
        super(target, pos)
        this.width = 64
        this.height = 64
        this.scale = {x: -5.5, y: 5.5}
        this.texture = mushroom_animations["idle"]
        this.speed = 0.2
        this.agroRange = 400
        this.lives = 24
        const{anims} = this
    }

    update(dt, t) {
        super.update(dt, t)
    }

}

export default Jumbo;