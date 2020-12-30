import { observable, action } from "mobx";
import autobind from "autobind-decorator";
import createBrowserHistory from "history/createBrowserHistory";

class NavigationStore {
  @observable location = null;
  history = createBrowserHistory();

  @autobind push(location) {
    this.history.push(location);
  }
  @autobind replace(location) {
    this.history.replace(location);
  }
  @autobind go(n) {
    this.history.go(n);
  }
  @autobind goBack() {
    this.history.goBack();
  }
  @autobind goForward() {
    this.history.goForward();
  }
}

export default NavigationStore;
