// course interfaces
export interface ICourse {
  _id: string;
  title: string;
  description: string;
  author: string;
  language: string;
  license: string;
  visible: boolean;
  picture: string;
}

// chapter interfaces

export interface IChapters {
  _id: string;
  courseId: string;
  author: string;
  visible: boolean;
  title: string;
  description: string;
}

//step interfaces

export type IContent = {
  html: string;
  multipleChoice?: any;
};

export interface IMultipleChoice {
  question: string;
  answers: Array<IAnswer>;
  correctAnswer: number;
}

export interface IAnswer {
  id: number;
  text: string;
}

export interface IStep {
  _id: string;
  chapterId: string;
  title: string;
  author: string;
  visible: boolean;
  description: string;
  content: IContent;
}

export interface IFinishedCourse {
  _id: string;
  userId: string;
  courseId: string;
  createdAt: number;
}

export interface IFinishedChapter {
  _id: string;
  userId: string;
  chapterId: string;
  createdAt: number;
}

export interface IFinishedStep {
  _id: string;
  userId: string;
  stepId: string;
  createdAt: number;
}
