import pop from "./pop/index.js";
const { Game, KeyControls, Camera, entity } = pop;
import Player from "./entities/player/player.mjs";
import Level from "./resources/Levels/testLevel.mjs";
import Baddie from "./entities/baddies/baddie.mjs";

const game = new Game(window.innerWidth, window.innerHeight - 4);
const {scene, w, h} = game; 
const level = new Level(w * 4, h * 4)
const controls = new KeyControls(); 

const player = new Player(controls);
player.pos = {x: w / 2, y: h / 2};

const baddie = new Baddie(player)
baddie.pos = {x: w/2, y: h/2}





const camera = scene.add(new Camera(player, {w: w, h: h}, {w: level.w, h: level.h}))

camera.add(level)
camera.add(player); 
camera.add(baddie)



    

game.run();