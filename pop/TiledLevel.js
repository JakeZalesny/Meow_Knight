import TileMap from "./TileMap.js";
import tiledParser from "../../pop/utils/tiledParser.js";
import Texture from "./Texture.js";

import pop from "../pop/index.js";
const { TileMap, Texture, tiledParser } = pop;

const texture = new Texture("./resources/Forest BETA V2/Forest Props.png"); //TODO abstract this
//PROBELM: must have every single image for the game in a single tilesheet.


class TiledLevel extends TileMap {
  constructor(data, parsed) {
    if (!parsed) {
      data = tiledParser(data);
    }

    const { tileW, tileH, mapW, mapH, tiles } = data;
    super(tiles, mapW, mapH, tileH, tileW, texture);

    // this.spawns = parsed ? data.spawns : this.getSpawnLocations(data); //TODO use this for baddie spawns
  }

  getSpawnLocations(data) {
    return  {
      player: data.getObjectByName("Hero", true),
    //   baddies: [
    //     ...data.getObjectsByType("Ghost"), // TODO use these for baddies
    //     ...data.getObjectsByType("Spikes"),
    //     ...data.getObjectsByType("Bat"),
    //     ...data.getObjectsByType("Totem")
    //   ],
    //   pickups: data.getObjectsByType("Pickup"),
    //   doors: data.getObjectsByType("Door") //Use for desructible objects maybe?
    };
  }

  //There was something I've removed that made disappearing tiled; may need for 

//   serialize(game) {
//     const { player, pickups, baddies, triggers } = game;
//     const { mapW, mapH, tileW, tileH, children } = this;
//     const tiles = children.map(({ frame }) => Object.assign({}, frame));
//     const spawns = {
//       baddies: baddies.children
//         .filter(b => b.serialize)
//         .map(b => b.serialize()),
//       pickups: pickups.children.map(({ pos: { x, y } }) => ({ x, y })),
//       doors: triggers.children.map(t => t.serialize()),
//       player: { x: player.pos.x, y: player.pos.y }
//     };

//     const level = {
//       mapW,
//       mapH,
//       tileW,
//       tileH,
//       tiles,
//       spawns
//     };
//     return level;
//   }
}

export default TiledLevel;