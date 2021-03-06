// final Timer tpage = new Timer();
// final Timer tcontent = new Timer();
const infoPage = new Array(7);
class Controller {
    constructor() {
        this.expandArea = false;
        this.sequence = 0;
        this.pane0 = false;
        this.count = 500;
        this.numberOfGizmo = 2000;
        this.numberOfGizmo2 = 600;
        this.delayTime = 0;
        this.squareSize = 10;
        this.nextStep = true;
        this.seqStep = 0;
    }
    init() {
        const layer = new BackgroundLayer();
        initInfoPages(infoPage);
        return this
            .loadAllImages()
            .then(() => {
            this.loadAllText();
            this.createPageUpdate(infoPage[0].duration);
            this.createContentUpdate(100);
            console.log("InfoPage: " + 0);
        });
    }
    seq() {
        if (con.seqStep < infoPage.length) {
            return infoPage[this.seqStep];
        }
        else {
            return infoPage[0];
        }
    }
    createPageUpdate(sec) {
        con.nextStep = true;
        setTimeout(() => {
            con.nextStep = true;
            this.findNxetStep();
            seqStep();
            this.createPageUpdate(infoPage[con.seqStep].duration);
            console.log("InfoPage: " + con.seqStep);
        }, sec * 1e3);
    }
    findNxetStep() {
        con.seqStep++;
        if (!con.seq().active) {
            this.findNxetStep();
        }
        if (con.seqStep >= (infoPage.length)) {
            con.seqStep = 0;
            console.log("Step:" + con.seqStep);
        }
    }
    createContentUpdate(sec) {
        con.nextStep = true;
        setTimeout(() => {
            this
                .loadAllImages()
                .then(() => {
                this.loadAllText();
                this.createPageUpdate(sec);
                console.log("Update Content");
            });
        }, sec * 1e3);
    }
    loadAllImages() {
        const promises = [];
        for (let i = 0; i < infoPage.length; i++) {
            const index = i;
            const promise = layer
                .loadBackgroundImage(i)
                .then(image => {
                infoPage[index].backgroundPicture = image;
            });
            promises.push(promise);
        }
        return Promise.all(promises);
    }
    loadAllText() {
        for (let no = 0; no < infoPage.length; no++) {
            infoPage[no].textGraphics = layer.generateBackgroundText(no);
            infoPage[no].duration = txt.getNumber(con.seqStep, "Duration");
            infoPage[no].duration = 3;
            infoPage[no].active = (txt.getNumber(con.seqStep, "Active") > 0) ? true : false;
        }
    }
}
