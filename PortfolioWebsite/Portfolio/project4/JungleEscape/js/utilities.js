// bounding box collision detection - it compares PIXI.Rectangles
function rectsIntersect(a, b) {
    var ab = a.getBounds();
    var bb = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

// these 2 helpers are used by classes.js
function getRandomUnitVector() {
    let x = getRandom(-1, 1);
    let y = getRandom(-1, 1);
    let length = Math.sqrt(x * x + y * y);
    if (length == 0) { // very unlikely
        x = 1; // point right
        y = 0;
        length = 1;
    } else {
        x /= length;
        y /= length;
    }

    return { x: x, y: y };
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}