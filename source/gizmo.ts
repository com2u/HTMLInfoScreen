const getGlobalDirection = (
  () => {
    let globalDirection
    return () => {
      if (globalDirection == null) {
        globalDirection = createVector(1, 1)
      }
      return globalDirection
    }
  }
)()

enum GizmoMode {
  AMEISE, FLIEGE, ZEBRA, QRCODE
}

enum GizmoMoveMode {
  DARKAREA, CHAOS, TARGET, TARGETVOLATILE, ANGLE
}

enum GizmoReseedMode {
  NONE, DARKAREA, EDGE, CHAOS, CHECKERBOARD, OUTERBOX, DARKNEXT, NEXTEDGE
}

enum GizmoTargetMode {
  DARKAREA, EDGE, CHAOS, OUTERBOX, CENTERP, NEXTEDGE
}

enum GizmoDrawMode {
  DOT, CIRCLE, XLINE, QRCODE
};

class Gizmo {
  position = createVector(width / 2, height / 2);
  target = createVector(width / 2, height / 2);
  direction: Vector;

  spin = 0.15;
  invalide = 0;


  constructor(theX: number, theY: number) {
    this.position = createVector(theX, theY);
    this.direction = createVector();
    this.direction.x = random(-1, 1);
    this.direction.y = random(-1, 1);
  }



  move(mode: GizmoMoveMode): void {
    const direction = this.direction
    const position = this.position
    const spin = this.spin
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
        } else {
          this.spin = spin + 0.05;
        }

        if (position.x < 0 || position.x > width || (brightness(pixel) > 2)) {
          direction.x *= -1 * this.invalide;
          if (con.expandArea) {
            typo.set(round(position.x), round(position.y), 0)
          }
          this.invalide++;
        }
        if (position.y < 0 || position.y > height || (brightness(pixel) > 2)) {
          direction.y *= -1 * this.invalide;
          if (con.expandArea) {
            typo.set(round(position.x), round(position.y), 0)
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
        const globalDirection = getGlobalDirection()
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