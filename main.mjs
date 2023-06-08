import GameScreen from "./src/screens/GameScreen.js"
import KeyControls from "./pop/controls/KeyControls.js"
import Game from "./pop/Game.js"
import MouseControls from "./pop/controls/MouseControls.js"

const game = new Game(window.innerWidth, window.innerHeight - 4)

const controls = new KeyControls(); 
const mousecontrols = new MouseControls();

game.scene = new GameScreen(controls, game, mousecontrols) 

game.run();