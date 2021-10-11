// Collisions
import {Collision} from '../../src/modules/collisions.js';

// Towers
export class Towers {
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

    update(deltaTime){
        if (this.rotate){
            this.angle += 5 * Math.PI / 180.0;
        }

        // Animate SpriteSheet
        if (this.animated === true){
            if (this.frame.x < this.frameLimits.x_max){
                this.frame.x++;
                this.Animate(deltaTime);
            } else {
                this.frame.x = 0;
            }
        }
    }

    Animate(deltaTime){
        if (this.frameTimer > this.frameInterval){
            this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
            this.frameTimer = 0;
        } else {
            this.frameTimer++ * deltaTime;
        }
    }

    draw(ctx){
        if (this.rotate){
            ctx.save();
            ctx.translate(this.pos.x+32, this.pos.y+32);
            ctx.rotate(this.angle);
            ctx.drawImage(this.image, 
                this.frameCurrent.x, this.frameCurrent.y, this.spriteSize.w, this.spriteSize.h, 
                this.pos.x-this.pos.x-this.size.w*0.5, this.pos.y-this.pos.y-this.size.h*0.5, this.size.w, this.size.h);
            ctx.restore();

        } else {
            this.ctx.drawImage(this.image, 
                this.frameCurrent.x, this.frameCurrent.y, this.spriteSize.w, this.spriteSize.h, 
                this.pos.x, this.pos.y, this.size.w, this.size.h);
        }
    }
}


// Base Tile
export class TowerTile extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 0;
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:0, y:0};
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
export class Tower1_UP1 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:1, y:1};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 0 * Math.PI / 180.0;
        this.rotate = true;
    }

    // update(deltaTime){
    //     if (this.rotate){
    //         this.angle += 5 * Math.PI / 180.0;
    //     }
    // }
}


export class Tower1_UP2 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:2, y:1};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 90 * Math.PI / 180.0;
        this.rotate = true;
    }
}


export class Tower1_UP3 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128};
        this.frame = {x:3, y:1};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 180 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 2
export class Tower2_UP1 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:1, y:2};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 90 * Math.PI / 180.0;
        this.rotate = true;
    }
}


export class Tower2_UP2 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:2, y:2};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 90 * Math.PI / 180.0;
        this.rotate = true;
    }
}


export class Tower2_UP3 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:3, y:2};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 90 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 3
export class Tower3_UP1 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:1, y:3};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 90 * Math.PI / 180.0;
        this.rotate = true;
    }
}


export class Tower3_UP2 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:2, y:3};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 90 * Math.PI / 180.0;
        this.rotate = true;
    }
}


export class Tower3_UP3 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:3, y:3};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 90 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 4
export class Tower4_UP1 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:1, y:4};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 90 * Math.PI / 180.0;
        this.rotate = true;
    }
}


export class Tower4_UP2 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:2, y:4};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 90 * Math.PI / 180.0;
        this.rotate = true;
    }
}


export class Tower4_UP3 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:3, y:4};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 90 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 5
export class Tower5_UP1 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:1, y:5};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 90 * Math.PI / 180.0;
        this.rotate = true;
    }
}


export class Tower5_UP2 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:2, y:5};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = 90 * Math.PI / 180.0;
        this.rotate = true;
    }
}


export class Tower5_UP3 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:3, y:5};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
        this.pos = {x:pos.x, y:pos.y}
        this.angle = -45 * Math.PI / 180.0;
        this.rotate = true;
    }
}


// Towers 6
export class Tower6_UP1 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = true;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frameInterval = 5;
        this.frameTimer = 0;
        this.frame = {x:2, y:6};
        this.frameLimits = {x_min:0, x_max:4, y_min:0, y_max:0};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.pos = {x:pos.x, y:pos.y}
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
    }

    update(deltaTime){
        this.game.energy += 0.0002 * deltaTime;

        // Animate SpriteSheet
        if (this.animated === true){
            if (this.frame.x < this.frameLimits.x_max){
                this.frame.x++;
                this.Animate(deltaTime);
            } else {
                this.frame.x = 0;
            }
        }
    }
}


export class Tower6_UP2 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = true;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frameInterval = 5;
        this.frameTimer = 0;
        this.frame = {x:1, y:7};
        this.frameLimits = {x_min:0, x_max:4, y_min:0, y_max:0};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.pos = {x:pos.x, y:pos.y}
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
    }

     update(deltaTime){
        this.game.energy += 0.0005 * deltaTime;
        this.game.memory += 0.00005 * deltaTime;
        
        // Animate SpriteSheet
        if (this.animated === true){
            if (this.frame.x < this.frameLimits.x_max){
                this.frame.x++;
                this.Animate(deltaTime);
            } else {
                this.frame.x = 0;
            }
        }
    }
}


export class Tower6_UP3 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = true;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frameInterval = 5;
        this.frameTimer = 0;
        this.frame = {x:1, y:8};
        this.frameLimits = {x_min:0, x_max:4, y_min:0, y_max:0};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.pos = {x:pos.x, y:pos.y}
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
    }

    update(deltaTime){
        this.game.energy += 0.0010 * deltaTime;
        this.game.memory += 0.0001 * deltaTime;
        
        // Animate SpriteSheet
        if (this.animated === true){
            if (this.frame.x < this.frameLimits.x_max){
                this.frame.x++;
                this.Animate(deltaTime);
            } else {
                this.frame.x = 0;
            }
        }
    }
}


