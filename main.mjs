import pop from "./pop/index.js";
const { Game, KeyControls } = pop;
import Player from "./entities/player/player.mjs";

const game = new Game(window.innerWidth, window.innerHeight);
const {scene, w, h} = game; 

const controls = new KeyControls(); 

for(let i = 0; i < 30; i++) {
    const player = new Player(controls);
    player.pos = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    scene.add(player); 
}

game.run();