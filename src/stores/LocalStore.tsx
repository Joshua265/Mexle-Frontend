import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export class LocalStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  darkMode = false;
  reminded = false;

  toggleDarkMode(): void {
    console.log("toggle dark mode");
    cookies.set("darkMode", !this.darkMode);
    this.darkMode = !this.darkMode;
  }

  initLocalVariables(): void {
    this.darkMode = cookies.get("darkMode") === "true" ? true : false || false;
  }
}
