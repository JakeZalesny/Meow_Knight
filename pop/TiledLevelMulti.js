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

    this.backgroundLayers = backgroundLayers;
    this.getTilesetByName = getTilesetByName;

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

    // this.propertiesAtPixelPos({x: 6*32, y: 9*32}); //*should* be the doubled-up bush/stump?
    // console.log(this.background); //Need to decide whether to use the background (inject into the original prse code) 
                                //or the pixelPos (need to recalculate the idx?) ('cell' can be mimicked by mapposX + mapW*mapposy)
    
    // console.log(this.propertiesAtPixelPos({x: 6*32, y: 9*32}));

    // console.log(this.isWalkableAtPixelPos({x: 4*32, y: 9*32}));
  }

  //functions to pass along to the thing:


  pixelPosToMapPos(pos) {
    // const { tileW, tileH } = this;
    return {
      x: Math.floor(pos.x / this.tileW),
      y: Math.floor(pos.y / this.tileH)
    };
  }

  mapPosToPixelPos(mapPos) {
    // const { tileW, tileH } = this;
    return {
      x: mapPos.x * this.tileW,
      y: mapPos.y * this.tileH
    };
  }

  tilesAtMapPos(mapPos) {
    return this.background.map(layer => layer[mapPos.y * this.mapW + mapPos.x]);
  }

  tilesAtPixelPos(pos) { //Position is an xy tuple
    const mapPos = this.pixelPosToMapPos(pos) //checking the original pixel pos itself for alpha would occur around here?
    const tilesAtPos = this.backgroundLayers.map(layer => layer.data[mapPos.y * this.mapW + mapPos.x]);
    return tilesAtPos;

    // const getTilesetByName = name => {
    //     const tileset = tilesets.find(t => t.name == name);
    //     if (!tilesets) {
    //       throw new Error(`Tiled error: Missing tileset index ${idx}`); //THIS IS MINE
    //     }
    //     return tileset;
    //   };
    

    // (This is a foreach on 'backgroundLayers) : 
    // layer.data.map(cell => {          
    //     const tileset = getTilesetByName(layer.name.replace(/(BG|FG)[0-9]*/g, ''));
    //     const props = tileset.tileproperties; // Extra tile properties: walkable, clouds
    //     const tilesPerRow = Math.floor(tileset.imagewidth / tileset.tilewidth);
    //     const idx = cell - tileset.firstgid; // Get correct Tiled offset            //since levelLayer = getLayer("Level"). levellayers.map( layer-> layer.data.map(cell...))?
    //     return Object.assign({}, props && props[idx] || {}, {
    //       x: idx % tilesPerRow,
    //       y: Math.floor(idx / tilesPerRow)
    //     });
    //   });

    // return this.tilesAtMapPos(this.pixelPosToMapPos(pos)); //TODO something like this would need to change if we extended TiledLevel fro mTileMap?
  }

  propertiesAtPixelPos(pos) {
    // this.background.map(layer)
    const tilesAtPos = this.tilesAtPixelPos(pos);
    // console.log(tilesAtPos);
    const tilesetsForLayers = this.backgroundLayers.map(layer => this.getTilesetByName(layer.name.replace(/(BG|FG)[0-9]*/g, '')));
    // console.log(tilesetsForLayers);
    // const properties = tilesets.map(tileset => {if () {tileset.tiles[0]}});

    let tilesAtPosAndLayers = [];
    for (let i = 0; i < tilesAtPos.length; i++) {
        tilesAtPosAndLayers.push([tilesAtPos[i], tilesetsForLayers[i]]);
    }
    
    // console.log(tilesAtPosAndLayers);

    const properties2 = tilesAtPosAndLayers.map(item => {try {
        // tile = tileset.tiles.filter(t => t.id == mapPos.y * this.mapW + mapPos.x);
        // return tileset.tiles[1].properties;
        // tileIds =tilesAtPos.map()
        // console.log(item[0]);
        // console.log(item[1].tiles);
        const matchedTile = item[1].tiles.filter(tile => tile.id == (item[0] - item[1].firstgid)); //this needs to be the tiled offest?
        // console.log(tile.id), 

        //so, the issue, is we need to access the first_GID and subract that from the tile value.
        // DO a synchro where we do a forEach? Zip them together?
        // tilesAtPosWithLayers zip them up?
        //The we can do a [0] and [1] to reference.

        // const idx = cell - tileset.firstgid;
        
        return matchedTile[0].properties;
    } catch (error) {
    } });

    // console.log(properties2);

    const properties3 = properties2.filter(layerProp => layerProp !== undefined);
    // console.log(properties3);
    let finalProperties = [];
    properties3.map(propArray => {
        propArray.map(item => finalProperties.push(item));
    });


    // console.log(finalProperties);
    return finalProperties;


    // ALL DEPRECATED STUFF

    // const properties = tilesetsForLayers.map(tileset => {try {
    //         // tile = tileset.tiles.filter(t => t.id == mapPos.y * this.mapW + mapPos.x);
    //         // return tileset.tiles[1].properties;
    //         // tileIds =tilesAtPos.map()
    //         const matchedTile = tileset.tiles.filter(tile => tile.id == 10); //this needs to be the tiled offest?
    //         // console.log(tile.id), 

    //         //so, the issue, is we need to access the first_GID and subract that from the tile value.
    //         // DO a synchro where we do a forEach? Zip them together?
    //         // tilesAtPosWithLayers zip them up?
    //         //The we can do a [0] and [1] to reference.

    //         // const idx = cell - tileset.firstgid;
            
    //         return matchedTile[0].properties;
    //     } catch (error) {
    //     } });
    // console.log(properties);
    // // const tileProperties = properties.map(tile => tile);
    // console.log(tilesetsForLayers[1].tiles); //CAN'T do tileset.tiles(1)(1).
    // console.log(tilesetsForLayers[1].tiles[1].properties)

    // console.log(properties.filter(layerProp => layerProp !== undefined))
  }

  isWalkableAtPixelPos(pos) { // {x: number, y: number}
    let properties = this.propertiesAtPixelPos(pos);
    // console.log(properties);
    let walkable = true;
    properties.map(property => {
        if (property.name == "unwalkable") {
            walkable = false;
        }
    });
    return walkable;
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

export default TiledLevelMulti;