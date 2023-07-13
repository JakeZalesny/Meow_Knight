import Camera from "../pop/Camera.js";
import Container from "../pop/Container.js";
import entity from "../pop/utils/entity.js";
import Player from "../entities/player/player.mjs";
import Goblin from "../entities/baddies/goblin.mjs";
import BlueWitch from "../entities/NPCs/blue-witch.mjs"
import Mushroom from "../entities/baddies/mushroom.mjs";
import FlyingEye from "../entities/baddies/flyingeye.mjs";
import Overworld1 from "../resources/Levels/Overworld1.mjs";
import heart_player from "../entities/heart.mjs"
import Jumbo from "../entities/baddies/jumbo.mjs";

class GameScreen extends Container {
    constructor(controls, game, mousecontrols) {
        super()
        
        const camera = new Camera(null, {w:game.w, h:game.h})

        const overworld = new Overworld1(camera)
        this.overworld = overworld; 

        const player = new Player(controls, mousecontrols) //pass it  overworld.levelmap,
        
        this.add(camera)
        this.game = game

        this.flying_eyes = []
        this.goblins = []
        this.mushrooms = []

        player.pos = {x: 50, y: 60};

        //Enemies Initialization
        const goblin_right_1 = new Goblin(player, {x: 1520, y: 280})
        const goblin_right_2 = new Goblin(player, {x: 1500, y: 400})
        const goblin_path = new Goblin(player, {x: 100, y: 430})
        const goblin_castle_1 = new Goblin(player, {x: 3650, y: 950})
        const goblin_castle_2 = new Goblin(player, {x: 3470, y: 950})
        this.goblins.push(goblin_right_1)
        this.goblins.push(goblin_right_2)
        this.goblins.push(goblin_path)
        this.goblins.push(goblin_castle_1)
        this.goblins.push(goblin_castle_2)

        this.player_hearts = []
        this.heart = new heart_player(null)
        this.heart_2 = new heart_player(null)
        this.heart_3 = new heart_player(null)
        this.heart_4 = new heart_player(null)
        this.heart_5 = new heart_player(null)
        this.heart_6 = new heart_player(null)
        this.player_hearts.push(this.heart)
        this.player_hearts.push(this.heart_2)
        this.player_hearts.push(this.heart_3)
        this.player_hearts.push(this.heart_4)
        this.player_hearts.push(this.heart_5)
        this.player_hearts.push(this.heart_6)

        
        const mushroom_middle_1 = new Mushroom(player, {x: 500, y: 500})
        const mushroom_lower_2 = new Mushroom(player, {x: 900, y: 1205})
        const mushroom_maze_1 = new Mushroom(player, {x: 1500, y: 730})
        const mushroom_castle = new Mushroom(player, {x: 3100, y: 330})
        this.mushrooms.push(mushroom_middle_1)
        this.mushrooms.push(mushroom_lower_2)
        this.mushrooms.push(mushroom_maze_1)
        this.mushrooms.push(mushroom_castle)

        //jumbo initialization
        this.jumbo = new Jumbo(player, {x: 2900, y:950})


        const flying_eye_lower_1 = new FlyingEye(player, {x: 500, y: 1201})
        const flying_eye_lower_2 = new FlyingEye(player, {x: 700, y: 1250})
        const flying_eye_lower_3 = new FlyingEye(player, {x: 600, y: 1220})
        const flying_eye_tree_1 = new FlyingEye(player, {x: 500, y:20})
        const flying_eye_tree_2 = new FlyingEye(player, {x: 790, y:50})
        const flying_eye_tree_3 = new FlyingEye(player, {x: 800, y:90})
        const flying_eye_castle_1 = new FlyingEye(player, {x: 3400, y: 390})
        const flying_eye_castle_2 = new FlyingEye(player, {x: 3400, y: 490})
        const flying_eye_castle_3 = new FlyingEye(player, {x: 3750, y: 490})
        const flying_eye_castle_4 = new FlyingEye(player, {x: 3750, y: 390})
        this.flying_eyes.push(flying_eye_lower_1)
        this.flying_eyes.push(flying_eye_lower_2)
        this.flying_eyes.push(flying_eye_lower_3)
        this.flying_eyes.push(flying_eye_tree_1)
        this.flying_eyes.push(flying_eye_tree_2)
        this.flying_eyes.push(flying_eye_tree_3)
        this.flying_eyes.push(flying_eye_castle_1)
        this.flying_eyes.push(flying_eye_castle_2)
        this.flying_eyes.push(flying_eye_castle_3)
        this.flying_eyes.push(flying_eye_castle_4)

        //NPC initialization
        const b_witch = new BlueWitch(player)
        b_witch.pos = {x: 5, y: 50}

        
        
        this.player = player
        this.b_witch = b_witch
        this.camera = camera

    }

    async init() {

        await this.overworld.init();
        // console.log(this.overworld);
        // console.log(this.overworld.loaded);
        this.player.init(this.overworld.levelmap), //this calls too early?

        this.camera.setSubject(this.player)     
        this.camera.add(this.b_witch)
        this.camera.add(this.player)
        this.camera.add(this.jumbo)
        // this.camera.add(this.heart)
        // this.camera.add(this.goblin)
        // this.camera.add(this.mushroom)
        // this.camera.add(this.flying_eye)
        this.flying_eyes.forEach(flying_eye => this.camera.add(flying_eye))
        this.goblins.forEach(goblin => this.camera.add(goblin))
        this.mushrooms.forEach(mushroom => this.camera.add(mushroom))
        this.player_hearts.forEach(heart=> this.camera.add(heart))
        // let player_hearts = this.player.hearts

        // player_hearts.forEach(heart => {this.camera.add(heart)})



        /// fades into game when start
        this.camera.flash(1, "#000")
    }
    
    update(dt,t) {
        
        super.update(dt, t)
        // this.heart.pos = {x:this.player.pos.x + 10, y:this.player.pos.y + 17}
        let dx = 38
        this.player_hearts.forEach(heart=>{
            heart.pos = {x:this.player.pos.x + dx, y:this.player.pos.y + 17}
            dx -=12
            // console.log(dx)
            // console.log(heart.pos)
        })
        // console.log("Lives: ")   
        // console.log(`Camera Log: ${this.player.hearts}`)
        if(this.player.doDamage) {
            this.goblins.forEach(goblin => {
                if(entity.hurtToHit(this.player, goblin) && goblin.canBeDamaged && this.player.doDamage) {
                    goblin.canBeDamaged = false
                    goblin.lives -= 1 }
                
                else if(entity.hurtToHit(this.player, goblin) && goblin.lives <= 0) goblin.dead = true 
            })  
            this.flying_eyes.forEach(flying_eye => {
                if(entity.hurtToHit(this.player, flying_eye) && flying_eye.canBeDamaged && this.player.doDamage) {
                    flying_eye.canBeDamaged = false
                    flying_eye.lives -= 1
                }

                else if(entity.hurtToHit(this.player, flying_eye) && flying_eye.lives <= 0) flying_eye.dead = true 
            })
            this.mushrooms.forEach(mushroom => {
                if(entity.hurtToHit(this.player, mushroom) && mushroom.canBeDamaged && this.player.doDamage) {
                    mushroom.canBeDamaged = false
                    mushroom.lives -= 1
                }

                else if(entity.hurtToHit(this.player, mushroom) && mushroom.lives <= 0) mushroom.dead = true
            })
            if(entity.hurtToHit(this.player, this.jumbo) && this.jumbo.canBeDamaged && this.player.doDamage) {
                this.jumbo.canBeDamaged = false
                this.jumbo.lives -=1
            }

        }

        //adds slight camera shake when a mushroom attakcs
        this.mushrooms.forEach(mushroom => {
            if(mushroom.attacking && mushroom.frame.y == 5 && !mushroom.dead) {
                this.camera.shake(2, .5)
            }
        })

        if(this.jumbo.attacking && this.jumbo.frame.y == 5 && !this.jumbo.dead) {
            this.camera.shake(4, .5)
        }
    }
}

export default GameScreen