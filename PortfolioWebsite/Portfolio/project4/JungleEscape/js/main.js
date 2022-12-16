"use strict";
// templates for platform layouts
const templates = {
    "1": [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    "2": [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    "3": [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    "4": [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    "5": [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0]
    ],
    "6": [
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    "7": [
        [0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    "8": [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 0, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    "9": [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0]
    ],
    "0": [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0]
    ]
}
// Makes pixealted text less blurry
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

// details for each level
const levelLengthInSec = [0, 30, 45, 60, 75, 90];
const levelLengthInPlats = [0, 16, 24, 32, 40, 48];
// heights are in increments of 32 from the bottom of the screen
const levelHeights =
    [
        [],
        [5, 6, 7, 6, 4, 5, 5, 6, 7, 8, 6, 7, 7, 8, 9, 5],
        [5, 7, 9, 11, 12, 5, 5, 6, 8, 4, 7, 10, 11, 13, 14, 13, 12, 11, 9, 10, 8, 10, 4, 7],
        [7, 3, 8, 11, 6, 9, 12, 1, 7, 7, 4, 5, 6, 7, 8, 9, 10, 4, 5, 6, 7, 8, 9, 10, 11, 10, 9, 7, 8, 5, 6, 4],
        [3, 2, 5, 8, 11, 14, 11, 8, 12, 3, 4, 7, 11, 13, 2, 2, 4, 8, 12, 14, 13, 12, 10, 8, 6, 4, 4, 8, 12, 12, 12, 5, 6, 7, 6, 4, 8, 4, 8, 12],
        [6, 6, 6, 0, 5, 5, 0, 5, 7, 6, 9, 9, 0, 9, 12, 11, 0, 9, 10, 11, 12, 13, 14, 0, 0, 4, 4, 5, 0, 5, 11, 5, 10, 5, 5, 10, 15, 4, 9, 10, 9, 9, 0, 0, 3, 4, 5, 6]
    ]

const app = new PIXI.Application({
    width: 1100, height: 600, backgroundColor: 0x87CEEB
});
document.querySelector("main").appendChild(app.view);

// some constants
const gameWidth = app.view.width;
const gameHeight = app.view.height;

// pre-load the images
app.loader
    .add("layer1", "images/layer1.png")
    .add("layer2", "images/layer2.png")
    .add("layer3", "images/layer3.png")
    .add("layer4", "images/layer4.png")
    .add("layer5", "images/layer5.png")
    .add("layer6", "images/layer6.png")
    .add("layer7", "images/layer7.png")
    .add("layer8", "images/layer8.png")
    .add("ground", "images/ground.png")
    .add("bar", "images/bar.png")
    .add("controls", "images/controls.png")
    .add("titleScreen", "images/startScene.png")
    .add("barOverlay", "images/barOverlay.png")
    .add("player_SpriteSheet", "images/player_SpriteSheet.png")
    .add("end", "images/end.png")
    .add("flag", "images/flag.png");

app.loader.onComplete.add(setup);
app.loader.load();

// declaring some variable names
let stage;

// scenes
let startScene;
let sarts;
let levelScene;
let gameScene;
let winScene;
let gameOverScene;

// background textures
let layer1;
let layer2;
let layer3;
let layer4;
let layer5;
let layer6;
let layer7;
let layer8;

let end;
let levelNumText;
let levelPlatsText;
let barOverlay;

// sounds
let menuMusic;
let gameMusic;
let jumpSound;


let platforms = [];
let player;
let progress = 0.0;
let currentLevel = 0;

let seed = [];
let fixedSeedMode = false;

let keys = [];
function setup() {
    stage = app.stage;

    // initializing backgrounds
    layer1 = createBg(app.loader.resources["layer1"].texture)
    layer2 = createBg(app.loader.resources["layer2"].texture)
    layer3 = createBg(app.loader.resources["layer3"].texture)
    layer4 = createBg(app.loader.resources["layer4"].texture)
    layer7 = createBg(app.loader.resources["layer7"].texture)
    layer5 = createBg(app.loader.resources["layer5"].texture)
    layer8 = createBg(app.loader.resources["layer8"].texture)

    // setting up sounds
    menuMusic = new Howl({
        src: ["sounds/menuMusic.mp3"],
        loop: true,
        volume: 0.1
    });

    gameMusic = new Howl({
        src: ["sounds/gameMusic.mp3"],
        loop: true,
        volume: 0.15
    });

    jumpSound = new Howl({
        src: ["sounds/jump.wav"],
        loop: false,
        volume: 0.25
    });

    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);

    layer6 = createBg(app.loader.resources["layer6"].texture)

    winScene = new PIXI.Container();
    winScene.visible = false;
    stage.addChild(winScene);

    // setting up scene contatiners
    startScene = new PIXI.Container();
    stage.addChild(startScene);

    startScene = createBg(app.loader.resources["titleScreen"].texture)

    levelScene = new PIXI.Container();
    levelScene.visible = false;
    stage.addChild(levelScene);

    gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);

    createLabelsAndButtons();

    player = new Player(jumpSound, keys);
    gameScene.addChild(player);

    window.onkeydown = getKeysDown;
    window.onkeyup = getKeysUp;

    app.ticker.add(gameLoop);

    menuMusic.play();
}


function createBg(texture) {
    let tiling = new PIXI.TilingSprite(texture, 2379, 793);
    tiling.position.set(0, 0);
    app.stage.addChild(tiling);

    return tiling;
}

let bgX = 0;
let bgSpeed = 1;

function moveSpeed() {
    bgX = (bgX - bgSpeed)
    layer1.tilePosition.x = bgX / 2;
    layer2.tilePosition.x = bgX / 1.5;
    layer3.tilePosition.x = bgX;
    layer7.tilePosition.x = bgX;
    layer4.tilePosition.x = bgX * 1.2;
    layer5.tilePosition.x = bgX * 1.2;
    layer8.tilePosition.x = bgX * 1.2;
    layer6.tilePosition.x = bgX * 9;
}


function createLabelsAndButtons() {

    // Default button size
    let buttonStyle = new PIXI.TextStyle({
        fill: 'white',
        strokeThickness: 15,
        fontSize: 50,
        fontFamily: 'cthulhumbus',
        stroke: 0x000000,
    })

    // End objective
    end = new PIXI.Sprite();
    end = PIXI.Sprite.from("images/end.png");
    end.height = gameHeight;
    end.x = gameWidth + 100;
    gameScene.addChild(end);

    let progressBar = new PIXI.Sprite();
    progressBar = PIXI.Sprite.from("images/bar.png");
    progressBar.width = gameWidth * 0.9;
    progressBar.height = gameHeight * 0.1;
    progressBar.x = gameWidth * 0.05;
    progressBar.y = gameHeight * 0.025;
    gameScene.addChild(progressBar);

    barOverlay = new PIXI.Sprite();
    barOverlay = PIXI.Sprite.from("images/barOverlay.png");
    barOverlay.width = 19 * 2.5;
    barOverlay.height = 17 * 2.5;
    barOverlay.x = gameWidth * 1;
    barOverlay.y = gameHeight * 0.035;
    gameScene.addChild(barOverlay);

    let uiEnd = new PIXI.Sprite();
    uiEnd = PIXI.Sprite.from("images/flag.png");
    uiEnd.height = gameHeight * 0.15;
    uiEnd.width = uiEnd.height;
    uiEnd.x = gameWidth * 0.88;
    gameScene.addChild(uiEnd);

    // adding buttons
    let startButton = new PIXI.Text("START");
    startButton.style = buttonStyle;
    startButton.x = (gameWidth / 2) - startButton.width / 2;
    startButton.y = gameHeight - 190;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup", levelPrep);
    startButton.on('pointerover', e => e.target.alpha = 0.7);
    startButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    startScene.addChild(startButton);

    let returnButton = new PIXI.Text("Main Menu");
    returnButton.style = buttonStyle;
    returnButton.x = (gameWidth / 2) - returnButton.width / 2;
    returnButton.y = gameHeight - 250;
    returnButton.interactive = true;
    returnButton.buttonMode = true;
    returnButton.on("pointerup", returnToStart);
    returnButton.on('pointerover', e => e.target.alpha = 0.7);
    returnButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    gameOverScene.addChild(returnButton);


    let goButton = new PIXI.Text("G0!");
    goButton.style = buttonStyle;
    goButton.x = (gameWidth / 2) - goButton.width / 2;
    goButton.y = gameHeight - 150;
    goButton.interactive = true;
    goButton.buttonMode = true;
    goButton.on("pointerup", startGame);
    goButton.on('pointerover', e => e.target.alpha = 0.7);
    goButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    levelScene.addChild(goButton);

    let controlText = new PIXI.Text("Controls");
    let controlTextStyle = new PIXI.TextStyle({
        fill: 'white',
        strokeThickness: 15,
        fontSize: 80,
        fontFamily: 'cthulhumbus',
        stroke: 0x000000,
    })
    controlText.style = controlTextStyle;
    controlText.x = (gameWidth / 2) - controlText.width / 2;
    controlText.y = gameHeight - 450;
    levelScene.addChild(controlText);

    //Adding the controls image
    let controls = new PIXI.Sprite();
    controls = PIXI.Sprite.from("images/controls.png");
    controls.y = + 50;
    levelScene.addChild(controls)

    let nextLevelButton = new PIXI.Text("New Level");
    nextLevelButton.style = buttonStyle;
    nextLevelButton.x = (gameWidth / 2) - nextLevelButton.width / 2;
    nextLevelButton.y = gameHeight - 425;
    nextLevelButton.interactive = true;
    nextLevelButton.buttonMode = true;
    nextLevelButton.on("pointerup", startGame);
    nextLevelButton.on('pointerover', e => e.target.alpha = 0.7);
    nextLevelButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    winScene.addChild(nextLevelButton);

    let returnFromWinButton = new PIXI.Text("Main Menu");
    returnFromWinButton.style = buttonStyle;
    returnFromWinButton.x = (gameWidth / 2) - returnFromWinButton.width / 2;
    returnFromWinButton.y = gameHeight - 250;
    returnFromWinButton.interactive = true;
    returnFromWinButton.buttonMode = true;
    returnFromWinButton.on("pointerup", returnToStart);
    returnFromWinButton.on('pointerover', e => e.target.alpha = 0.7);
    returnFromWinButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    winScene.addChild(returnFromWinButton);




    let levelWinText = new PIXI.Text("You Won!")
    levelWinText.style = new PIXI.TextStyle({
        fill: 0x00CCCC,
        fontSize: 60,
        fontFamily: 'Verdana, sans-serif',
        stroke: 0x000000,
    })
    levelWinText.x = (gameWidth / 2) - levelWinText / 2;
    levelWinText.y = 150;
    winScene.addChild(levelWinText);

    let levelLoseText = new PIXI.Text("You Lost!")
    levelLoseText.style = new PIXI.TextStyle({
        fill: 'white',
        strokeThickness: 15,
        fontSize: 80,
        fontFamily: 'cthulhumbus',
        stroke: 0x000000,
    })
    levelLoseText.x = (gameWidth / 2) - levelLoseText.width / 2;
    levelLoseText.y = 150;
    gameOverScene.addChild(levelLoseText);
}

function gameLoop() {
    if (!gameScene.visible) return;

    let dt = 1 / app.ticker.FPS;
    if (dt > 1 / 12) dt = 1 / 12;


    for (let platform of platforms) {
        // constantly moving all platforms to the left
        platform.x -= dt * 200;
    }

    // Moves backgrounds at different speeds
    moveSpeed();

    // spawning new platforms when the oldest one goes off screen
    if (platforms.length > 0 && platforms[0].x < -50) {
        platforms.shift();
    }

    player.calcPos(dt, platforms);

    // checking for collisions between the player and the platforms
    if (!player.onPlatform) {
        let tempOn = false;
        for (let platform of platforms) {
            if (rectsIntersect(player, platform) && player.y < platform.y - platform.height / 2) {
                // the player is on the platform if they intersect with it at any point
                tempOn = true;
                player.y = platform.y - 52;
            }
        }
        player.onPlatform = tempOn;
        if (player.onPlatform) {
            player.stop();
            player.textures = player.getTextureSet(0, 0, 6);
            player.loop = true;
            player.play();
        }
    }

    // checking for collisions on the left side
    let tempLeft = false;
    for (let platform of platforms) {
        if (rectsIntersect(player, platform) && player.x < platform.x - platform.width / 2 && player.y > platform.y - platform.height) {
            tempLeft = true;
        }
    }
    if (tempLeft) {
        player.x -= dt * 360;
        player.isColliding = true;
    }
    else {
        player.isColliding = false;
    }

    // checking if the player goes off screen
    if (player.x < -32 || player.x > gameWidth + 32 || player.y > gameHeight + 32) {
        // switching to the game over scene
        endGame();
    }

    progress += dt;
    barOverlay.x = (gameWidth * 0.8) * (progress / levelLengthInSec[currentLevel]) + 100;
    if (barOverlay.x > gameWidth * .9) barOverlay.x = gameWidth * .9;

    // if the level has progressed far enough, move the ending section onto the screen, 
    // and start checking for collisions with it
    if (progress > levelLengthInSec[currentLevel]) {
        end.x -= dt * 120;
        if (rectsIntersect(player, end)) {
            levelwin();
        }
    }
}

function levelPrep() {
    currentLevel++;
    startScene.visible = false;
    winScene.visible = false;
    levelScene.visible = true;
    randomizeSeed();
}

function randomizeSeed() {
    for (let i = 0; i < levelLengthInPlats[currentLevel]; i++) {
        seed[i] = Math.floor(Math.random() * 10).toString();
    }
    fixedSeedMode = false;
}

function startGame() {
    gameScene.visible = true;
    levelScene.visible = false;
    winScene.visible = false;
    player.x = 200;
    player.y = gameHeight - 48;

    progress = 0;

    loadLevel(seed);
    menuMusic.stop();
    gameMusic.play();
}

function returnToStart() {
    gameOverScene.visible = false;
    winScene.visible = false;
    startScene.visible = true;
    currentLevel = 0;
}

function loadLevel(seed) {
    // creating a starting platform first
    for (let i = 0; i < 33; i++) {
        let newPlatform = new Platform(32 * i, gameHeight - 16, PIXI.Sprite.from("images/ground.png"));
        platforms.push(newPlatform);
        gameScene.addChild(newPlatform);
    }

    // looping through the seed
    for (let i = 0; i < levelLengthInPlats[currentLevel]; i++) {
        createFromTemplate(templates[seed[i % seed.length]], 384 * (i + 3), gameHeight - (32 * levelHeights[currentLevel][i]));
    }
}

function endGame() {
    gameOverScene.visible = true;
    gameScene.visible = false;

    platforms.forEach(p => gameScene.removeChild(p));
    platforms = [];
    gameMusic.stop();
    menuMusic.play();
    end.x = gameWidth + 100;
}

function levelwin() {
    gameMusic.stop();
    menuMusic.play();
    gameScene.visible = false;
    winScene.visible = true;

    platforms.forEach(p => gameScene.removeChild(p));
    platforms = [];
    end.x = gameWidth + 100;
}

// function for reading a template and creating a platform
function createFromTemplate(template, x = 0, y = 0) {
    // looping through the nested arrays to get the proper positions for the platforms
    for (let j = 0; j < template.length; j++) {
        for (let i = 0; i < template[j].length; i++) {
            let newPlatform;
            // changing the texture based on the entry in the array
            switch (template[j][i]) {
                case 0: // no platform
                    break;
                case 1:
                    newPlatform = new Platform(x + (32 * i), y + (32 * j), PIXI.Sprite.from("images/ground.png"));
                    break;
            }
            if (newPlatform) {
                platforms.push(newPlatform);
                gameScene.addChild(newPlatform);
            }
        }
    }
}

function getKeysDown(e) {
    keys[e.keyCode] = true;
}

function getKeysUp(e) {
    keys[e.keyCode] = false;
}
