function tiledParserMulti(json) {
  const {
    tilewidth: tileW,
    tileheight: tileH,
    width: mapW,
    height: mapH,
    layers,
    tilesets
  } = json;

//   console.log(layers);

  const getLayer = name => {
    const layer = layers.find(l => l.name === name);
    if (!layer) {
      throw new Error(`Tiled error: Missing layer "${name}".`);
    }
    return layer;
  };

  const getLayersByType = name => {
    const filtered = layers.filter(l => l.type == name); //THIS IS MINE
    return filtered;
  };  

  const getLayersByClass = name => {
    const filtered = layers.filter(l => l.class == name); //THIS IS MINE
    return filtered;
  };  

  const getTileset = idx => {
    if (!tilesets || !tilesets[idx]) {
      throw new Error(`Tiled error: Missing tileset index ${idx}`);
    }
    return tilesets[idx];
  };

  const getTilesetByName = name => {
    const tileset = tilesets.find(t => t.name == name);
    if (!tilesets) {
      throw new Error(`Tiled error: Missing tileset index ${idx}`); //THIS IS MINE
    }
    return tileset;
  };

//   const levelLayer = getLayer("Level"); //TODO change this to expect Floor, and BG(X). GetTileLayers and then not 'name'
//   const levelLayers = getLayersByType('tilelayer');
  const backgroundLayers = getLayersByClass('background')
  const foregroundLayers = getLayersByClass('foreground')

  const entitiesLayer = getLayer("Entities");       //instead map and 'const layers.find l.type == tileLayer. 
  const entities = entitiesLayer.objects.map(       //Actually, not a find. We want a 'filter' I think.
    ({ x, y, width, height, properties, type, name }) => ({
      x,
      y: y - height, // Fix tiled Y alignment
      width,
      height,
      properties,
      type,
      name
    })
  );

  const getObjectsByType = (type, mandatory = false) => {
    const es = entities.filter(o => o.type === type);
    if (!es.length && mandatory) {
      throw new Error(`Tiled error: Missing an object of type "${type}"`);
    }
    return es;
  };

  const getObjectByName = (name, mandatory = false) => {
    const e = entities.find(o => o.name === name);
    if (!e && mandatory) {
      throw new Error(`Tiled error: Missing named object "${name}"`);
    }
    return e;
  };

  // Map the Tiled level data to our game format
  const tileset = getTileset(0);                    //Possible key to multi-tileset amps? Not going to worry over it. Would need tilesheets on individual layers.
  const props = tileset.tileproperties; // Extra tile properties: walkable, clouds
  const tilesPerRow = Math.floor(tileset.imagewidth / tileset.tilewidth);
//   const tiles = levelLayer.data.map(cell => {                                //TODO this is going to change; will be an array of layers
//     const idx = cell - tileset.firstgid; // Get correct Tiled offset            //since levelLayer = getLayer("Level"). levellayers.map( layer-> layer.data.map(cell...))?
//     return Object.assign({}, props && props[idx] || {}, {
//       x: idx % tilesPerRow,
//       y: Math.floor(idx / tilesPerRow)
//     });
//   });

  const BGTileLayers = backgroundLayers.map(layer => layer.data.map(cell => {                                //TODO this is going to change; will be an array of layers
    const idx = cell - tileset.firstgid; // Get correct Tiled offset            //since levelLayer = getLayer("Level"). levellayers.map( layer-> layer.data.map(cell...))?
    return Object.assign({}, props && props[idx] || {}, {
      x: idx % tilesPerRow,
      y: Math.floor(idx / tilesPerRow)
    });
  }));
  const FGTileLayers = foregroundLayers.map(layer => layer.data.map(cell => {                                //TODO this is going to change; will be an array of layers
    const idx = cell - tileset.firstgid; // Get correct Tiled offset            //since levelLayer = getLayer("Level"). levellayers.map( layer-> layer.data.map(cell...))?
    return Object.assign({}, props && props[idx] || {}, {
      x: idx % tilesPerRow,
      y: Math.floor(idx / tilesPerRow)
    });
  }));

//   console.log(tileLayers);

  return {
    tileW,
    tileH,
    mapW,
    mapH,
    // tiles,
    //tileLayers
    // levelLayers, //TODO remove tileLayers?
    BGTileLayers, //Could consider also exporting the entire levelLayers? Yes. Need that too. 'levelLayers.' and then change
    FGTileLayers, //Could consider also exporting the entire levelLayers? Yes. Need that too. 'levelLayers.' and then change
    //Or rather, needs the 'tilesets' data so it can find 'unwalkable' proerties, for example.
    foregroundLayers,
    backgroundLayers,
    

    getObjectByName,
    getObjectsByType,
    getTilesetByName
  };
}

export default tiledParserMulti;
