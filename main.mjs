import pop from "./pop/index.js";
const { Game, KeyControls, Camera, entity, math } = pop;

//move into Overworld1Screen
import Player from "./entities/player/player.mjs";
// import Level from "./resources/Levels/testLevel.mjs";
import MouseControls from "./pop/controls/MouseControls.js";
import Baddie from "./entities/baddies/baddie.mjs";
import constants from "./constants/constants.mjs";
const {goblin_animations} = constants; 
import TiledLevel from "./pop/TiledLevel.js";

const game = new Game(window.innerWidth, window.innerHeight - 4);
const {scene, w, h} = game; 
// const level = new Level(6 * 4, h * 4) //This is where I must put my level.
const controls = new KeyControls(); 
const mousecontrols = new MouseControls(); 

const player = new Player(controls, mousecontrols);
player.pos = {x: w / 4 + 140, y: h / 4};

const camera = scene.add(new Camera(player, {w: w, h: h}, {w: level.w, h: level.h}))
camera.add(level)

const baddie = new Baddie(player, 1, goblin_animations, goblin_animations["idle"]);
baddie.pos = {x: w/4 , y: h/4}

camera.add(player);
camera.add(baddie)

entity.addDebug(baddie)
entity.addDebug(player)


game.run(() => {
    if(entity.hit(player, baddie)) player.dead = true
    if (player.doDamage) {
        if(entity.hurtToHit(player, baddie)) baddie.dead = true
    }

});