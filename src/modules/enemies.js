    // Enemy Main Class ---------------------------------------
    export default class Enemy {
        constructor(game){
            this.game = game;
            this.markedForDeletion = false;
            // print(this.game);
        }

        update(deltaTime){
            this.pos.x -= this.speed.x * deltaTime;
            if (this.pos.y < 0) this.pos.y = 0;
            if (this.pos.y > this.game.size.h-this.size.h) this.pos.y = this.game.size.h-this.size.h;

            // Animate SpriteSheet
            if (this.frame.x < this.frameLimits.x_max){
                this.frame.x++;
                this.Animate(deltaTime);
            } else {
                this.frame.x = 0;
            }

            // Remove enemy from list
            if (this.pos.x < -this.size.w) this.markedForDeletion = true, this.game.removeEnemy();
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
            ctx.drawImage(this.image, 
                this.frameCurrent.x, this.frameCurrent.y, this.spriteSize.w, this.spriteSize.h, 
                this.pos.x, this.pos.y, this.size.w, this.size.h);
        }

    }


    // Enemy Red Class
    export class RedEnemy extends Enemy {
        constructor(game){
            super(game);
            this.image = enemy_sprites;
            this.spriteSize = {w:256, h:256}
            this.frameInterval = 8;
            this.frameTimer = 0;
            this.frame = {x:0, y:0};
            this.frameLimits = {x_min:0, x_max:3, y_min:0, y_max:0};
            this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
            this.pos = {x:game.size.w, y:game.size.h}
            this.scale = 0.3;
            this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
            this.speed = {x:Math.random() * 0.1 + 0.1, y:0};
        }

    } 


    // Enemy Blue Class
    export class BlueEnemy extends Enemy {
        constructor(game){
            super(game);
            this.image = enemy_sprites;
            this.spriteSize = {w:256, h:256}
            this.scale = 0.3;
            this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
            this.frameInterval = 8;
            this.frameTimer = 0;
            this.frame = {x:0, y:1};
            this.frameLimits = {x_min:0, x_max:3, y_min:0, y_max:0};
            this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
            this.pos = {x:game.size.w, y:Math.random() * game.size.h-this.size.h+this.scale}
            this.speed = {x:Math.random() * 0.1 + 0.1, y:0};
            this.angle = 0;
            this.curve = Math.random() * 0.1 + 0.4
        }

        update(deltaTime){
            super.update(deltaTime);
            this.pos.y += Math.sin(this.angle) * this.curve * deltaTime;
            this.angle += 0.003 * deltaTime;
        }

        draw(){
            this.game.ctx.globalAlpha = 0.5;
            super.draw(this.game.ctx);
            this.game.ctx.globalAlpha = 1.0;
        }

    }


    // Enemy Green Class
    export class GreenEnemy extends Enemy {
        constructor(game){
            super(game);
            this.image = enemy_sprites;
            this.spriteSize = {w:256, h:256}
            this.frameInterval = 5;
            this.frameTimer = 0;
            this.frame = {x:0, y:2};
            this.frameLimits = {x_min:0, x_max:3, y_min:0, y_max:0};
            this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
            this.pos = {x:game.size.w, y:0}
            this.scale = 0.3;
            this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
            this.speed = {x:Math.random() * 0.1 + 0.1, y:0};
        }

    }