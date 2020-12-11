import LocalStore from "./LocalStore";
import UserStore from "./UserStore";

/**
 * Root Store Class with
 */
export class RootStore {
  authStore: LocalStore;
  userStore: UserStore;

  constructor() {
    this.authStore = new LocalStore();
    this.userStore = new UserStore();
  }
}
