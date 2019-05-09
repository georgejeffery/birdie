URL = "http://localhost:3000/";

export default class API {
  static getColumns() {
    return fetch(URL).then(resp => resp.json());
  }

  static getData(query) {
    return fetch(URL + "people/" + encodeURI(query)).then(resp => resp.json());
  }
}
