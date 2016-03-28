import {WidgetBehavior} from './widget-behavior';
import {WidgetEventMessage} from '../events/widget-event-message';

export class DataSelectedBehavior extends WidgetBehavior {
  constructor(chanel, eventAggregator) {
    super();
    this._chanel = chanel;
    this._eventAggregator = eventAggregator;
  }

  attachToWidget(widget)   {
    super.attachToWidget(widget);
    var me = this;

    widget.dataSelected =  function(currentRecord) {
      var message = new WidgetEventMessage(me.widget.name);
      message.selectedData = currentRecord;
      me._eventAggregator.publish(me._chanel, message);
    };
  }

  detach(){
    super.detach(dashboard);
  }
}
