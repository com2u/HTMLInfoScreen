class InfoText {
  subtitel = "";
  screenJSON;
  screen;

  loadJSON() {
    try {
      if (InetAddress.getByName("www.com2u.de").isReachable(1000)) {
        screenJSON = loadJSONArray("http://www.com2u.de/Infoscreen/Infoscreen.json");
      } else {
        screenJSON = loadJSONArray("Infoscreen.json");
      }
    } catch (e) {
      screenJSON = loadJSONArray("Infoscreen.json");
    }

    for (let i = 0; i < screenJSON.size(); i++) {

      screen = screenJSON.getJSONObject(i);

      let id = screen.getInt("page");
      let title = screen.getString("Titel");
      let lines = screen.getInt("Lines");

      console.log(id + ", " + title + ", " + lines);
    }

  }

  getText(page: number, search: string) {
    screen = screenJSON.getJSONObject(page);
    let s = screen.getString(search);
    s = s.replace("\"", "");
    return s;
  }

  getNumber(page: number, search: string) {
    screen = screenJSON.getJSONObject(page);
    return screen.getInt(search);
  }
}