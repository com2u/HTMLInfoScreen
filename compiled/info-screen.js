let croud;
let croud2;
let con;
let layer;
let txt;
let thisPG;
let pg;
let bgImage;
let typo;
let mergeImage;
let simulation;
let loaded = false;
function setup() {
    croud = null;
    croud2 = null;
    con = new Controller();
    layer = new BackgroundLayer();
    // txt = new PText();
    txt = {
        loadJSON() {
            console.log('Mocked Load JSON');
        },
        getText() {
            console.log('Mocked get text');
            return 'text';
        },
        getNumber() {
            console.log('Mocked get Number');
            return 2;
        }
    };
    createCanvas(600, 600);
    simulation = true;
    thisPG = createGraphics(600, 600);
    stroke(0);
    background(255);
    txt.loadJSON();
    con.init().then(() => {
        loaded = true;
        typo = con.seq().backgroundPicture;
        pg = con.seq().textGraphics;
        croud = new Croud(con.numberOfGizmo);
        croud2 = new Croud(con.numberOfGizmo2);
        croud.reseedGizmo(pg, con.seq().reseedMode);
        croud.targetGizmo(pg, con.seq().targetMode);
        croud2.reseedGizmo(typo, con.seq().reseedMode);
        nextSequence();
    });
}
function seqStep() {
    mergeImage = nextSequence();
    console.log("Reseed " + con.seqStep);
    croud.reseedGizmo(mergeImage, con.seq().reseedMode);
    croud.targetGizmo(pg, con.seq().targetMode);
}
function nextSequence() {
    typo = con.seq().backgroundPicture;
    pg = con.seq().textGraphics;
    console.log("nextSequence" + Math.random());
    switch (con.seq().mergeImageMode) {
        case 0:
            return typo;
        case 1:
            return typo;
        case 2:
            return pg;
        case 3:
            bgImage = createImage(typo.width, typo.height);
            bgImage.copy(typo, 0, 0, typo.width, typo.height, 0, 0, typo.width, typo.height);
            tint(255, 127);
            // bgImage.resize(width, height);
            background(bgImage);
            bgImage.blend(pg, 0, 0, width, height, 0, 0, width, height, 'OVERLAY');
            return pg;
        case 4:
            return typo;
        case 5:
            bgImage = createImage(typo.width, typo.height);
            bgImage.copy(typo, 0, 0, typo.width, typo.height, 0, 0, typo.width, typo.height);
            tint(255, 127);
            // bgImage.resize(width, height);
            background(bgImage);
            bgImage.blend(pg, 0, 0, width, height, 0, 0, width, height, 'OVERLAY');
            return bgImage;
    }
    return typo;
}
let waiting = false;
function draw() {
    if (!loaded || waiting) {
        return;
    }
    noStroke();
    if (con.nextStep) {
        con.nextStep = false;
    }
    drawBackgroundImage();
    croud.drawGizmo(thisPG, con.seq().drawMode, con.seq().moveMode, con.seq().gizmoColor, con.seq().gizmoColor2);
    con.count--;
    waiting = true;
    setTimeout(() => waiting = false, con.delayTime);
}
function drawBackgroundImage() {
    switch (con.seq().mergeImageMode) {
        case 0:
            break;
        case 1:
            image(typo, 0, 0);
            break;
        case 2:
            image(pg, 0, 0);
            break;
        case 3:
            image(bgImage, 0, 0);
            tint(255, 126);
            image(pg, 0, 0);
            break;
        case 4:
            bgImage = this.drawBackground(GizmoDrawMode.DOT, GizmoMoveMode.CHAOS);
            bgImage.blend(pg, 0, 0, width, height, 0, 0, width, height, 'SUBTRACT');
            translate(width / 2, height / 2);
            rotate(con.count / 500);
            translate(-width / 2, -height / 2);
            scale(con.count / 100);
            image(bgImage, 0, 0);
            break;
        case 5:
            image(bgImage, 0, 0);
            tint(255, 126);
            image(pg, 0, 0);
    }
}
function keyPressed() {
    con.findNxetStep();
    seqStep();
}
function drawBackground(drawMode, moveMode) {
    const newBackground = createGraphics(width, height);
    // newBackground.beginDraw();
    newBackground.stroke(200);
    newBackground.fill(200);
    newBackground.background(255);
    croud2.drawGizmo(newBackground, drawMode, moveMode, con.seq().gizmoColor, con.seq().gizmoColor2);
    // newBackground.endDraw();
    return newBackground;
}
