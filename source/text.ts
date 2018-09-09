class InfoText {
  screen: {}
  textContent

  loadJSON() {
    return fetchJSON('http://www.com2u.de/Infoscreen/Infoscreen.json')
      .catch(e => fetchJSON('../Infoscreen.json'))
      .then(result => this.textContent = result)
  }

  getText(page: number, search: string) {
    this.screen = this.textContent[page];
    let s = this.screen[search];
    s = s.replace('"', '');
    return s;
  }

  getNumber(page: number, search: string) {
    this.screen = this.textContent[page];
    return Math.ceil(this.screen[search]);
  }
}

function findProperties(object: {}, startsWith: string) {
  return Object
    .keys(object)
    .filter(key => key.startsWith(startsWith))
}

function fetchJSON(url: string) {
  return new Promise((resolve, reject) => {
    loadJSON(
      url,
      resolve,
      reject
    )
  })
}
