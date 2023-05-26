import pop from "./pop/index.js";
const { Game, KeyControls, Camera } = pop;
import Player from "./entities/player/player.mjs";
import entity from "./pop/utils/entity.js";
import Level from "./resources/Levels/testLevel.mjs";

const game = new Game(window.innerWidth - 8, window.innerHeight - 20);
const {scene, w, h} = game; 
const level = new Level(w * 4, h * 4)
const controls = new KeyControls(); 

const player = new Player(controls);
player.pos = {x: w / 2, y: h / 2};




const camera = scene.add(new Camera(player, {w: w, h: h}, {w: level.w, h: level.h}))

camera.add(level)
camera.add(player); 



    

game.run();