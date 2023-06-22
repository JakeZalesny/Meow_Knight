
import pop from "./pop/index.js";
import GameScreen from "./Screens/GameScreen.mjs"
const { Game, KeyControls, MouseControls } = pop;

const game = new Game(window.innerWidth, window.innerHeight - 4);
// const level = new Level(w * 4, h * 4)
const controls = new KeyControls(); 
const mousecontrols = new MouseControls();

const screen = new GameScreen(controls, game, mousecontrols)

game.scene.add(screen)  
// const player = new Player(controls, mousecontrols);
// player.pos = {x: w / 4 + 140, y: h / 4};

// const camera = scene.add(new Camera(player, {w: w, h: h}, {w: level.w, h: level.h}))
// camera.add(level)

// const baddie = new Goblin(player)
// baddie.pos = {x: w/4 , y: h/4}

// camera.add(player);
// camera.add(baddie)

// // entity.addDebug(baddie)
// // entity.addDebug(player)

const controls = new KeyControls(); 
const mousecontrols = new MouseControls();


game.run(() => {
    // if(entity.hit(player, baddie)) player.dead = true
    // if (player.doDamage) {
    //     if(entity.hurtToHit(player, baddie)) baddie.dead = true
    // }

game.run();