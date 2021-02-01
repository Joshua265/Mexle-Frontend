import { createContext } from "react";
import { LocalStore } from "./LocalStore";
import { UserStore } from "./UserStore";
import { StepStore } from "./StepStore";
import { NavigationStore } from "./NavigationStore";
import { EditorStore } from "./EditorStore";

export class RootStore {
  navigationStore = new NavigationStore(this);
  userStore = new UserStore(this);
  stepStore = new StepStore(this);
  localStore = new LocalStore(this);
  editorStore = new EditorStore(this);
}

export const RootStoreContext = createContext(new RootStore());
