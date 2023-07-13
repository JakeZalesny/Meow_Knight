
import pop from "./pop/index.js";
import GameScreen from "./Screens/GameScreen.mjs"
const { Game, KeyControls, MouseControls } = pop;

const game = new Game(window.innerWidth, window.innerHeight - 4);
const controls = new KeyControls(); 
const mousecontrols = new MouseControls();

const screen = new GameScreen(controls, game, mousecontrols)

screen.init()
game.scene.add(screen)  
game.run();