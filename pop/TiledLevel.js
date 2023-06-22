// import TileMap from "./TileMap.js";
// import tiledParser from "../../pop/utils/tiledParser.js";
// import Texture from "./Texture.js";

import pop from "../pop/index.js";
const { TileMap, Texture, tiledParser } = pop;

const texture = new Texture("./resources/map_images/ForestProps.png"); //TODO abstract this
//PROBELM: must have every single image for the game in a single tilesheet.


class TiledLevel extends TileMap { //TiledLevel doesn't extend TIleMap, instead just imports it and makes multiple, 
  constructor(data) {           //lays them on top of each other and renders tem in order? Extend COntainer? And then has child tilemaps.
    // if (!parsed) {
    //   data = tiledParser(data);
    // }

    const { tileW, tileH, mapW, mapH, tiles } = tiledParser(data); //Mhh... 'tiles' array is actually going to be a dict or array of arrays
    // console.log(tiles); //Edit TiledParser to return all level layers; floor, BG, FBG, (FG? )
    // console.log(mapW);
    // console.log(mapH);
    // console.log(tileH);
    // console.log(tileW);
    // console.log(texture); //Can we extract texture from tiledParser? Eh, safer to not.
    super(tiles, mapW, mapH, tileH, tileW, texture); //I'm getting an idea: Tilemap can pull from multiple textures? And pull Texture from embedded sheets.

    // this.spawns = parsed ? data.spawns : this.getSpawnLocations(data); //TODO use this for baddie spawns
  }

  getSpawnLocations(data) {
    return  {
    //   player: data.getObjectByName("PlayerSpawn", true),
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