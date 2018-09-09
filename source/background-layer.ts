class BackgroundLayer {
  generateBackgroundText(no: number) {
    const bgGraphics = createGraphics(width, height);

    // bgGraphics.beginDraw();
    bgGraphics.stroke(0);
    bgGraphics.fill(0);
    bgGraphics.background(255);
    bgGraphics.textSize(128);
    bgGraphics.text(txt.getText(no, "Titel"), 10, 130);

    const lines = Math.round(txt.getNumber(no, "Lines"));
    let text = "";
    for (let i = 0; i < lines; i++) {
      text += txt.getText(no, "text" + i) + "\n";
    }
    bgGraphics.textSize((height - 300) / (lines * 2.5));
    console.log(text);
    bgGraphics.text(text, 10, 230, width, height);
    // bgGraphics.endDraw();
    return bgGraphics;
  }

  loadBackgroundImage(no: number) {
    return this._loadImage(no).then(image => {
      image.resize(width, height);
      image.filter('GRAY');
      return image
    })
  }

  _loadImage(n: number) {
    const imageName = "background" + n + ".jpg"
    const localName = "media/" + imageName
    const url = "http://www.com2u.de/Infoscreen/" + imageName

    if (simulation) {
      return fetchImage(localName)
    } else {
      return fetchImage(url).catch(() => fetchImage(localName))
    }
  }
}

function fetchImage(url: string): Promise<PImage> {
  return new Promise((resolve, reject) => {
    loadImage(url, (img) => {
      if (img) {
        resolve(img)
      } else {
        reject()
      }
    })
  })
}