import pop from "./pop/index.js";
const { Game, KeyControls, Camera, entity, math } = pop;
import Player from "./entities/player/player.mjs";
import Level from "./resources/Levels/testLevel.mjs";
import Baddie from "./entities/baddies/baddie.mjs";
import Container from "./pop/Container.js";

const game = new Game(window.innerWidth, window.innerHeight - 4);
const {scene, w, h} = game; 
const level = new Level(w * 4, h * 4)
const controls = new KeyControls(); 


const player = new Player(controls);
player.pos = {x: w / 2, y: h / 2};

const camera = scene.add(new Camera(player, {w: w, h: h}, {w: level.w, h: level.h}))
camera.add(level)

const baddie = new Baddie(player, 1)
baddie.pos = {x: w/2 + 200, y: h/2 + 100}


// for(let i = 0; i < 10; i++) {
//     const baddy = camera.add(new Baddie(player, math.randf(1, 2)))
//     baddy.pos = {x:math.rand(w), y:math.rand(h)}
// }


camera.add(player);
camera.add(baddie)




    

game.run();