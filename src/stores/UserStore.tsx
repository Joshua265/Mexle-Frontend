import { makeAutoObservable } from 'mobx';
import Cookie from 'universal-cookie';
import Date from 'moment';
import webServiceProvider from 'helpers/webServiceProvider';
import { RootStore } from './RootStore';
import { IFinishedCourse, IFinishedChapter, IFinishedStep } from 'types';

const cookie = new Cookie();

interface IUserStore {
  userData: IUserData;
  avatarUrl?: string;
  login(username: string, password: string): Promise<void>;
  logout(): void;
  addFinished(type: 'course' | 'chapter' | 'step', id: string): void;
  verifyToken(): void;
}

interface IUserData {
  username: string;
  email: string;
  role: string;
  language: string;
  description: string;
  coins: number;
  hhnAccount: boolean;
  avatar?: string;
  finishedCourses: IFinishedCourse[];
  finishedChapters: IFinishedChapter[];
  finishedSteps: IFinishedStep[];
  createdAt?: Date;
  loggedIn: boolean;
  token: string;
}

interface IFinishedObject {
  id: string;
  createdAt: number;
}

const defaultUserData = {
  username: '',
  email: '',
  hhnAccount: false,
  role: '',
  language: '',
  description: '',
  coins: -1,
  avatar: undefined,
  finishedCourses: [],
  finishedChapters: [],
  finishedSteps: [],
  loggedIn: false,
  token: ''
};

export class UserStore implements IUserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
  userData: IUserData = {
    ...defaultUserData,
    token: cookie.get('token') || ''
  };

  avatarUrl;

  async login(username: string, password: string): Promise<void> {
    const fetchedUserData = await webServiceProvider.post('user/login', {
      username,
      password
    });

    this.userData = {
      ...fetchedUserData.userData,
      token: fetchedUserData.token,
      loggedIn: true
    };
    cookie.set('token', fetchedUserData.token);
    if (this.userData.avatar) {
      this.avatarUrl = `${process.env.REACT_APP_API_SERVER}images/${this.userData.avatar}` as string;
    }
  }

  logout(): void {
    this.userData = defaultUserData;
    this.avatarUrl = undefined;
    cookie.remove('token', {
      path: '/',
      domain: process.env.REACT_APP_PUBLIC_URL
    });
    cookie.set('token', undefined);
  }

  async addFinished(type: 'course' | 'chapter' | 'step', id: string) {
    const finishedObject: IFinishedObject = { id, createdAt: Date.now() };
    try {
      const resFinishedObject = await webServiceProvider.post(
        'user/addfinished',
        {
          type,
          finishedObject
        }
      );
      switch (type) {
        case 'course': {
          this.userData.finishedCourses.push(resFinishedObject.obj);
          break;
        }
        case 'chapter': {
          this.userData.finishedChapters.push(resFinishedObject.obj);
          break;
        }
        case 'step': {
          this.userData.finishedSteps.push(resFinishedObject.obj);
          break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async verifyToken() {
    const localToken = (await cookie.get('token')) || '';
    if (!localToken || localToken === 'undefined') {
      return;
    }
    const fetchedUserData = await webServiceProvider.post('user/verifytoken', {
      localToken
    });
    this.userData = {
      ...fetchedUserData.userData,
      token: fetchedUserData.token,
      loggedIn: true
    };
    cookie.set('token', fetchedUserData.token);
    if (this.userData.avatar) {
      this.avatarUrl = `${process.env.REACT_APP_API_SERVER}images/${this.userData.avatar}`;
    }
  }
}
