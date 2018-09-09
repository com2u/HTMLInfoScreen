const getGlobalDirection = (() => {
    let globalDirection;
    return () => {
        if (globalDirection == null) {
            globalDirection = createVector(1, 1);
        }
        return globalDirection;
    };
})();
var GizmoMode;
(function (GizmoMode) {
    GizmoMode[GizmoMode["AMEISE"] = 0] = "AMEISE";
    GizmoMode[GizmoMode["FLIEGE"] = 1] = "FLIEGE";
    GizmoMode[GizmoMode["ZEBRA"] = 2] = "ZEBRA";
    GizmoMode[GizmoMode["QRCODE"] = 3] = "QRCODE";
})(GizmoMode || (GizmoMode = {}));
var GizmoMoveMode;
(function (GizmoMoveMode) {
    GizmoMoveMode[GizmoMoveMode["DARKAREA"] = 0] = "DARKAREA";
    GizmoMoveMode[GizmoMoveMode["CHAOS"] = 1] = "CHAOS";
    GizmoMoveMode[GizmoMoveMode["TARGET"] = 2] = "TARGET";
    GizmoMoveMode[GizmoMoveMode["TARGETVOLATILE"] = 3] = "TARGETVOLATILE";
    GizmoMoveMode[GizmoMoveMode["ANGLE"] = 4] = "ANGLE";
})(GizmoMoveMode || (GizmoMoveMode = {}));
var GizmoReseedMode;
(function (GizmoReseedMode) {
    GizmoReseedMode[GizmoReseedMode["NONE"] = 0] = "NONE";
    GizmoReseedMode[GizmoReseedMode["DARKAREA"] = 1] = "DARKAREA";
    GizmoReseedMode[GizmoReseedMode["EDGE"] = 2] = "EDGE";
    GizmoReseedMode[GizmoReseedMode["CHAOS"] = 3] = "CHAOS";
    GizmoReseedMode[GizmoReseedMode["CHECKERBOARD"] = 4] = "CHECKERBOARD";
    GizmoReseedMode[GizmoReseedMode["OUTERBOX"] = 5] = "OUTERBOX";
    GizmoReseedMode[GizmoReseedMode["DARKNEXT"] = 6] = "DARKNEXT";
    GizmoReseedMode[GizmoReseedMode["NEXTEDGE"] = 7] = "NEXTEDGE";
})(GizmoReseedMode || (GizmoReseedMode = {}));
var GizmoTargetMode;
(function (GizmoTargetMode) {
    GizmoTargetMode[GizmoTargetMode["DARKAREA"] = 0] = "DARKAREA";
    GizmoTargetMode[GizmoTargetMode["EDGE"] = 1] = "EDGE";
    GizmoTargetMode[GizmoTargetMode["CHAOS"] = 2] = "CHAOS";
    GizmoTargetMode[GizmoTargetMode["OUTERBOX"] = 3] = "OUTERBOX";
    GizmoTargetMode[GizmoTargetMode["CENTERP"] = 4] = "CENTERP";
    GizmoTargetMode[GizmoTargetMode["NEXTEDGE"] = 5] = "NEXTEDGE";
})(GizmoTargetMode || (GizmoTargetMode = {}));
var GizmoDrawMode;
(function (GizmoDrawMode) {
    GizmoDrawMode[GizmoDrawMode["DOT"] = 0] = "DOT";
    GizmoDrawMode[GizmoDrawMode["CIRCLE"] = 1] = "CIRCLE";
    GizmoDrawMode[GizmoDrawMode["XLINE"] = 2] = "XLINE";
    GizmoDrawMode[GizmoDrawMode["QRCODE"] = 3] = "QRCODE";
})(GizmoDrawMode || (GizmoDrawMode = {}));
;
class Gizmo {
    constructor(theX, theY) {
        this.position = createVector(width / 2, height / 2);
        this.target = createVector(width / 2, height / 2);
        this.spin = 0.15;
        this.invalide = 0;
        this.position = createVector(theX, theY);
        this.direction = createVector();
        this.direction.x = random(-1, 1);
        this.direction.y = random(-1, 1);
    }
    move(mode) {
        const direction = this.direction;
        const position = this.position;
        const spin = this.spin;
        switch (mode) {
            case GizmoMoveMode.DARKAREA:
                direction.x += random(-spin, spin);
                direction.y += random(-spin, spin);
                direction.normalize();
                position.add(direction);
                const pixel = typo.get(Math.round(position.x), Math.round(position.y));
                if (brightness(pixel) < 2) {
                    this.invalide = 1;
                    this.spin = 0.15;
                }
                else {
                    this.spin = spin + 0.05;
                }
                if (position.x < 0 || position.x > width || (brightness(pixel) > 2)) {
                    direction.x *= -1 * this.invalide;
                    if (con.expandArea) {
                        typo.set(round(position.x), round(position.y), 0);
                    }
                    this.invalide++;
                }
                if (position.y < 0 || position.y > height || (brightness(pixel) > 2)) {
                    direction.y *= -1 * this.invalide;
                    if (con.expandArea) {
                        typo.set(round(position.x), round(position.y), 0);
                    }
                    this.invalide++;
                }
                break;
            case GizmoMoveMode.CHAOS:
                direction.x += random(-spin, spin);
                direction.y += random(-spin, spin);
                direction.normalize();
                position.add(direction);
            case GizmoMoveMode.TARGET:
                direction.x += this.target.x - position.x;
                direction.y += this.target.y - position.y;
                direction.normalize();
                position.add(direction);
                break;
            case GizmoMoveMode.TARGETVOLATILE:
                direction.x += this.target.x - position.x;
                direction.y += this.target.y - position.y;
                direction.normalize();
                position.add(direction);
                for (let i = 0; i < 3; i++) {
                    if (random(1) > 0.5) {
                        position.add(direction);
                    }
                }
                break;
            case GizmoMoveMode.ANGLE:
                const globalDirection = getGlobalDirection();
                direction.x += globalDirection.x;
                direction.y += globalDirection.y;
                direction.normalize();
                position.add(direction);
                globalDirection.x += (random(1) - 0.5) / 10;
                globalDirection.y += (random(1) - 0.5) / 10;
                break;
        }
    }
}
