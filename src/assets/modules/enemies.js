    // Enemy Main Class ---------------------------------------
    export default class Enemy {
        constructor(game){
            this.game = game;
            this.path = game.level.path;

            this.path_goal = 1;
            this.reached_goal = {x:false, y:false};
            this.dir = true;
            this.health = 10;
            this.MySpeed = 0.07; // Slowest = 0.06 Fastest = 1.0
            this.markedForDeletion = false;

            // print(this.game);
        }

        damage(_dmg){
            this.health -= _dmg;
            // if (this.health > _dmg + this.health){
            //     this.health -= _dmg;
            // } 

            if (this.health <= 1){
                this.health = 0;
                this.markedForDeletion = true;
                this.game.removeEnemy();
            }
        }

        update(deltaTime){
            if (!this.reached_goal.x){
                if (this.pos.x < this.path[this.path_goal].x){
                    // this.pos.x++;
                    this.pos.x += Math.floor(this.MySpeed * deltaTime);
                } 

                if (this.pos.x > this.path[this.path_goal].x){
                    // this.pos.x--;
                    this.pos.x -= Math.floor(this.MySpeed * deltaTime);
                }

                if (this.pos.x === this.path[this.path_goal].x) this.reached_goal.x = true;
            }

            if (!this.reached_goal.y){
                if (this.pos.y < this.path[this.path_goal].y){
                    // this.pos.y++;
                    this.pos.y += Math.floor(this.MySpeed * deltaTime);
                } 

                if (this.pos.y > this.path[this.path_goal].y){
                    // this.pos.y--;
                    this.pos.y -= Math.floor(this.MySpeed * deltaTime);
                }

                if (this.pos.y === this.path[this.path_goal].y) this.reached_goal.y = true;
            }

             if(this.dir && this.reached_goal.x && this.reached_goal.y){
                if (this.path_goal < this.path.length){
                    this.path_goal++;
                    this.reached_goal.x = false;
                    this.reached_goal.y = false;
                } 
                if (this.path_goal === this.path.length){
                    this.path_goal = 1;
                    this.pos.x = this.path[0].x;
                    this.pos.y = this.path[0].y;
                    this.reached_goal.x = false;
                    this.reached_goal.y = false;
                }
            }

            this.Animate(deltaTime);

            // Remove enemy from list
            // if (this.pos.x < -this.size.w) this.markedForDeletion = true, this.game.removeEnemy();
        }

        Animate(deltaTime){
            if (this.frameTimer > this.frameInterval){
                if (this.frame.x < this.frameLimits.x_max){
                    this.frame.x++;
                } else {
                    this.frame.x = this.frameLimits.x_min;
                }

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
    export class Enemy_01 extends Enemy {
        constructor(game, pos){
            super(game);
            this.health = 10;
            this.image = enemy_sprites;
            this.spriteSize = {w:128, h:128}
            this.scale = 0.5;
            this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
            this.frameInterval = 12;
            this.frameTimer = 0;
            this.frame = {x:0, y:0};
            this.frameLimits = {x_min:0, x_max:1, y_min:0, y_max:0};
            this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
            this.pos = {x:pos.x, y:pos.y}
            this.speed = {x: Math.random() * 0.2 + 1.2, y: Math.random() * 0.1 + 1.0};
            // this.speed = {x: 1, y:10};
            this.angle = 0;
            this.curve = Math.random() * 0.1 + 0.4
            // this.dir = false;
        }

    } 


    // Enemy Blue Class
    export class Enemy_02 extends Enemy {
        constructor(game, pos){
            super(game);
            this.health = 20;
            this.image = enemy_sprites;
            this.spriteSize = {w:128, h:128}
            this.scale = 0.5;
            this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
            this.frameInterval = 8;
            this.frameTimer = 0;
            this.frame = {x:2, y:0};
            this.frameLimits = {x_min:2, x_max:3, y_min:0, y_max:0};
            this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
            this.pos = {x:pos.x, y:pos.y}
            this.speed = {x:Math.random() * 0.1 + 0.1, y:0};
            this.angle = 0;
            this.curve = Math.random() * 0.1 + 0.4
        }

        // update(deltaTime){
        //     super.update(deltaTime);
        //     this.pos.y += Math.sin(this.angle) * this.curve * deltaTime;
        //     this.angle += 0.003 * deltaTime;
        // }

        // draw(){
        //     this.game.ctx.globalAlpha = 0.5;
        //     super.draw(this.game.ctx);
        //     this.game.ctx.globalAlpha = 1.0;
        // }

    }


    // Enemy Green Class
    export class Enemy_03 extends Enemy {
        constructor(game, pos){
            super(game);
            this.health = 30;
            this.image = enemy_sprites;
            this.spriteSize = {w:128, h:128}
            this.scale = 0.5;
            this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
            this.frameInterval = 8;
            this.frameTimer = 0;
            this.frame = {x:4, y:0};
            this.frameLimits = {x_min:4, x_max:5, y_min:0, y_max:0};
            this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
            this.pos = {x:pos.x, y:pos.y}
            this.speed = {x:Math.random() * 0.1 + 0.1, y:0};
            this.angle = 0;
            this.curve = Math.random() * 0.1 + 0.4
        }

    }


     // Enemy Green Class
     export class Enemy_04 extends Enemy {
        constructor(game, pos){
            super(game);
            this.health = 40;
            this.image = enemy_sprites;
            this.spriteSize = {w:128, h:128}
            this.scale = 0.5;
            this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
            this.frameInterval = 8;
            this.frameTimer = 0;
            this.frame = {x:7, y:0};
            this.frameLimits = {x_min:6, x_max:7, y_min:0, y_max:0};
            this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
            this.pos = {x:pos.x, y:pos.y}
            this.speed = {x:Math.random() * 0.1 + 0.1, y:0};
            this.angle = 0;
            this.curve = Math.random() * 0.1 + 0.4
        }

    }


        // Enemy Green Class
    export class Enemy_05 extends Enemy {
        constructor(game, pos){
            super(game);
            this.health = 50;
            this.image = enemy_sprites;
            this.spriteSize = {w:128, h:128}
            this.scale = 0.5;
            this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
            this.frameInterval = 8;
            this.frameTimer = 0;
            this.frame = {x:0, y:1};
            this.frameLimits = {x_min:0, x_max:1, y_min:0, y_max:0};
            this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
            this.pos = {x:pos.x, y:pos.y}
            this.speed = {x:Math.random() * 0.1 + 0.1, y:0};
            this.angle = 0;
            this.curve = Math.random() * 0.1 + 0.4
        }

    }


       // Enemy Green Class
       export class Enemy_06 extends Enemy {
        constructor(game, pos){
            super(game);
            this.health = 60;
            this.image = enemy_sprites;
            this.spriteSize = {w:128, h:128}
            this.scale = 0.5;
            this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
            this.frameInterval = 8;
            this.frameTimer = 0;
            this.frame = {x:2, y:1};
            this.frameLimits = {x_min:2, x_max:3, y_min:0, y_max:0};
            this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
            this.pos = {x:pos.x, y:pos.y}
            this.speed = {x:Math.random() * 0.1 + 0.1, y:0};
            this.angle = 0;
            this.curve = Math.random() * 0.1 + 0.4
        }

    }


       // Enemy Green Class
       export class Enemy_07 extends Enemy {
        constructor(game, pos){
            super(game);
            this.health = 70;
            this.image = enemy_sprites;
            this.spriteSize = {w:128, h:128}
            this.scale = 0.5;
            this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
            this.frameInterval = 8;
            this.frameTimer = 0;
            this.frame = {x:4, y:1};
            this.frameLimits = {x_min:4, x_max:5, y_min:0, y_max:0};
            this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
            this.pos = {x:pos.x, y:pos.y}
            this.speed = {x:Math.random() * 0.1 + 0.1, y:0};
            this.angle = 0;
            this.curve = Math.random() * 0.1 + 0.4
        }

    }