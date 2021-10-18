// Map Array
import {L_00, L_01, L_02, L_03, L_04, L_05, L_06, L_07, L_08, L_09, L_10, L_11, L_12} from '../src/assets/maps/maps.js';

// Enemies
import {
    Enemy_01, Enemy_02, Enemy_03, Enemy_04, Enemy_05, Enemy_06, Enemy_07,
} from '../src/assets/modules/enemies.js';

// Towers
import {
    TowerTile, 
    Tower1_UP1, Tower1_UP2, Tower1_UP3, 
    Tower2_UP1, Tower2_UP2, Tower2_UP3,
    Tower3_UP1, Tower3_UP2, Tower3_UP3,
    Tower4_UP1, Tower4_UP2, Tower4_UP3,
    Tower5_UP1, Tower5_UP2, Tower5_UP3,
    Tower6_UP1, Tower6_UP2, Tower6_UP3, Towers,} from '../src/assets/modules/towers.js';

// Tower Select Buttons
import {
    TowerButton_0_UP0,
    TowerButton_1_UP1, TowerButton_1_UP2, TowerButton_1_UP3,
    TowerButton_2_UP1, TowerButton_2_UP2, TowerButton_2_UP3,
    TowerButton_3_UP1, TowerButton_3_UP2, TowerButton_3_UP3,
    TowerButton_4_UP1, TowerButton_4_UP2, TowerButton_4_UP3,
    TowerButton_5_UP1, TowerButton_5_UP2, TowerButton_5_UP3,
    TowerButton_6_UP1, TowerButton_6_UP2, TowerButton_6_UP3,
    } from '../src/assets/modules/buttons.js';

window.addEventListener('load', function(){
    const bgCtx = bg.getContext('2d');
    const weaponCtx = weapon.getContext('2d');
    const ctx = canvas.getContext('2d');
    const interactCtx = interact.getContext('2d');

    canvas.width = 1088;
    canvas.height = 640;

    bg.width = canvas.width;
    bg.height = canvas.height;

    weapon.width = canvas.width;
    weapon.height = canvas.height;

    interact.width = canvas.width;
    interact.height = canvas.height;

    screen_resize(ctx, canvas);
    screen_resize(bgCtx, bg);
    screen_resize(weaponCtx, weapon);
    screen_resize(interactCtx, interact);

    const maps = [L_00, L_01, L_02, L_03, L_04, L_05, L_06, L_07, L_08, L_09, L_10, L_11, L_12];

    const towerTypes = [TowerTile, 
        Tower1_UP1, Tower1_UP2, Tower1_UP3, 
        Tower2_UP1, Tower2_UP2, Tower2_UP3,
        Tower3_UP1, Tower3_UP2, Tower3_UP3,
        Tower4_UP1, Tower4_UP2, Tower4_UP3,
        Tower5_UP1, Tower5_UP2, Tower5_UP3,
        Tower6_UP1, Tower6_UP2, Tower6_UP3];

    const buttonTypes = [TowerButton_0_UP0,
        TowerButton_1_UP1, TowerButton_1_UP2, TowerButton_1_UP3,
        TowerButton_2_UP1, TowerButton_2_UP2, TowerButton_2_UP3,
        TowerButton_3_UP1, TowerButton_3_UP2, TowerButton_3_UP3,
        TowerButton_4_UP1, TowerButton_4_UP2, TowerButton_4_UP3,
        TowerButton_5_UP1, TowerButton_5_UP2, TowerButton_5_UP3,
        TowerButton_6_UP1, TowerButton_6_UP2, TowerButton_6_UP3,
    ];

    window.addEventListener('mousedown', function(e) {
        game.mouse.click = true;

        const cellSize = 64;
        const gridPositionX = game.mouse.pos.x - (game.mouse.pos.x % cellSize);
        const gridPositionY = game.mouse.pos.y - (game.mouse.pos.y % cellSize);
        let pos = {x:0, y:0};
  
        for (let i = 0; i < game.towers.length; i++){
            if (game.mouse.click && game.towers[i] && game.towers[i].pos.x === gridPositionX && game.towers[i].pos.y === gridPositionY){
                pos = {x:game.towers[i].pos.x, y:game.towers[i].pos.y};
                game.mouse.click = false;

                if (game.towers[i].type === 1){
                    console.log("Base")
                    game.towers.splice(i, 1);
                    i--;
                    game.instance(game.towers, towerTypes[game.mouse.activeTower-1], {x:pos.x, y:pos.y});
                    i++;
                } else {
                    if (game.mouse.activeTower === 1) {
                        console.log("Tile")
                        game.towers.splice(i, 1);
                        i--;
                        game.instance(game.towers, TowerTile, {x:pos.x, y:pos.y});
                    }
                }

            }
        }
    });

    window.addEventListener('resize', function(e) {
        screen_resize(ctx, canvas);
        screen_resize(bgCtx, bg);
        screen_resize(weaponCtx, weapon);
        screen_resize(interactCtx, interact);
    });

    window.addEventListener('mousemove', function(e) {
        let bounds = canvas.getBoundingClientRect();
        // get the mouse coordinates, subtract the canvas top left and any scrolling
        game.mouse.pos.x = e.pageX - bounds.left - scrollX;
        game.mouse.pos.y = e.pageY - bounds.top - scrollY;

        // first normalize the mouse coordinates from 0 to 1 (0,0) top left
        // off canvas and (1,1) bottom right by dividing by the bounds width and height
        game.mouse.pos.x /= bounds.width; 
        game.mouse.pos.y /= bounds.height; 

        // then scale to canvas coordinates by multiplying the normalized coords with the canvas resolution
        game.mouse.pos.x *= canvas.width;
        game.mouse.pos.y *= canvas.height;
    });

    window.addEventListener('mouseup', function(e) {
        game.mouse.click = false;
    });

    window.addEventListener('mouseleave', function(e) {
        game.mouse.pos.x = null;
        game.mouse.pos.y = null;

        game.mouse.click = false;
    });

    // window.addEventListener('keydown', function(e) {
    //     switch (e.key){
    //         case '0':
    //             game.mouse.activeTower = 0;
    //             break;
    //     }
    // });


    function screen_resize(_ctx, _canvas){
        const img_smooth = true;
        const border = 100;
        const aspect = {w:6.5, h:4};

        let w = window.innerWidth;
        let h = w * (aspect.h / aspect.w);

        if (h < window.innerHeight){
            // Check window width
            w = window.innerWidth;
            h = w * (aspect.h / aspect.w);
        } else {
            // Check window height
            h = window.innerHeight;
            w = h * (aspect.w / aspect.h);
        }

        _canvas.style.width = `${w - border}px`;
        _canvas.style.height = `${h - border}px`;

        // Graphic sharpness
        _ctx.mozImageSmoothingEnabled = img_smooth;
        _ctx.msImageSmoothingEnabled = img_smooth;
        _ctx.imageSmoothingEnabled = img_smooth;
    }


    // Main Game Class ----------------------------------------
    class Game {
        constructor(ctx, size){
            this.ctx = ctx;
            this.bgCtx = bgCtx;
            this.interactCtx = interactCtx;
            this.weaponCtx = weaponCtx;
            this.size = size;
            this.active_map = 1;

            this.mouse = {
                pos:{x:0, y:0},
                size:{w:0.2, h:0.2},
                activeTower:2,
                click:false,
            }

            this.energy = 0;
            this.memory = 0;

            this.enemyInterval = 80;
            this.enemyTimer = 0;
            this.enemies = [];
            this.enemyTypes = [Enemy_01, Enemy_02, Enemy_03, Enemy_04, Enemy_05, Enemy_06, Enemy_07];

            this.towers = [];
            this.buttons = [];
            this.buttonArr = [    
                [2,3,4],
                [5,6,7],
                [8,9,10],
                [11,12,13],
                [14,15,16],
                [17,18,19],
                [20,21,22], ];

            this.level = new maps[this.active_map];
            this.towerArr = this.level.towerArr;

        }

        add_resource(_energy, _memory){
            if (!this.energy){
                this.energy = 0;
            } 
            
            if (!this.memory){
                this.memory = 0;
            }

            if (_energy){
                this.energy += _energy;
            }
            
            if (_memory){
                this.memory += _memory;
            }
        }

        init(){
            this.add_resource(100, 0);

            if (this.towerArr.length > 0) {
                for (let i = 0; i < this.towerArr.length; ++i){
                    if (towerTypes[this.towerArr[i]-1]) {
                        this.instance(this.towers, towerTypes[this.towerArr[i]-1], {x:(i % 12) * 64, y:Math.floor(i/12) * 64});
                    }
                }
            }

            const start_x = 825;
            const offset_x = 70;
            const start_y = 110;
            const offset_y = 70;

            this.buttons.push(new buttonTypes[0](this, {x:start_x+offset_x*1, y:start_y+offset_y*0}));

            for(let x = 0; x < this.buttonArr[x].length; ++x) {    
                if (this.buttonArr[x]){
                    this.buttons.push(new buttonTypes[x+1](this, {x:start_x+offset_x*x, y:start_y+offset_y*1}));
                    this.buttons.push(new buttonTypes[x+4](this, {x:start_x+offset_x*x, y:start_y+offset_y*2}));
                    this.buttons.push(new buttonTypes[x+3*2+1](this, {x:start_x+offset_x*x, y:start_y+offset_y*3}));
                    this.buttons.push(new buttonTypes[x+3*3+1](this, {x:start_x+offset_x*x, y:start_y+offset_y*4}));
                    this.buttons.push(new buttonTypes[x+3*4+1](this, {x:start_x+offset_x*x, y:start_y+offset_y*5}));
                    this.buttons.push(new buttonTypes[x+3*5+1](this, {x:start_x+offset_x*x, y:start_y+offset_y*6}));
                }
            }
        }

        update(deltaTime){
            if (this.enemyTimer > this.enemyInterval){
                if (this.enemies.length < 30){
                    this.#addNewEnemy();
                }
                this.enemyTimer = 0;
            } else {
                this.enemyTimer++ * deltaTime;
            }
            this.enemies.forEach(ob => ob.update(deltaTime));
            this.towers.forEach(ob => ob.update(deltaTime));
            this.buttons.forEach(ob => ob.update(deltaTime));
        }
        draw(){
            bgCtx.drawImage(this.level.bg, 0,0,canvas.width,canvas.height);

            this.enemies.forEach(ob => ob.draw(ctx));
            this.towers.forEach(ob => ob.draw(ctx));
            this.buttons.forEach(ob => ob.draw(ctx));

            ctx.globalAlpha = 1;
            ctx.textAlign = 'left';
            ctx.fillStyle = 'Gold';
            ctx.font = `${32}px ${'Noto Sans'}`;
            ctx.fillText(`Energy: ${Math.round(this.energy)}`, 780, 40);
            ctx.fillText(`Memory: ${Math.round(this.memory)}`, 780, 80);


            // Show Mouse Position
            // game.ctx.fillRect(this.mouse.pos.x-16, this.mouse.pos.y-16, 32,32);
        }

        #addNewEnemy(){
            const randomEnemy = Math.floor(Math.random() * (Math.floor(this.enemyTypes.length) - Math.ceil(0))) + Math.ceil(0);
            this.instance(this.enemies, this.enemyTypes[randomEnemy], {x:this.level.path[0].x, y:this.level.path[0].y});

            this.enemies.sort(function(a,b){
                return a.pos.y - b.pos.y;
            });
        }

        instance(_list, _ob, _pos){
            if (_ob !== null){
                _list.push(new _ob(this, _pos));
                _list.sort(function(a,b){
                    return a.pos.y - b.pos.y;
                });
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
        weaponCtx.clearRect(0, 0, canvas.width, canvas.height);
        interactCtx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

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

