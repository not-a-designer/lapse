import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';

import { Camera } from 'ionic-native';
import { Facebook } from 'ionic-native';
import { TwitterConnect } from 'ionic-native';
import { CameraPreview } from 'ionic-native';

import { CameraPage } from '../pages/camera/camera';
import { SettingsPage } from '../pages/settings/settings';
import { EditPage } from '../pages/edit/edit';
import { TabsPage } from '../pages/tabs/tabs';
import { ModalPage } from '../pages/modal/modal';
import { AboutPage } from '../pages/about/about';
import { EmailLoginPage } from '../pages/emaillogin/emaillogin';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '0c1de753'
  }
};

@NgModule({

  declarations: [
    MyApp,
    CameraPage,
    SettingsPage,
    EditPage,
    TabsPage,
    ModalPage,
    AboutPage,
    EmailLoginPage
  ],

  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    CameraPage,
    SettingsPage,
    EditPage,
    TabsPage,
    ModalPage,
    AboutPage,
    EmailLoginPage
  ],

  providers: [Facebook, 
              TwitterConnect, 
              Camera, 
              CameraPreview, 
              {
                provide: ErrorHandler, 
                useClass: IonicErrorHandler
              }]
})
export class AppModule {}
