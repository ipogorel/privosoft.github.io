import {customElement, inject, useView} from 'aurelia-framework';
import {Widget} from './widget';
import {DetailedViewContent} from './detailed-view-content';

@customElement('detailed-view')
@useView('./widget.html')
export class DetailedView extends Widget {
  constructor(settings) {
    super(settings);
    this.stateType = "detailedViewState";
    this.initContent()
  }

  initContent() {
    this.content = new DetailedViewContent(this);
  }
}

