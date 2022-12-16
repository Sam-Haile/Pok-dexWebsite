class Player extends PIXI.AnimatedSprite {
    constructor(jumpSound, keys = [], x = 0, y = 0) {
        let spriteSheet = PIXI.BaseTexture.from("images/player_SpriteSheet.png");
        let width = 48;
        let height = 48;
        let count = 1;
        let textures = [];
        for (let i = 0; i < count; i++) {
            let frame = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(i * width, 0, width, height));
            textures.push(frame);
        }
        super(textures);
        this.anchor.set(0.5, 0.5);
        this.scale.set(1.5, 1.5);
        this.x = x;
        this.y = y;
        this.animationSpeed = 1 / 4;
        this.loop = true;
        this.keys = keys;
        this.onPlatform = false;
        this.isColliding = false;
        this.jumpSound = jumpSound;
        this.velocity = { x: 0, y: 0 };
        this.accel = { x: 0, y: 900 };
        this.play();
    }

    calcPos(dt = 1 / 60, platforms = []) {
        // if the player is on a platform, they can jump with w, and moving left and right is faster
        if (this.onPlatform) {
            if (keys[87]) // w
            {
                this.velocity.y = -500;
                this.onPlatform = false;
                this.stop();
                this.textures = this.getTextureSet(0, 48, 5);
                this.loop = false;
                this.play();
                this.jumpSound.play();
            }
            else {
                // checking if there is a platform below the player
                let isPlatBelow = false;

                let tempSprite = new PIXI.Sprite();
                tempSprite.x = this.x;
                tempSprite.y = this.y + 0.1;
                tempSprite.width = this.width;
                tempSprite.height = this.height;

                for (let platform of platforms) {
                    if (rectsIntersect(platform, tempSprite) && tempSprite.y < platform.y - platform.height / 2) {
                        isPlatBelow = true;
                        break;
                    }
                }

                if (isPlatBelow) {
                    this.velocity.y = 0;
                }
                else {
                    this.velocity.y += this.accel.y * dt;
                    this.onPlatform = false;
                    this.stop();
                    this.textures = this.getTextureSet(0, 0, 6);
                    this.loop = false;
                    this.play();
                }

            }
            if (keys[65]) // a
            {
                this.velocity.x = -50;
            }
            else if (keys[68] && !this.isColliding) // d
            {
                this.velocity.x = 50;
            }
            else {
                this.velocity.x = 0;
            }
        }
        else {
            this.velocity.y += this.accel.y * dt;
            if (keys[65]) // a
            {
                this.velocity.x = -25;
            }
            else if (keys[68] && !this.isColliding) // d
            {
                this.velocity.x = 25;
            }
            else {
                this.velocity.x = 0;
            }
        }

        // adding velocity to position
        this.x += this.velocity.x * dt;
        this.y += this.velocity.y * dt;
    }

    getTextureSet(startX = 0, startY = 0, count = 6) {
        let spriteSheet = PIXI.BaseTexture.from("images/player_SpriteSheet.png");
        let width = 48;
        let height = 48;
        let textures = [];
        for (let i = 0; i < count; i++) {
            let frame = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(startX + i * width, startY, width, height));
            textures.push(frame);
        }
        return textures;
    }
}

class Platform extends PIXI.Sprite {
    constructor(x = 0, y = 0) {
        super(app.loader.resources["ground"].texture);
        this.anchor.set(.5, .5); // position, scaling, rotating etc are now from center of sprite
        this.scale.set(1);
        this.x = x;
        this.y = y;
    }
}


