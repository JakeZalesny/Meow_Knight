import TileMap from "./TileMap.js";
import tiledParser from "../../pop/utils/tiledParser.js";
import Texture from "./Texture.js";

const texture = new Texture("./resources/Forest BETA V2/Forest Props.png"); //TODO abstract this
//PROBELM: must have every single image for the game in a single tilesheet.

class TiledLevel extends TileMap {
    constructor(json) {
        const { tileW, tileH, mapW, mapH, tiles } = tiledParser(json);
        super(tiles, mapW, mapH, tileH, tileW, texture);
    }

    // getSpawnLocations(data) {
    //     return {
    //         player: data.getObjectByName("PlayerSpawn"), //'Reference 'Hero'
    //         // enemies: [
    //         //     data.getObjectsByType("Ghost"), //Reference 'Baddies' //Entities uses Type
    //         //     data.getObjectsByType("Bat"),
    //         //     data.getObjectsByType("Totem")
    //         // ],
    //         // pickups: data.getObjectsByType("Pickup"),
    //         entrances: data.getObjectsByType("Entrance") //Reference 'Doors'
    //     };
    // }
}

export default TiledLevel;