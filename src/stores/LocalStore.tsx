import { observable, action, makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// interface ILocalStore {
//   localVariables: Object;
// }

// export default class LocalStore implements ILocalStore {
//   localVariables = observable({ darkMode: false });

//   toggleDarkMode = action((): void => {
//     cookies.set("darkMode", !this.localVariables.darkMode);
//     this.localVariables.darkMode = !this.localVariables.darkMode;
//   });

//   initLocalVariables = action((): void => {
//     this.localVariables.darkMode =
//       cookies.get("darkMode") === "true" ? true : false || false;
//   });
// }

export class LocalStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  darkMode = false;

  toggleDarkMode(): void {
    console.log("toggle dark mode");
    cookies.set("darkMode", !this.darkMode);
    this.darkMode = !this.darkMode;
  }

  initLocalVariables(): void {
    this.darkMode = cookies.get("darkMode") === "true" ? true : false || false;
  }
}
