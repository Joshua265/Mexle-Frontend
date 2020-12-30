import { observable, action } from "mobx";
import { IStep } from "types";
import webServiceProvider from "helpers/webServiceProvider";
import NavigationStore from "stores/NavigationStore";

const navigationStore = new NavigationStore();

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
};

class StepStore implements IStepStore {
  steps = observable(defaultSteps);

  fetchSteps = action(
    async (chapterId: string): Promise<void> => {
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
    }
  );

  setActiveStep = action((index: number) => {
    this.steps.activeStep = index;
    // navigationStore.history.replace(
    //   `${this.steps.steps[this.steps.activeStep]._id}`
    // );
  });

  clearSteps = action(() => {
    this.steps = defaultSteps;
  });
}
export default StepStore;
