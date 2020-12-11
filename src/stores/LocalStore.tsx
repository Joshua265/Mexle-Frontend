import { observable, action } from "mobx";
import { ObservableValue } from "mobx/dist/internal";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface ILocalStore {
  localVariables: Object;
}

export default class LocalStore implements ILocalStore {
  localVariables = observable({ darkMode: false });

  toggleDarkMode = action((): void => {
    cookies.set("darkMode", !this.localVariables.darkMode);
    this.localVariables.darkMode = !this.localVariables.darkMode;
  });

  initLocalVariables = action((): void => {
    this.localVariables.darkMode =
      cookies.get("darkMode") === "true" ? true : false || false;
  });
}
