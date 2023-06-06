import TileMap from "../../pop/TileMap.js";
// import tiledParser from "../../pop/utils/tiledParser.js";
import Assets from "../../pop/Assets.js";

class OverworldA extends TileMap {
    constructor(json) {
        const { tileW, tileH, mapW, mapH, tiles } = tiledParser(json);
        super(tiles, mapW, mapH, tileH, tileW, texture);

        // const level = 1;
        // const levelUrl = `resources/Levels/Overworld1.tmj}`;
        // Assets.json(levelUrl)
        //     .then(json => this.setupLevel(json));
    }

    getSpawnLocations(data) {
        return {
            player: data.getObjectByName("PlayerSpawn"), //'Reference 'Hero'
            // enemies: [
            //     data.getObjectsByType("Ghost"), //Reference 'Baddies' //Entities uses Type
            //     data.getObjectsByType("Bat"),
            //     data.getObjectsByType("Totem")
            // ],
            // pickups: data.getObjectsByType("Pickup"),
            entrances: data.getObjectsByType("Entrance") //Reference 'Doors'
        };
    }
}


export default OverworldA;