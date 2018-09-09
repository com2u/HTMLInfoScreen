class InfoPage {
    constructor() {
        this.duration = 10000;
        this.active = true;
        this.mergeImageMode = 3;
        this.fadeGrade = -240;
        this.gizmoColor = 0;
        this.gizmoColor2 = 255;
        this.drawMode = GizmoDrawMode.DOT;
        this.reseedMode = GizmoReseedMode.NEXTEDGE;
        this.moveMode = GizmoMoveMode.ANGLE;
        this.targetMode = GizmoTargetMode.EDGE;
    }
}
function initInfoPages(infoPage) {
    for (let i = 0; i < infoPage.length; i++) {
        infoPage[i] = new InfoPage();
    }
    // "Now playing
    infoPage[0].mergeImageMode = 3;
    infoPage[0].fadeGrade = 50;
    infoPage[0].drawMode = GizmoDrawMode.DOT;
    //infoPage[0].gizMode=GizmoMode.AMEISE;
    infoPage[0].reseedMode = GizmoReseedMode.NEXTEDGE;
    infoPage[0].moveMode = GizmoMoveMode.ANGLE;
    infoPage[0].targetMode = GizmoTargetMode.EDGE;
    infoPage[0].fadeGrade = 100;
    infoPage[0].gizmoColor = 0;
    infoPage[0].gizmoColor2 = 255;
    // "Freitag, 13.4.2018"  
    infoPage[1].duration = 8;
    infoPage[1].mergeImageMode = 3;
    infoPage[1].drawMode = GizmoDrawMode.XLINE;
    //infoPage[1].gizMode=GizmoMode.ZEBRA;
    infoPage[1].reseedMode = GizmoReseedMode.DARKNEXT;
    infoPage[1].moveMode = GizmoMoveMode.DARKAREA;
    infoPage[1].targetMode = GizmoTargetMode.EDGE;
    // "Samstag, 14.4.2018"
    //infoPage[2].duration = 8;
    infoPage[2].mergeImageMode = 5;
    infoPage[2].drawMode = GizmoDrawMode.DOT;
    //infoPage[2].gizMode=GizmoMode.ZEBRA;
    infoPage[2].reseedMode = GizmoReseedMode.NEXTEDGE;
    infoPage[2].moveMode = GizmoMoveMode.TARGET;
    infoPage[2].targetMode = GizmoTargetMode.CENTERP;
    // "Sonntag, 15.4.2018"
    //infoPage[3].duration = 8;
    infoPage[3].mergeImageMode = 3;
    infoPage[3].drawMode = GizmoDrawMode.CIRCLE;
    //infoPage[3].gizMode=GizmoMode.AMEISE;
    infoPage[3].reseedMode = GizmoReseedMode.CHAOS;
    infoPage[3].moveMode = GizmoMoveMode.TARGET;
    infoPage[3].targetMode = GizmoTargetMode.OUTERBOX;
    // "Dauerausstellung"
    //infoPage[4].duration = 8;
    infoPage[4].mergeImageMode = 3;
    infoPage[4].drawMode = GizmoDrawMode.DOT;
    //infoPage[4].gizMode=GizmoMode.AMEISE;
    infoPage[4].reseedMode = GizmoReseedMode.NEXTEDGE;
    infoPage[4].moveMode = GizmoMoveMode.TARGETVOLATILE;
    infoPage[4].targetMode = GizmoTargetMode.OUTERBOX;
    //infoPage[5].duration = 8;
    infoPage[5].mergeImageMode = 3;
    infoPage[5].drawMode = GizmoDrawMode.QRCODE;
    //infoPage[1].gizMode=GizmoMode.ZEBRA;
    infoPage[5].reseedMode = GizmoReseedMode.CHECKERBOARD;
    infoPage[5].moveMode = GizmoMoveMode.CHAOS;
    infoPage[5].targetMode = GizmoTargetMode.CHAOS;
    //infoPage[6].duration = 8;
    infoPage[6].mergeImageMode = 3;
    infoPage[6].drawMode = GizmoDrawMode.DOT;
    //infoPage[6].gizMode=GizmoMode.AMEISE;
    infoPage[6].reseedMode = GizmoReseedMode.NEXTEDGE;
    infoPage[6].moveMode = GizmoMoveMode.ANGLE;
    infoPage[6].targetMode = GizmoTargetMode.EDGE;
    /*
  
     infoPage[7].duration = 10;
     infoPage[7].mergeImageMode=3;
     infoPage[7].drawMode=GizmoDrawMode.DOT;
     //infoPage[7].gizMode=GizmoMode.AMEISE;
     infoPage[7].reseedMode=GizmoReseedMode.NEXTEDGE;
     infoPage[7].moveMode=GizmoMoveMode.ANGLE;
     infoPage[7].targetMode=GizmoTargetMode.EDGE;
     
     infoPage[8].duration = 10;
     infoPage[8].mergeImageMode=3;
     infoPage[8].drawMode=GizmoDrawMode.DOT;
     //infoPage[8].gizMode=GizmoMode.AMEISE;
     infoPage[8].reseedMode=GizmoReseedMode.NEXTEDGE;
     infoPage[8].moveMode=GizmoMoveMode.ANGLE;
     infoPage[8].targetMode=GizmoTargetMode.EDGE;
     
     infoPage[9].duration = 10;
     infoPage[9].mergeImageMode=3;
     infoPage[9].drawMode=GizmoDrawMode.DOT;
     //infoPage[9].gizMode=GizmoMode.AMEISE;
     infoPage[9].reseedMode=GizmoReseedMode.NEXTEDGE;
     infoPage[9].moveMode=GizmoMoveMode.ANGLE;
     infoPage[9].targetMode=GizmoTargetMode.EDGE;*/
    console.log("InfoPage: " + 0);
}
