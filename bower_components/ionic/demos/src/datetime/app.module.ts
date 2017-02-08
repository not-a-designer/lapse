import { Component, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from '../../ionic-angular';


@Component({
  templateUrl: 'page.html'
})
export class ApiDemoPage {
  wwwReleased = '1991';
  netscapeReleased = '1994-12-15T13:47:20.789';
  operaReleased = '1995-04-15';
  webkitReleased = '1998-11-04T11:06Z';
  firefoxReleased = '2002-09-23T15:03:46.789';
  chromeReleased = '2008-09-02';

  tokyoTime: string;
  parisTime: string;
  madisonTime: string;
  alertTime = '10:15';

  operaShortDay = [
    's\u00f8n',
    'man',
    'tir',
    'ons',
    'tor',
    'fre',
    'l\u00f8r'
  ];

  constructor() {
    this.tokyoTime = this.calculateTime('+9');
    this.parisTime = this.calculateTime('+1');
    this.madisonTime = this.calculateTime('-6');

    // If it is Daylight Savings Time
    if (this.dst(new Date())) {
      this.parisTime = this.calculateTime('+2');
      this.madisonTime = this.calculateTime('-5');
    }
  }

  calculateTime(offset) {
    // create Date object for current location
    let d = new Date();

    // create new Date object for different city
    // using supplied offset
    let nd = new Date(d.getTime() + (3600000 * offset));

    return nd.toISOString();
  }

  // Determine if the client uses DST
  stdTimezoneOffset(today) {
    let jan = new Date(today.getFullYear(), 0, 1);
    let jul = new Date(today.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  dst(today) {
    return today.getTimezoneOffset() < this.stdTimezoneOffset(today);
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
