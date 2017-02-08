import { Component, NgModule } from '@angular/core';
import { IonicApp, IonicModule, ToastController } from '../../ionic-angular';


@Component({
  templateUrl: 'page.html'
})
export class ApiDemoPage {
  constructor(private toastCtrl: ToastController) { }

  showToast(position: string) {
    const toast = this.toastCtrl.create({
      message: 'User was created successfully',
      position: position,
      duration: 3000
    });

    toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }

  showLongToast() {
    const toast = this.toastCtrl.create({
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptatibus quibusdam eum nihil optio, ullam accusamus magni, nobis suscipit reprehenderit, sequi quam amet impedit. Accusamus dolorem voluptates laborum dolor obcaecati.',
      duration: 3000
    });

    toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }

  showDismissDurationToast() {
    const toast = this.toastCtrl.create({
      message: 'I am dismissed after 1.5 seconds',
      duration: 1500
    });
    toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }

  showToastWithCloseButton() {
    const toast = this.toastCtrl.create({
      message: 'Your internet connection appears to be offline. Data integrity is not guaranteed.',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }

  private dismissHandler() {
    console.info('Toast onDidDismiss()');
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
