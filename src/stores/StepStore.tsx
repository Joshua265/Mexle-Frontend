import { observable, action, makeAutoObservable } from "mobx";
import { IStep } from "types";
import webServiceProvider from "helpers/webServiceProvider";
import { RootStore } from "./RootStore";

interface ISteps {
  numberSteps: number;
  steps: IStep[];
  error: boolean;
  activeStep: number;
}

interface IStepStore {
  steps: ISteps;
}

const defaultSteps = {
  numberSteps: 0,
  steps: new Array<IStep>(),
  error: false,
  activeStep: 0,
  loaded: false,
};

export class StepStore implements IStepStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
  steps = observable(defaultSteps);

  async fetchSteps(chapterId: string): Promise<void> {
    try {
      const stepsResponse = await webServiceProvider.get(
        `steps/chapterId/${chapterId}`
      );
      const { steps } = stepsResponse;
      this.steps.steps = steps;
      this.steps.numberSteps = steps.length;
    } catch (e) {
      this.steps.error = true;
    }
    this.steps.loaded = true;
  }

  setActiveStep(index: number) {
    this.steps.activeStep = index;
  }

  clearSteps = action(() => {
    this.steps = defaultSteps;
  });
}
