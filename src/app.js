import {inject} from 'aurelia-framework';
import $ from 'jquery';

export class App {
  constructor() {
  }


  configureRouter(config, router){
    config.title = 'Periscope';
    config.map([
      { route: ['/', '/:dashboard'],  name: 'dashboard',  moduleId: './dashboard',  nav: true, title:'Dashboard' }
      /*{ route: '/',  name: 'dashboard',  moduleId: './index',  nav: true, title:'Dashboard' },
      { route: '/:dashboard/',  name: 'dashboardDetails',  moduleId: './index',  title:'Dashboard Details' },*/
    ]);
    /*config.mapUnknownRoutes(instruction => {
        //instruction.config.view = 'main-router.html';
        let navigatorAddress= this._addressParser.fromUrl(instruction.queryString);
        instruction.config.moduleId = navigatorAddress.viewModelName;
        return instruction;

    });*/

    this.router = router;
  }

  attached(){
    // calculate the content element height
    /*var elementsHeight = $(".navbar")[0].scrollHeight + $(".mainnav")[0].scrollHeight + $(".footer")[0].scrollHeight-8;
    if ($(".breadcrumb")[0])
      elementsHeight+=$("breadcrumb")[0].scrollHeight;

    $(".content").css("height",$("#wrapper")[0].clientHeight-elementsHeight);*/
    var elementsHeight = $(".navbar")[0].scrollHeight + $(".mainnav")[0].scrollHeight-8;
    if ($(".breadcrumb")[0])
      elementsHeight+=$("breadcrumb")[0].scrollHeight;

    $(".content").css("height",$("#wrapper")[0].clientHeight-elementsHeight);
  }

}
