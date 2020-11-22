import { observable, action } from "mobx";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface ILocalStore {
  darkMode: boolean;
}

export default class LocalStore implements ILocalStore {
  // constructor() {
  //   this.darkMode = cookies.get("darkMode") === "true" ? true : false || false;
  // }
  @observable darkMode = false;

  @action
  toggleDarkMode(value: boolean): void {
    cookies.set("darkMode", value, { path: "/" });
    this.darkMode = value;
  }
}
