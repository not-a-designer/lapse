import { Component, NgModule } from '@angular/core';
import { FabContainer, IonicApp, IonicModule } from '../../ionic-angular';


@Component({
  templateUrl: 'page.html'
})
export class ApiDemoPage {
  array: number[] = [];

  add() {
    this.array.push(1);
  }

  clickMainFAB() {
    console.log('Clicked open social menu');
  }

  openSocial(network: string, fab: FabContainer) {
    console.log('Share in ' + network);
    fab.close();
  }
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

