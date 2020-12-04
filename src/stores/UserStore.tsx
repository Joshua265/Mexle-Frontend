import { observable, action } from "mobx";
import Cookie from "universal-cookie";
import Date from "moment";
import webServiceProvider from "helpers/webServiceProvider";

const cookie = new Cookie();

interface IUserStore {
  loggedIn: boolean;
  userData: IUserData;
  token: string;
}

interface IUserData {
  username: String;
  email: String;
  role: String;
  language: String;
  finishedCourses: Array<any>;
  finishedChapters: Array<any>;
  finishedSteps: Array<any>;
  createdAt?: Date;
}

interface IFinishedObject {
  id: string;
  date: number;
}

const updateFinished = async (
  type: "course" | "chapter" | "step",
  finishedObject: IFinishedObject
) => {
  try {
    await webServiceProvider.post("user/addfinished", {
      type,
      finishedObject,
    });
  } catch (e) {
    console.log(e);
  }
};

export default class UserStore implements IUserStore {
  @observable userData: IUserData = {
    username: "",
    email: "",
    role: "",
    language: "",
    finishedCourses: [],
    finishedChapters: [],
    finishedSteps: [],
  };
  @observable loggedIn = false;
  @observable token = cookie.get("token") || "";

  @action
  login(userData: IUserData, token: string): void {
    this.loggedIn = true;
    this.userData = userData;
    this.token = token;
    cookie.set("token", token);
  }

  @action
  logout(): void {
    this.loggedIn = false;
    this.userData = {
      username: "",
      email: "",
      role: "",
      language: "",
      finishedCourses: [],
      finishedChapters: [],
      finishedSteps: [],
    };
    this.token = "";
    cookie.remove("token", { path: "/" });
  }

  @action
  addFinished(type: "course" | "chapter" | "step", id: string) {
    const finishedObject: IFinishedObject = { id, date: Date.now() };
    updateFinished(type, finishedObject);
    switch (type) {
      case "course": {
        this.userData.finishedCourses.push(finishedObject);
        break;
      }
      case "chapter": {
        this.userData.finishedChapters.push(finishedObject);
        break;
      }
      case "step": {
        this.userData.finishedSteps.push(finishedObject);
        break;
      }
    }
  }

  @action
  verifyToken = async (localToken: string) => {
    const {
      userData,
      token,
    } = await webServiceProvider.post("user/verifytoken", { localToken });
    this.login(userData, token);
  };
}
