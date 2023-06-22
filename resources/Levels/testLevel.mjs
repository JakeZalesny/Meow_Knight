import Texture from "../../pop/Texture.js"
import TileMap from "../../pop/TileMap.js"
import math from "../../pop/utils/math.js"

// const texture = new Texture("/resources/PixiVan Forest (Beta)/Ground Tileset.png");

class Level extends TileMap {
    constructor(w, h) {
        const tileSize = 64
        const mapW = Math.floor(w/tileSize)
        const mapH = Math.floor(h/tileSize)

        const tileIndexes = [
            {id: "Grass", x: 0, y:0}
        ]


        const level = Array(mapW * mapH).fill(0)

        super(
            level.map(i => tileIndexes[i]),
            mapW,
            mapH,
            tileSize,
            tileSize,
            texture
        )
    }
}

export default Level