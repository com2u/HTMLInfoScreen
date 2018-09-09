class Croud {
  giz: Gizmo[]

  constructor(count: number) {
    this.giz = [];
  }

  targetGizmo(image: PImage, mode: GizmoTargetMode) {
    let x: number
    let y: number
    let pixel: Color
    let pixel2: Color

    const giz = this.giz

    switch (mode) {
      case GizmoTargetMode.DARKAREA: {

        for (let i = 0; i < giz.length; i++) {
          do {
            x = random(width - 1);
            y = random(height - 1);
            pixel = image.get(round(x), round(y));
          } while (brightness(pixel) > 90);
          giz[i].target = createVector(x, y);
        }
        console.log("TargetMode DARKAREA");
        break;
      }
      case GizmoTargetMode.EDGE: {
        for (let i = 0; i < giz.length; i++) {
          do {
            x = random(width - 1);
            y = random(height - 1);
            pixel = image.get(round(x), round(y));
            pixel2 = image.get(round(x + 1), round(y + 1));
          } while (brightness(pixel) == brightness(pixel2));
          giz[i].target = createVector(x, y);
          giz[i].direction.x = random(10) - 5;
          giz[i].direction.y = random(10) - 5;
        }
        console.log("TargetMode EDGE");
        break;
      }
      case GizmoTargetMode.CHAOS:
        for (let i = 0; i < giz.length; i++) {
          x = random(width);
          y = random(height);
          giz[i].target = createVector(x, y);
        }
        console.log("TargetMode CHAOS");
        break;
      case GizmoTargetMode.OUTERBOX:
        for (let i = 0; i < giz.length; i++) {
          if (random(1) > 0.5) {
            if (random(1) > 0.5) {
              y = 0;
              x = random(width);
            } else {
              y = height;
              x = random(width);
            }
          } else {
            if (random(1) > 0.5) {
              x = 0;
              y = random(height);
            } else {
              x = width;
              y = random(height);
            }
          }
          giz[i].target = createVector(x, y);
        }
        console.log("TargetMode OTERBOX");
        break;
      case GizmoTargetMode.CENTERP:
        for (let i = 0; i < giz.length; i++) {
          x = width / 2;
          y = height / 2;
          giz[i].target = createVector(x, y);
        }
        console.log("TargetMode CENTERP");
        break;
      case GizmoTargetMode.NEXTEDGE:
        let j = 0;
        for (let i = 1; i < giz.length; i++) {
          do {
            if (i % 2 == 1) {
              j = 1;
            } else {
              j = 0;
            }
            x = this.clipx(giz[i - j].position.x + this.MyRand(0.1));
            y = this.clipy(giz[i - j].position.y + this.MyRand(0.1));
            pixel = image.get(round(x), round(y));
          } while (brightness(pixel) > 90);
          giz[i].target = createVector(x, y);
          j = 1;
        }
        console.log("TargetMode NEXTEDGE");
        break;
    }
  }

  reseedGizmo(image: PImage, mode: GizmoReseedMode) {
    let x: number
    let y: number
    let pixel: Color
    let pixel2: Color
    const giz = this.giz

    switch (mode) {
      case GizmoReseedMode.NONE:

        break;
      case GizmoReseedMode.DARKAREA:
        for (let i = 0; i < giz.length; i++) {
          do {
            x = random(width - 1);
            y = random(height - 1);
            pixel = image.get(round(x), round(y));
          } while (brightness(pixel) > 90);
          giz[i] = new Gizmo(x, y);
        }
        break;
      case GizmoReseedMode.EDGE:
        for (let i = 0; i < giz.length; i++) {
          do {
            x = random(width - 1);
            y = random(height - 1);
            pixel = image.get(round(x), round(y));
            pixel2 = image.get(round(x + 1), round(y + 1));
          } while (brightness(pixel) == brightness(pixel2));
          giz[i] = new Gizmo(x, y);
        }
        break;
      case GizmoReseedMode.CHAOS:
        for (let i = 0; i < giz.length; i++) {
          x = random(width + 200) - 100;
          y = random(height + 200) - 100;
          giz[i] = new Gizmo(x, y);
        }
        break;
      case GizmoReseedMode.CHECKERBOARD:
        for (let i = 0; i < giz.length; i++) {
          x = random(width / con.squareSize + 1);
          y = random(height / con.squareSize + 1);
          giz[i] = new Gizmo(x, y);
        }
        break;
      case GizmoReseedMode.OUTERBOX:
        for (let i = 0; i < giz.length; i++) {
          if (random(1) > 0.5) {
            if (random(1) > 0.5) {
              y = 0;
              x = random(width);
            } else {
              y = height;
              x = random(width);
            }
          } else {
            if (random(1) > 0.5) {
              x = 0;
              y = random(height);
            } else {
              x = width;
              y = random(height);
            }
          }
          giz[i] = new Gizmo(x, y);
        }
        break;
      case GizmoReseedMode.DARKNEXT:

        let j = 0;
        giz[j] = new Gizmo(width / 2, height / 2);
        for (let i = 0; i < giz.length; i++) {
          do {
            x = this.clipx(giz[i - j].position.x + this.MyRand(1));
            y = this.clipy(giz[i - j].position.y + this.MyRand(1));
            pixel = image.get(round(x), round(y));
          } while (brightness(pixel) > 90);
          giz[i] = new Gizmo(x, y);
          j = 1;
        }
        break;
      case GizmoReseedMode.NEXTEDGE:
        for (let i = 0; i < giz.length; i = i + 2) {
          do {
            x = random(width - 1);
            y = random(height - 1);
            pixel = image.get(round(x), round(y));
            pixel2 = image.get(round(x + 1), round(y + 1));
          } while (brightness(pixel) == brightness(pixel2));
          giz[i] = new Gizmo(x, y);
          giz[i + 1] = new Gizmo(x, y);
        }
        break;
    }
  }

  drawGizmo(myGraphics: PGraphics, gizDrwaMode: GizmoDrawMode, gizMoveMode: GizmoMoveMode, drawColor: number, fillColor: number) {
    stroke(drawColor);
    fill(fillColor);
    const giz = this.giz;
    for (let i = 0; i < giz.length - 1; i++) {
      giz[i].move(gizMoveMode);
      let x = round(giz[i].position.x);
      let y = round(giz[i].position.y);

      switch (gizDrwaMode) {
        case GizmoDrawMode.DOT:
          myGraphics.ellipse(x, y, 3, 3);
          break;
        case GizmoDrawMode.CIRCLE:
          myGraphics.ellipse(x, y, 10, 10);
          break;
        case GizmoDrawMode.XLINE:
          if ((i % 2) == 0) {
            myGraphics.line(x, y, round(giz[i + 1].position.x), round(giz[i + 1].position.y));
          }

          break;
        case GizmoDrawMode.QRCODE:
          myGraphics.rect(x * con.squareSize, y * con.squareSize, con.squareSize, con.squareSize);
          break;
      }
    }
  }


  MyRand(g: number) {
    try {
      let f1 = 1 / (random(2) - 1);
      let f2 = 1 / (random(2) - 1);
      return round(f1 * f2 * g);
    }
    catch (e) {
      return 1;
    }
  }

  clipx(i: number) {
    if (i >= width) {
      return width - 1;
    }
    if (i < 0) {
      return 0;
    }
    return i;
  }

  clipy(i: number) {
    if (i >= height) {
      return height - 1;
    }
    if (i < 0) {
      return 0;
    }
    return i;
  }
}