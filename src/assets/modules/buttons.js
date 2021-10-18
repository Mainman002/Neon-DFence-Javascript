// Towers
export class TowerButton {
    constructor(game){
        this.game = game;
        this.ctx = game.ctx;

        this.type = 1;
        this.spriteSize = {w:256, h:256};
        this.frame = {x:0, y:256*3};
        this.pos = {x:256, y:512};
        this.size = {w:128, h:128};
        this.angle = 45 * Math.PI / 180.0;

        this.markedForDeletion = false;
        // print(this.game);
    }

    #drawBevelOutline(_x, _y, _w, _h, _r, _color, _a){
        this.ctx.beginPath();
    
        this.ctx.strokeStyle = _color;
        this.ctx.globalAlpha = _a;
    1
        // Set faux rounded corners
        this.ctx.lineJoin = "round";
        this.ctx.lineWidth = _r;
    
        // Stroke Outline
        this.ctx.strokeRect(_x+(_r/2), _y+(_r/2), _w-_r, _h-_r);
        
        this.ctx.closePath();
        this.ctx.globalAlpha = 1.0;
    
      }

    update(deltaTime){
        if (this.game.mouse.pos.x > this.pos.x && this.game.mouse.pos.x < this.pos.x + this.size.w){
            if (this.game.mouse.pos.y > this.pos.y && this.game.mouse.pos.y < this.pos.y + this.size.h){
                if (this.game.mouse.click){
                    this.game.mouse.activeTower = this.type;
                }
            }
        }
    }

    draw(ctx){
        this.ctx.drawImage(this.image, 
            this.frameCurrent.x, this.frameCurrent.y, this.spriteSize.w, this.spriteSize.h, 
            this.pos.x, this.pos.y, this.size.w, this.size.h);

        if (this.game.mouse.activeTower === this.type) {
            this.#drawBevelOutline(this.pos.x, this.pos.y, this.size.w, this.size.h, 2, 'Green', 1.0);
        }

        if (this.game.mouse.pos.x > this.pos.x && this.game.mouse.pos.x < this.pos.x + this.size.w){
            if (this.game.mouse.pos.y > this.pos.y && this.game.mouse.pos.y < this.pos.y + this.size.h){

                this.#drawBevelOutline(this.pos.x, this.pos.y, this.size.w, this.size.h, 2, 'Red', 1.0);
                
            }
        }

    }
}


// No Tile
export class TowerRemoveButton extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 0;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:1, y:0};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.pos = {x:pos.x, y:pos.y}
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
    }

    // update(deltaTime){
    //     if (this.game.mouse && this.game.mouse.click){
    //         if (Collision(this.pos, this.game.mouse.pos)){
    //             this.markedForDeletion = true;
    //         }
    //     }
    // }
}


// Base Tile
export class TowerButton_0_UP0 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 1;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:1, y:0};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.pos = {x:pos.x, y:pos.y}
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
    }

    // update(deltaTime){
    //     if (this.game.mouse && this.game.mouse.click){
    //         if (Collision(this.pos, this.game.mouse.pos)){
    //             this.markedForDeletion = true;
    //         }
    //     }
    // }
}


// Towers 1
export class TowerButton_1_UP1 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 2;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:1, y:1};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 1
export class TowerButton_1_UP2 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 3;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:2, y:1};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 1
export class TowerButton_1_UP3 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 4;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:3, y:1};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 2
export class TowerButton_2_UP1 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 5;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:1, y:2};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 2
export class TowerButton_2_UP2 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 6;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:2, y:2};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 2
export class TowerButton_2_UP3 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 7;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:3, y:2};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 3
export class TowerButton_3_UP1 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 8;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:1, y:3};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 3
export class TowerButton_3_UP2 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 9;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:2, y:3};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 3
export class TowerButton_3_UP3 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 10;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:3, y:3};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 4
export class TowerButton_4_UP1 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 11;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:1, y:4};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 4
export class TowerButton_4_UP2 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 12;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:2, y:4};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 4
export class TowerButton_4_UP3 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 13;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:3, y:4};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 5
export class TowerButton_5_UP1 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 14;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:1, y:5};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 5
export class TowerButton_5_UP2 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 15;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:2, y:5};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 5
export class TowerButton_5_UP3 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 16;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:3, y:5};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 6
export class TowerButton_6_UP1 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 17;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:1, y:6};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 6
export class TowerButton_6_UP2 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 18;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:2, y:6};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 6
export class TowerButton_6_UP3 extends TowerButton{
    constructor(game, pos){
        super(game);
        this.type = 19;
        this.animated = false;
        this.image = button_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:3, y:6};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }
}

















