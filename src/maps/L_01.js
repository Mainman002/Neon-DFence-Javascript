// Map Array
import {L_00, L_01, L_02, L_03, L_04, L_05, L_06, L_07, L_08, L_09} from '.maps.js';

// Collisions
import {Collision} from './src/modules/collisions.js';

// Enemies
import {
    RedEnemy, 
    BlueEnemy, 
    GreenEnemy} from './src/modules/enemies.js';

// Towers
import {
    TowerTile, 
    Tower1_UP1, Tower1_UP2, Tower1_UP3, 
    Tower2_UP1, Tower2_UP2, Tower2_UP3,
    Tower3_UP1, Tower3_UP2, Tower3_UP3,
    Tower4_UP1, Tower4_UP2, Tower4_UP3,
    Tower5_UP1, Tower5_UP2, Tower5_UP3,
    Tower6_UP1, Tower6_UP2, Tower6_UP3, Towers,} from './src/modules/towers.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 1088;
    canvas.height = 640;

    const maps = [L_00, L_01, L_02, L_03, L_04, L_05, L_06, L_07, L_08, L_09];

    const towerTypes = [TowerTile, 
        Tower1_UP1, Tower1_UP2, Tower1_UP3, 
        Tower2_UP1, Tower2_UP2, Tower2_UP3,
        Tower3_UP1, Tower3_UP2, Tower3_UP3,
        Tower4_UP1, Tower4_UP2, Tower4_UP3,
        Tower5_UP1, Tower5_UP2, Tower5_UP3,
        Tower6_UP1, Tower6_UP2, Tower6_UP3];

    const mouse = {
        pos:{x:0, y:0},
        size:{w:0.2, h:0.2},
        activeTower:18,
        click:false,
    }

    const img_smooth = false;

    // Graphic sharpness
    ctx.mozImageSmoothingEnabled = img_smooth;
    ctx.msImageSmoothingEnabled = img_smooth;
    ctx.imageSmoothingEnabled = img_smooth;

    window.addEventListener('mousedown', function(e) {
        mouse.click = true;

        const cellSize = 64;
        const gridPositionX = mouse.pos.x - (mouse.pos.x % cellSize);
        const gridPositionY = mouse.pos.y - (mouse.pos.y % cellSize);
        let pos = {x:0, y:0};
  
        for (let i = 0; i < game.towers.length; i++){
            if (mouse.click && game.towers[i] && game.towers[i].pos.x === gridPositionX && game.towers[i].pos.y === gridPositionY){
                pos = {x:game.towers[i].pos.x, y:game.towers[i].pos.y};
                mouse.click = false;

                if (game.towers[i].type === 0){
                    console.log("Base")
                    game.towers.splice(i, 1);
                    i--;
                    game.instance(game.towers, towerTypes[mouse.activeTower], {x:pos.x, y:pos.y});
                    i++;
                } else {
                    console.log("Tile")
                    game.towers.splice(i, 1);
                    i--;
                    game.instance(game.towers, TowerTile, {x:pos.x, y:pos.y});
                }

            }
        }
    });

    window.addEventListener('mousemove', function(e) {
        mouse.pos.x = e.clientX - canvas.getBoundingClientRect().x;
        mouse.pos.y = e.clientY - canvas.getBoundingClientRect().y;
    });

    window.addEventListener('mouseup', function(e) {
        mouse.click = false;
    });

    window.addEventListener('mouseleave', function(e) {
        mouse.pos.x = null;
        mouse.pos.y = null;

        this.mouse.click = false;
    });


    // Main Game Class ----------------------------------------
    class Game {
        constructor(ctx, size){
            this.canvas = canvas;
            this.ctx = ctx;
            this.size = size;

            this.energy = 0;
            this.memory = 0;

            this.enemyInterval = 500;
            this.enemyTimer = 0;
            this.enemies = [];
            this.enemyTypes = [RedEnemy, BlueEnemy, GreenEnemy];

            this.towers = [];

            this.level = new maps[1];
            this.towerArr = this.level.towerArr;

        }

        init(){
            for(let y = 0; y < this.towerArr.length; ++y) {    
                for(let x = 0; x < this.towerArr[y].length; ++x) {        
                    if (this.towerArr[y][x]){
                        this.instance(this.towers, towerTypes[this.towerArr[y][x]-1], {x:64*x, y:64*y});
                    }
                }
            }
        }

        update(deltaTime){
            if (this.enemyTimer > this.enemyInterval){
                // this.#addNewEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer++ * deltaTime;
            }
            this.towers.forEach(ob => ob.update(deltaTime));
            // this.enemies.forEach(ob => ob.update(deltaTime));
        }
        draw(){
            this.towers.forEach(ob => ob.draw(ctx));

            ctx.globalAlpha = 1;
            ctx.textAlign = 'left';
            ctx.fillStyle = 'Gold';
            ctx.font = `${32}px ${'Noto Sans'}`;
            ctx.fillText(`Energy: ${Math.round(game.energy)}`, 780, 40);
            ctx.fillText(`Memory: ${Math.round(game.memory)}`, 780, 80);

            // this.enemies.forEach(ob => ob.draw(ctx));

            // Show Mouse Position
            // game.ctx.fillRect(mouse.pos.x, mouse.pos.y, 32,32);
        }

        #addNewEnemy(){
            const randomEnemy = Math.floor(Math.random() * (Math.floor(this.enemyTypes.length) - Math.ceil(0))) + Math.ceil(0);
            this.instance(this.enemies, this.enemyTypes[randomEnemy]);

            this.enemies.sort(function(a,b){
                return a.pos.y - b.pos.y;
            });
        }

        instance(_list, _ob, _pos){
            if (_ob !== null){
                _list.push(new _ob(this, _pos));
            }
        }

        removeEnemy(){
            this.enemies = this.enemies.filter(ob => !ob.markedForDeletion)
        }

    }


    // Update loop ---------------------------------------
    const game = new Game(ctx, {w:canvas.width, h:canvas.height});
    game.init();
    let lastTime = 1;
    function animate(timeStamp){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.drawImage(background, 0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }
    animate();


    // Helper functions ----------------------------------
    function print(_msg){
        console.log(_msg);
    }


});

