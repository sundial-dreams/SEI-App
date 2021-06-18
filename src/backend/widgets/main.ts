import Widget  from './index';

export default class MainWidget extends Widget {
  static instance: MainWidget | null = null;

  static getInstance() {
    return MainWidget.instance ? MainWidget.instance : (MainWidget.instance = new MainWidget())
  }

  constructor() {
    super();
    this.width = 850;
    this.height = 580;
    this.name = "main";
  }
}