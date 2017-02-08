import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CameraPage } from '../pages/camera/camera';
import { SettingsPage } from '../pages/settings/settings';
import { EditPage } from '../pages/edit/edit';
import { TabsPage } from '../pages/tabs/tabs';
import { ModalPage } from '../pages/modal/modal';
import { AboutPage } from '../pages/about/about';
import { IgLoginPage } from '../pages/iglogin/iglogin';
import { FbLoginPage } from '../pages/fblogin/fblogin';
import { TwLoginPage } from '../pages/twlogin/twlogin';
import { EmailLoginPage } from '../pages/emaillogin/emaillogin';

@NgModule({
  declarations: [
    MyApp,
    CameraPage,
    SettingsPage,
    EditPage,
    TabsPage,
    ModalPage,
    AboutPage,
    IgLoginPage,
    FbLoginPage,
    TwLoginPage,
    EmailLoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    IgLoginPage,
    FbLoginPage,
    TwLoginPage,
    EmailLoginPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
