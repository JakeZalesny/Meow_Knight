import Container from "../../pop/Container.js"
import pop from "./pop/index.js";
import Player from "./entities/player/player.mjs";
import MouseControls from "./pop/controls/MouseControls.js";
import Baddie from "./entities/baddies/baddie.mjs";
import constants from "./constants/constants.mjs";
import TiledLevel from "./pop/TiledLevel.js";

class GameScreen extends Container {
    constructor() {
        super()
        
        const player = new Player(controls, mousecontrols);
        const camera = scene.add(new Camera(player, {w: w, h: h}, {w: level.w, h: level.h}))
        camera.add(level)
        player.pos = {x: w / 4 + 140, y: h / 4};
        
        
        const baddie = new Baddie(player, 1, goblin_animations, goblin_animations["idle"]);
        baddie.pos = {x: w/4 , y: h/4}
        
        camera.add(player);
        camera.add(baddie)
        
    }


        
const { Game, KeyControls, Camera, entity, math } = pop;

//move into Overworld1Screen
// import Level from "./resources/Levels/testLevel.mjs";
const {goblin_animations} = constants; 

const game = new Game(window.innerWidth, window.innerHeight - 4);
const {scene, w, h} = game; 
// const level = new Level(6 * 4, h * 4) //This is where I must put my level.
const controls = new KeyControls(); 
const mousecontrols = new MouseControls(); 



}