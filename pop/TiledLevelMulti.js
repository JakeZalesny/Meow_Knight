// import TileMap from "./TileMap.js";
// import tiledParser from "../../pop/utils/tiledParser.js";
// import Texture from "./Texture.js";

import pop from "../pop/index.js";
const { TileMap, Container, Texture } = pop;
import tiledParserMulti from "./utils/tiledParserMulti.js";

const texture = new Texture("./resources/map_images/ForestProps.png"); //TODO abstract this
//PROBELM: must have every single image for the game in a single tilesheet.


class TiledLevelMulti extends Container { //TiledLevel doesn't extend TIleMap, instead just imports it and makes multiple, 
  constructor(data) {           //lays them on top of each other and renders tem in order? Extend COntainer? And then has child tilemaps.
    super();
    // layers = []; //Layers will be an array of 'tiles's, which are arrays pulled from tiledParser
    const { tileW, tileH, mapW, mapH, BGTileLayers, FGTileLayers, backgroundLayers, foregroundLayers, getTilesetByName } = tiledParserMulti(data); //Mhh... 'tiles' array is actually going to be a dict or array of arrays
    // console.log(tileLayers); //Edit TiledParser to return all level layers; floor, BG, FBG, (FG? ) Used to be tileLayers and LevelLayers

    this.mapW = mapW;
    this.mapH = mapH;
    this.tileW = tileW;
    this.tileH = tileH;
    this.w = mapW * tileW;
    this.h = mapH * tileH;

    // console.log(this.w); 
    // console.log(mapW);
    // console.log(mapH);
    // console.log(tileH);
    // console.log(tileW);
    // console.log(texture); //Can we extract texture from tiledParser? Eh, safer to not.

    // console.log("ForestProps2".replace(/[0-9]/g, ''))
    //rule: Tiled Layer names must match the format [FileName]N.png, so we can get the layer's name, remove the number, and then get the right png file for texture..
    this.background = backgroundLayers.map(layer => new TileMap(
        layer.data.map(cell => {          
            const tileset = getTilesetByName(layer.name.replace(/(BG|FG)[0-9]*/g, ''));
            const props = tileset.tileproperties; // Extra tile properties: walkable, clouds
            const tilesPerRow = Math.floor(tileset.imagewidth / tileset.tilewidth);
            const idx = cell - tileset.firstgid; // Get correct Tiled offset            //since levelLayer = getLayer("Level"). levellayers.map( layer-> layer.data.map(cell...))?
            return Object.assign({}, props && props[idx] || {}, {
              x: idx % tilesPerRow,
              y: Math.floor(idx / tilesPerRow)
            });
          }), 
        mapW, 
        mapH, 
        tileW, 
        tileH, 
        new Texture(`./resources/map_images/${layer.name.replace(/(FG|BG)[0-9]*/g, '')}.png`)));
    this.background.reverse()
    
    this.foreground = foregroundLayers.map(layer => new TileMap(
        layer.data.map(cell => {          
            const tileset = getTilesetByName(layer.name.replace(/(BG|FG)[0-9]*/g, ''));
            const props = tileset.tileproperties; // Extra tile properties: walkable, clouds
            const tilesPerRow = Math.floor(tileset.imagewidth / tileset.tilewidth);
            const idx = cell - tileset.firstgid; // Get correct Tiled offset            //since levelLayer = getLayer("Level"). levellayers.map( layer-> layer.data.map(cell...))?
            return Object.assign({}, props && props[idx] || {}, {
              x: idx % tilesPerRow,
              y: Math.floor(idx / tilesPerRow)
            });
          }), 
        mapW, 
        mapH, 
        tileW, 
        tileH, 
        new Texture(`./resources/map_images/${layer.name.replace(/(FG|BG)[0-9]*/g, '')}.png`)));

    //TODO we need the formula for getting the name of the tileset from the layer's name.



    //this is going to need to change/have a new one. mapLayers should be the wole layer (inlcuding name), not just the tiles
    //this.mapLayers = (the levelLayers)
    //then this.mapLayers = ... well, we'll have parallel arrays in tileLayers and levelLayers. Need fixed?
    //Copy the tile map parsing thing, where we did levelLayers.map? And inject that in place of 'layer' in the above formula?



    // console.log(mapLayers);
    // super(tiles, mapW, mapH, tileH, tileW, texture); //I'm getting an idea: Tilemap can pull from multiple textures? And pull Texture from embedded sheets.

    // this.spawns = parsed ? data.spawns : this.getSpawnLocations(data); //TODO use this for baddie spawns
  }

  //functions to pass along to the thing:



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

export default TiledLevelMulti;