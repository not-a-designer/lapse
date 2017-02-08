import { Component, NgModule } from '@angular/core';
import { IonicApp, IonicModule, ModalController, NavParams, ViewController } from '../../ionic-angular';


@Component({
  templateUrl: 'page.html'
})
export class ModalFirstPage {
  myParam = '';

  constructor(public modalCtrl: ModalController) {}

  openBasicModal() {
    let myModal = this.modalCtrl.create(ModalContentPage);
    myModal.present();
  }
  openModalWithParams() {
    let myModal = this.modalCtrl.create(ModalContentPage, { 'myParam': this.myParam });
    myModal.present();
  }
}


@Component({
  templateUrl: 'modal-content.html'
})
export class ModalContentPage {
  myParam: string;

  constructor(
    public viewCtrl: ViewController,
    params: NavParams
  ) {
    this.myParam = params.get('myParam');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}


@Component({
  template: '<ion-nav [root]="root"></ion-nav>'
})
export class ApiDemoApp {
  root = ModalFirstPage;
}


@NgModule({
  declarations: [
    ApiDemoApp,
    ModalFirstPage,
    ModalContentPage
  ],
  imports: [
    IonicModule.forRoot(ApiDemoApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ModalFirstPage,
    ModalContentPage
  ]
})
export class AppModule {}
