import Texture from "../pop/Texture.js";

const goblin_idle = new Texture("./resources/Monsters_Creatures_Fantasy/Monsters_Creatures_Fantasy/Goblin/Idle.png");
const goblin_run = new Texture("./resources/Monsters_Creatures_Fantasy/Monsters_Creatures_Fantasy/Goblin/Run.png");
const goblin_attack = new Texture("./resources/Monsters_Creatures_Fantasy/Monsters_Creatures_Fantasy/Goblin/Attack.png");
const goblin_hit = new Texture("./resources/Monsters_Creatures_Fantasy/Monsters_Creatures_Fantasy/Goblin/Take-Hit.png")

const goblin_animations = {
    "idle":goblin_idle,
    "run":goblin_run,
    "attack":goblin_attack,
    "hit":goblin_hit
};

export default {
    goblin_animations
}