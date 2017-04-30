import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { UserService } from './user.service';

//PLUGINS
import { Camera, CameraPreview, Facebook, TwitterConnect } from 'ionic-native';
//PLUGINS

//CUSTOM PAGES
import { CameraPage } from '../pages/camera/camera';
import { SettingsPage } from '../pages/settings/settings';
import { EditPage } from '../pages/edit/edit';
import { TabsPage } from '../pages/tabs/tabs';
//MODALS
import { PreviewPage } from '../pages/modals/preview/preview';
import { SaveCapturePage } from '../pages/modals/save/savecapture';
import { SchedulePage } from '../pages/modals/schedule/schedule';
import { AboutPage } from '../pages/modals/about/about';
import { EmailLoginPage } from '../pages/modals/emaillogin/emaillogin';

//old test modals
/*import { IgLoginPage } from '../pages/modals/iglogin/iglogin';
import { FbLoginPage } from '../pages/modals/fblogin/fblogin';
import { TwLoginPage } from '../pages/modals/twlogin/twlogin';
*/
//CUSTOM PAGES


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
    PreviewPage,
    SaveCapturePage,
    SchedulePage,
    AboutPage,
    EmailLoginPage
  ],

  imports: [
    BrowserModule,
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
    PreviewPage,
    SaveCapturePage,
    SchedulePage,
    AboutPage,
    EmailLoginPage
  ],

  providers: [Facebook, 
              TwitterConnect, 
              Camera, 
              CameraPreview,
              UserService,
              {
                provide: ErrorHandler, 
                useClass: IonicErrorHandler
              }]
})
export class AppModule {}
