import { observable, action } from "mobx";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface ILocalStore {
  darkMode: boolean;
}

export default class LocalStore implements ILocalStore {
  @observable darkMode = false;

  @action
  toggleDarkMode(): void {
    console.log("toggleDarkMode");
    cookies.set("darkMode", !this.darkMode);
    this.darkMode = !this.darkMode;
  }

  @action
  getDarkMode(): boolean {
    return this.darkMode;
  }

  @action
  initLocalVariables(): void {
    this.darkMode = cookies.get("darkMode") === "true" ? true : false || false;
  }
}
