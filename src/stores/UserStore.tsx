import { observable, action } from 'mobx';

interface IUserStore {
  loggedIn: boolean;
  username: string;
  password: string;
  role: string;
}


export default class UserStore implements IUserStore {

  @observable loggedIn = false;
  @observable username = '';
  @observable password = '';
  @observable role = "admin";

  @action
  login(username: string, password: string):void {
    this.loggedIn = true;
    this.username = username;
    this.password = password;
  }

}