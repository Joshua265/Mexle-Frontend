import { makeAutoObservable } from "mobx";
import Cookie from "universal-cookie";
import Date from "moment";
import webServiceProvider from "helpers/webServiceProvider";
import { RootStore } from "./RootStore";

const cookie = new Cookie();

interface IUserStore {
  userData: IUserData;
  login: Function;
  logout: Function;
  addFinished: Function;
  verifyToken: Function;
}

interface IUserData {
  username: string;
  email: string;
  role: string;
  language: string;
  finishedCourses: IFinishedObject[];
  finishedChapters: IFinishedObject[];
  finishedSteps: IFinishedObject[];
  createdAt?: Date;
  loggedIn: boolean;
  token: string;
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

export class UserStore implements IUserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
  userData: IUserData = {
    username: "",
    email: "",
    role: "",
    language: "",
    finishedCourses: [],
    finishedChapters: [],
    finishedSteps: [],
    loggedIn: false,
    token: cookie.get("token") || "",
  };

  login(userData: IUserData, token: string): void {
    this.userData = { ...userData, token: token, loggedIn: true };
    cookie.set("token", token);
  }

  logout(): void {
    this.userData = {
      username: "",
      email: "",
      role: "",
      language: "",
      finishedCourses: [],
      finishedChapters: [],
      finishedSteps: [],
      loggedIn: false,
      token: "",
    };
    cookie.remove("token", { path: "/" });
  }

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

  async verifyToken(localToken: string) {
    const {
      userData,
      token,
    } = await webServiceProvider.post("user/verifytoken", { localToken });
    this.login(userData, token);
  }
}
