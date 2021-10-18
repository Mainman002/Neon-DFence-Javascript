
// Towers
export class Towers {
    constructor(game){
        this.game = game;
        this.ctx = game.ctx;
        this.interactCtx = game.interactCtx;

        this.near_enemies = [];
        this.sorted_enemies = [];
        this.target = null;

        // this.damage = 0.01;

        this.damage = [0, 
            0.01, 0.02, 0.03,
            0.01, 0.01, 0.01,
            0.08, 0.09, 0.10,
            0.1, 0.11, 0.12,
            0.2, 0.21, 0.22,
            0, 0, 0,
        ];

        this.range = [0, 0, 
            75, 85, 95,
            70, 75, 85,
            200, 300, 400,
            70, 80, 90,
            70, 80, 90,
            0, 0, 0,
        ];

        this.spriteSize = {w:256, h:256};
        this.frame = {x:0, y:256*3};
        this.pos = {x:256, y:512};
        this.size = {w:128, h:128};
        this.angle = 45 * Math.PI / 180.0;

        this.markedForDeletion = false;
        // print(this.game);
    }

     // Linear interpolation of an angle.
     lerpAngle(a, b, step) {
        // Prefer shortest distance,
        const delta = b - a;
        if (delta == 0.0) {
            return a;
        } else if (delta < -Math.PI) {
            b += TWO_PI;
        } else if (delta > Math.PI) {
            a += TWO_PI;
        }
        return (1.0 - step) * a + step * b;
    }

    // distanceSq(object, target) {
    //     let xDif = object.pos.x - target.pos.x;
    //     let yDif = object.pos.y - target.pos.y;
    //     return Math.sqrt((xDif * xDif) + (yDif * yDif));
    // }

    // distanceCheck(x1, y1, x2, y2) {
    //     let a = x1 - x2;
    //     let b = y1 - y2;
    //     let c = Math.sqrt( a*a + b*b );
    //     return c
    // }

    // euclidDistance(x1, x2, y1, y2) {
    //     return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    // }

    getEnemy(_x, _y, _distance, _list) {
        let objects = _list;
        for(let i = 0; i < objects.length; i++) {       
            if(this.distanceCheck(_x, _y, objects[i].pos.x, objects[i].pos.y) <= _distance)
                return objects[i];
        }
        return false;
    }

    // GetFirstPos(_list) {
    //     // console.log("Before: ", _list);
    //     _list.sort(function(a, b){return b.pos.x - a.pos.x});
    //     // console.log("After: ", _list);
    //     return _list
    // }

    // GetLastPos(_list) {

    // }

    // GetStrongestPos(_list) {

    // }

    // GetWeakestPos(_list) {

    // }

    // GetClosestPos(_list) {

    // }

    // GetNoTargetPos(_list) {

    // }

    // determinTarget(_ob){
    //     switch(_ob.target_type){
    //         case _ob.TargetType.First:
    //             return this.GetFirstPos(_ob);

    //         case _ob.TargetType.Last:
    //             return this.GetLastPos(_ob);

    //         case _ob.TargetType.Strongest:
    //             return this.GetStrongestPos(_ob);

    //         case _ob.TargetType.Weakest:
    //             return this.GetWeakestPos(_ob);

    //         case _ob.TargetType.Closest:
    //             return this.GetClosestPos(_ob);

    //         case _ob.TargetType.NoTarget:
    //             return this.GetNoTargetPos(_ob);
    //     }
    // }


    #drawBevelOutline(_ctx, _x, _y, _w, _h, _r, _color, _a){
        _ctx.beginPath();
    
        _ctx.strokeStyle = _color;
        _ctx.globalAlpha = _a;
    1
        // Set faux rounded corners
        _ctx.lineJoin = "round";
        _ctx.lineWidth = _r;
    
        // Stroke Outline
        _ctx.strokeRect(_x+(_r/2), _y+(_r/2), _w-_r, _h-_r);
        
        _ctx.closePath();
        _ctx.globalAlpha = 1.0;
      }

    #drawCircle(_ctx, radius, thickness, color){
        let X = this.pos.x + this.size.w*0.5;
        let Y = this.pos.y + this.size.h*0.5;
        let R = radius;

        if (radius > 0) {
            _ctx.beginPath();
            _ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
            _ctx.lineWidth = thickness;
            _ctx.strokeStyle = color;
            _ctx.stroke();
        }
    }

    #drawLine(_ctx, _ob, thickness, color){
        _ctx.strokeStyle = color;
        _ctx.lineWidth = thickness;

        // draw a red line
        _ctx.beginPath();
        _ctx.moveTo(this.pos.x + this.size.w*0.5, this.pos.y + this.size.h*0.5);
        _ctx.lineTo(_ob.pos.x + _ob.size.w*0.5, _ob.pos.y + _ob.size.h*0.5);
        _ctx.stroke();
    }

    collision(target){
        if (target.pos.x > this.pos.x - this.range[this.type] && target.pos.x < this.pos.x + this.range[this.type]){
            if (target.pos.y > this.pos.y - this.range[this.type] && target.pos.y < this.pos.y + this.range[this.type]){
                return true;
            } else {
                return false;
            }
        }
    }

    target_enemy(){
        if (this.game.enemies.length > 0){
            for (const en of this.game.enemies.entries()) {
                if (this.collision(en[1])) {
                    if (!this.near_enemies.includes(en[1])){
                        this.near_enemies.push(en[1]);
                        if (!this.target) {
                            this.target = en[1];
                        }
                    }
                }

                if (!this.collision(en[1])) {
                    if (this.near_enemies.includes(en[1])){
                        this.near_enemies.splice(en[1], 1);

                        if (en[1] == this.target){
                            this.target = null;
                        }
                    }
                }
            }

            if (this.target){
                let targetAngle = 0.0;
                let currentAngle = 0.0;

                targetAngle = Math.atan2(this.target.pos.y - this.pos.y, this.target.pos.x - this.pos.x);
                currentAngle = this.lerpAngle(currentAngle, targetAngle, 1);
                this.angle = currentAngle;
            }
        }

        if (this.target) {
            if (!this.target.markedForDeletion) {
                this.target.damage(this.damage[this.type]);
            } else {
                this.near_enemies.splice(this.target, 1);
                this.target = null;
            }
        } else {
            this.target = null;

            for (const en of this.game.enemies.entries()) {
                if (this.collision(en[1])) {
                    this.target = en[1];
                }
            }
        }

        if (this.near_enemies.length < 1){
            this.target = null;
        }

    }

    update(deltaTime){
        if (this.rotate){
            this.angle += 1 * Math.PI / 180.0;
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
        if (this.target) {
            this.#drawLine(this.game.weaponCtx, this.target, 3, 'Teal');
        }

        if (this.rotate){
            ctx.save();
            ctx.translate(this.pos.x+32, this.pos.y+32);
            ctx.rotate(this.angle);
            ctx.drawImage(this.image, 
                this.frameCurrent.x, this.frameCurrent.y, this.spriteSize.w, this.spriteSize.h, 
                this.pos.x-this.pos.x-this.size.w*0.5, this.pos.y-this.pos.y-this.size.h*0.5, this.size.w, this.size.h);
            ctx.restore();

        } else {
            this.game.bgCtx.drawImage(this.image, 
                this.frameCurrent.x, this.frameCurrent.y, this.spriteSize.w, this.spriteSize.h, 
                this.pos.x, this.pos.y, this.size.w, this.size.h);
        }

        // mouse hover visualizer
        if (this.game.mouse.pos.x > this.pos.x && this.game.mouse.pos.x < this.pos.x + this.size.w){
            if (this.game.mouse.pos.y > this.pos.y && this.game.mouse.pos.y < this.pos.y + this.size.h){
                
                // Hover Active Placed Towers
                if (this.game.mouse.activeTower > 1) {
                    if (this.type < 1){
                        this.#drawBevelOutline(this.interactCtx, this.pos.x, this.pos.y, this.size.w, this.size.h, 2, 'Green', 1.0);
                        this.#drawCircle(this.interactCtx, this.range[this.game.mouse.activeTower+1], 3, 'Red');
                    }

                } else {
                    if (this.type > 1) {
                        this.#drawBevelOutline(this.interactCtx, this.pos.x, this.pos.y, this.size.w, this.size.h, 2, 'Red', 1.0);
                    }
                }

                if (this.game.mouse.activeTower > 1) {
                    if (this.type < 2){
                        // Hover Sockets
                        this.#drawBevelOutline(this.interactCtx, this.pos.x, this.pos.y, this.size.w, this.size.h, 2, 'Green', 1.0);
                        this.#drawCircle(this.interactCtx, this.range[this.game.mouse.activeTower], 3, 'Gold');
                    } else {
                        this.#drawBevelOutline(this.interactCtx, this.pos.x, this.pos.y, this.size.w, this.size.h, 2, 'Green', 1.0);
                        this.#drawCircle(this.interactCtx, this.range[this.type], 3, 'Gold');
                    }
                }

            }
        }
    }
}


// Base Tile
export class TowerTile extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 1;
        this.animated = false;
        this.image = tower_sprites;
        this.spriteSize = {w:128, h:128}
        this.frame = {x:0, y:0};
        this.frameCurrent = {x:this.spriteSize.w*this.frame.x, y:this.spriteSize.h*this.frame.y};
        this.pos = {x:pos.x, y:pos.y}
        this.scale = 0.5;
        this.size = {w:this.spriteSize.w*this.scale, h:this.spriteSize.h*this.scale};
    }
}


// Towers 1
export class Tower1_UP1 extends Towers{
    constructor(game, pos){
        super(game);
        this.animated = false;
        this.target = 0;
        this.type = 2;
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

    update(deltaTime){
        this.target_enemy();
    }
}


export class Tower1_UP2 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 3;
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

    update(deltaTime){
        this.target_enemy();
    }
}


export class Tower1_UP3 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 4;
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

    update(deltaTime){
        this.target_enemy();
    }
}


// Towers 2
export class Tower2_UP1 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 5;
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

    update(deltaTime){
        this.target_enemy();
    }
}


export class Tower2_UP2 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 6;
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

    update(deltaTime){
        this.target_enemy();
    }
}


export class Tower2_UP3 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 7;
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

    update(deltaTime){
        this.target_enemy();
    }
}


// Towers 3
export class Tower3_UP1 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 8;
        this.damage = 0.03;
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

    update(deltaTime){
        this.target_enemy();
    }
}


export class Tower3_UP2 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 9;
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

    update(deltaTime){
        this.target_enemy();
    }
}


export class Tower3_UP3 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 10;
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

    update(deltaTime){
        this.target_enemy();
    }
}


// Towers 4
export class Tower4_UP1 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 11;
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

    update(deltaTime){
        this.target_enemy();
    }
}


export class Tower4_UP2 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 12;
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

    update(deltaTime){
        this.target_enemy();
    }
}


export class Tower4_UP3 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 13;
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

    update(deltaTime){
        this.target_enemy();
    }
}


// Towers 5
export class Tower5_UP1 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 14;
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

    update(deltaTime){
        this.target_enemy();
    }
}


export class Tower5_UP2 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 15;
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

    update(deltaTime){
        this.target_enemy();
    }
}


export class Tower5_UP3 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 16;
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

    update(deltaTime){
        this.target_enemy();
    }
}


// Towers 6
export class Tower6_UP1 extends Towers{
    constructor(game, pos){
        super(game);
        this.type = 17;
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
        this.game.add_resource(0.0002 * deltaTime, 0);

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
        this.type = 18;
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
        this.game.add_resource(0.0005 * deltaTime, 0.00005  * deltaTime);
        
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
        this.type = 19;
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
        this.game.add_resource(0.0010 * deltaTime, 0.0001 * deltaTime);
        
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


