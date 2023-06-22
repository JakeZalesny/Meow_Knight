import pop from "../pop/index.js";
const { Game, KeyControls } = pop;
// import TitleScreen from "./screens/TitleScreen.js";
import Overworld1Screen from "./resources/Levels/Overworld1Screen.mjs";

const game = new Game(128 * 32, 128 * 32); //Don't know how to make dynamic; must match Tiled map stats.
const controls = {
  keys: new KeyControls()
};

const defaults = () => ({
  newGame: true,
  level: 1,
  doors: { "1": true },
  data: {},
  hp: 5,
  score: 0,
  spawn: null
});

let state = defaults();

// function title () {
//   state = defaults();
//   game.setScene(
//     new TitleScreen(game, controls, () => startGame(1)),
//     0
//   );
// }
// function startGame(toLevel, spawn) {
//   state.level = toLevel;
//   state.spawn = spawn;

//   game.setScene( //worry about later
//     new GameScreen(game, controls, state, {
//       onLevel: startGame,
//       onReset: title
//     })
//   );
// }

// title();
game.setScene(new Overworld1Screen(game, controls, state));
game.run();
