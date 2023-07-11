import pop from "../../pop/index.js";
const {
    Assets,
    Camera,
    Container,
    entity,
    OneUp,
    State,
    Text,
    Texture,
    TileSprite,
    Timer,
    ParticleEmitter
} = pop;
import TiledLevel from "../../pop/TiledLevel.js";
import TiledLevelMulti from "../../pop/TiledLevelMulti.js";
// import Player from "../entities/Player.js";
// import Pickup from "../entities/Pickup.js";
// import Bat from "../entities/Bat.js";
// import Door from "../entities/Door.js";
// import Ghost from "../entities/Ghost.js";
// import Spikes from "../entities/Spikes.js";
// import Totem from "../entities/Totem.js";

class Overworld1 extends Container {
    constructor(camera) {
        super();
        //Removed gamestate param as well (check all lower stuff)
        //   this.screens = screens; //Removed screens parameter (check all lower stuff)

        this.camera = camera;

        // Either load from url or memory
        const levelUrl = `resources/Levels/ForestOverworld.tmj`; //if more levels, implement different
        //   const levelUrl = `resources/Levels/Overworld${gameState.level}.tmj`; //if more levels, implement different
        //   const serialized = gameState.data[gameState.level]; //No serialization
        //   const level = serialized
        //     ? Promise.resolve(serialized)
        //     : Assets.json(levelUrl);

        const level = Assets.json(levelUrl);
        this.level = level; 
        //   console.log(level);;
        this.levelmap;

    }

    async init() {
        await this.level.then(json => this.setupLevel(json, this.camera));
        
        this.loaded = true;    
    }

    setupLevel(json, camera) {
        // console.log(json);
        // console.log(parsed);
        // const { camera, controls } = this; //removed gamestate param

        // const map = new TiledLevel(json);
        this.levelmap = new TiledLevelMulti(json); 

        //   const player = new Player(controls, map, gameState.hp); //TODO this is the player
        //   player.pos.copy(map.spawns.player);

        camera.worldSize = { w: this.levelmap.w, h: this.levelmap.h }; //Thus, need a mapw and maph in the LevelMulti class.
        // console.log(camera.worldSize);
        //   camera.setSubject(player);

        // Add the layers in the correct Z order
        this.levelmap.background.map(tileLayer => {camera.children.unshift(tileLayer)}); //Modifed to be a map over each TileMap.
        this.levelmap.foreground.map(tileLayer => {camera.add(tileLayer)}); //Modifed to be a map over each TileMap.
        //NOTE: this could possible be incorrect and I should be adding the TiledLevelMulti to the camera.
        //If that is the case, then... I woud need the correct update methods? Other methods?
        //For example, this does not handle the EntitiesLayer at all.
        //Then again, maybe I don't need to because TiledLevel the original doesn't handle it either? It *does* have all the data.
        
        //And also, we seem to be hnalding entities outside of the tilemap mostly anyways?

        
        //   this.triggers = camera.add(new Container());
        //   this.pickups = camera.add(new Container());
        //   this.player = camera.add(player);
        //   this.baddies = camera.add(new Container());
        //   this.bullets = camera.add(new Container());
        //   this.fx = camera.add(new Container());

        // Add level pickups


        // Add level bad guys
        //   map.spawns.baddies.forEach(data => {
        //     const { type, x, y, properties = {} } = data;
        //     const b = this.baddies.add(this.makeBaddie(type));
        //     if (properties.speed) {
        //       b.vel.x = properties.speed;
        //     }
        //     b.pos.set(x, y);
        //   });

        // Add level doors
        //   map.spawns.doors.forEach(door => {
        //     const d = this.triggers.add(this.makeDoor(door));
        //     d.pos.copy(door);
        //   });

        //   const p = new TileSprite(texture, 48, 48);
        //   p.scale.x = 0.4;
        //   p.scale.y = 0.4;
        //   p.frame.x = 6;
        //   p.frame.y = 2;

        //   this.pe = this.fx.add(new ParticleEmitter(25, p));
    }

    // makeBaddie(type) {
    //   const { baddies, player, map } = this;
    //   let e;
    //   switch (type) {
    //     case "Totem":
    //       e = new Totem(player, b => {
    //         this.addAfter.push(b);
    //         return b;//return baddies.add(b);
    //       });
    //       break;
    //     case "Ghost":
    //       e = new Ghost(map);
    //       break;
    //     case "Spikes":
    //       e = new Spikes();
    //       break;
    //     case "Bat":
    //       e = new Bat(player);
    //       break;
    //     default:
    //       console.warn("Sorry, I don't know that bad guy:", type);
    //   }
    //   return e;
    // }

    // makeDoor(door) {
    //   const { gameState, map, screens, player } = this;

    //   const { toLevel, spawnX, spawnY } = door.properties;
    //   const t = new Door(door.properties, () => {
    //     gameState.doors[toLevel] = true;
    //     gameState.data[gameState.level] = map.serialize(this);
    //     gameState.hp = player.hp;
    //     screens.onLevel(toLevel, false, {
    //       x: spawnX,
    //       y: spawnY
    //     });
    //   });

    //   // Set door tile
    //   const doorOpen = gameState.doors[toLevel];
    //   const tile = map.tileAtPixelPos(door);
    //   tile.frame.walkable = doorOpen;
    //   tile.frame.x = doorOpen ? 1 : 0;
    //   tile.frame.y = 4;

    //   return t;
    // }

    // openDoors() {
    //   const { map, gameState } = this;
    //   map.spawns.doors.forEach(door => {
    //     const frame = this.map.tileAtPixelPos(door).frame;
    //     gameState.doors[door.properties.toLevel] = true;
    //     frame.x = 1;
    //     frame.y = 4;
    //     frame.walkable = true;
    //   });
    // }

    // playerWasHit(baddie) {
    //   const { player, pe, game, camera } = this;

    //   if (baddie.type === "Spikes" && !baddie.deadly) {
    //     return;
    //   }

    //   if (player.hitBy(baddie)) {
    //     pe.play(entity.center(player));
    //     //this.setHearts();
    //     if (player.gameOver) {
    //       this.state.set("GAMEOVER");
    //     }
    //     camera.shake(9);

    //     // Hit lag.
    //     this.add(
    //       new Timer(
    //         0.5,
    //         p => (game.speed = (1 - p) * 2 + 1),
    //         () => (game.speed = 1)
    //       )
    //     );
    //   }

    //   switch (baddie.type) {
    //     case "Bullet":
    //       baddie.dead = true;
    //       break;
    //   }
    // }

    update(dt, t) {
        const { controls, player } = this; //removed state
        const { keys } = controls;

        //   switch (state.get()) {
        //     case "LOADING":
        //       this.scoreText.text = "...";
        //       if (this.loaded) {
        //         state.set("READY");
        //       }
        //       break;

        //     case "READY":
        //       if (state.first) {
        //         this.game.speed = 1;
        //         this.scoreText.text = "GET READY";
        //       }
        //       if (state.time > 2) {
        //         this.scoreText.text = "0";
        //         state.set("PLAYING");
        //       }
        //       break;

        // case "PLAYING":
        super.update(dt, t);
        this.updatePlaying(dt, t);
        //       break;

        //     case "GAMEOVER":
        //       if (state.first) {
        //         player.gameOver = true;
        //       }
        //       super.update(dt, t);

        //       // If player dead, wait for space bar
        //       if (keys.action) {
        //         this.screens.onReset();
        //       }
        //       break;
        //   }

        // TMP hack! Will explain soon...
        //   if (this.addAfter.length) {
        //     this.addAfter.forEach(b => this.baddies.add(b));
        //     this.addAfter = [];
        //   }

        //   state.update(dt); //No state
    }

    updatePlaying() { //unnecessary for now
        //   const { baddies, player } = this; //removed triggers

        //   baddies.map(b => {
        //     // Baddie hit the player
        //     if (entity.hit(player, b)) {
        //       this.playerWasHit(b);
        //     }
        //   });

        //   // Touched a door
        //   entity.hits(player, triggers, trigger => trigger.trigger());

        //   // Collect pickup!
        //   entity.hits(player, pickups, pickup => this.gotPickup(pickup));
    }
}

export default Overworld1;