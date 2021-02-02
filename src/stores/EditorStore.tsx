import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import arrayMove from "array-move";
import { uuid } from "uuidv4";
import { IStep } from "types";
import webServiceProvider from "helpers/webServiceProvider";
import editParser from "container/BlockEditor/editParser.js";

interface IItem {
  key: string;
  type: string;
  props: Object;
  html: string;
}

const emptyStep: IStep = {
  _id: "",
  title: "",
  description: "",
  author: "",
  visible: true,
  chapterId: "",
  content: {
    html: "",
  },
};

export class EditorStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  blocks: Array<IItem> = [];
  edit: boolean = false;
  step: IStep = emptyStep;

  initStep(step: IStep) {
    this.edit = true;
    this.step = step;
    this.getBlocksFromHTML(step.content.html);
  }

  clearStep() {
    this.edit = false;
    this.step = emptyStep;
  }

  changeOrder(oldIndex: number, newIndex: number) {
    this.blocks = arrayMove(this.blocks, oldIndex, newIndex);
    this.step.content.html = this.getHTML();
  }

  addItem(item?: string) {
    if (item) {
      this.blocks = [
        ...this.blocks,
        { key: uuid(), type: item, props: {}, html: "" },
      ];
    }
  }

  removeItem(id: string) {
    const elementIndex: number = this.blocks.findIndex(
      (item) => item?.key === id
    );
    if (elementIndex > -1) {
      this.blocks.splice(elementIndex, 1);
    }
  }

  getHTML(): string {
    let htmlString = "";
    this.blocks.forEach((item) => {
      htmlString += item.html;
    });
    return htmlString;
  }

  changeBlockProps(key: string, props: Object, html: string) {
    const elementIndex: number = this.blocks.findIndex(
      (item) => item.key === key
    );
    if (elementIndex !== -1) {
      this.blocks[elementIndex] = { ...this.blocks[elementIndex], props, html };
      this.step.content.html = this.getHTML();
    }
  }

  getBlocksFromHTML(html: string) {
    // @ts-ignore: Type Error
    this.blocks = editParser(html);
  }

  async saveStep() {
    if (this.edit) {
      await webServiceProvider.post(`steps/edit/${this.step._id}`, this.step);
    } else {
      await webServiceProvider.post("steps/create", this.step);
    }
  }
}
