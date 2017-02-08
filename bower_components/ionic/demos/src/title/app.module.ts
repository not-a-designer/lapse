import { Component, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from '../../ionic-angular';


// Use the toolbar demo but pass in the demo name to change the title
// this will also hide some of the toolbars that don't use `ion-title`
@Component({
  templateUrl: 'page.html'
})
export class ApiDemoPage {
  demo = 'Title';
  favorites = 'recent';
  apps = 'free';
}


@Component({
  template: '<ion-nav [root]="root"></ion-nav>'
})
export class ApiDemoApp {
  root = ApiDemoPage;
}


@NgModule({
  declarations: [
    ApiDemoApp,
    ApiDemoPage
  ],
  imports: [
    IonicModule.forRoot(ApiDemoApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ApiDemoPage
  ]
})
export class AppModule {}
