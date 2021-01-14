// import LocalStore from "./LocalStore";
// import UserStore from "./UserStore";
// import StepStore from "./StepStore";
// import Ste from "./StepStore";

// /**
//  * Root Store Class with
//  */
// export class RootStore {
//   authStore: LocalStore;
//   userStore: UserStore;
//   stepStore: StepStore;

//   constructor() {
//     this.authStore = new LocalStore();
//     this.userStore = new UserStore();
//     this.stepStore = new StepStore();
//   }
// }

import { createContext } from "react";
import { LocalStore } from "./LocalStore";
import { UserStore } from "./UserStore";
import { StepStore } from "./StepStore";
import { NavigationStore } from "./NavigationStore";

export class RootStore {
  navigationStore = new NavigationStore(this);
  userStore = new UserStore(this);
  stepStore = new StepStore(this);
  localStore = new LocalStore(this);
}

export const RootStoreContext = createContext(new RootStore());
