import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
//import { CameraPreview } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then( () => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      StatusBar.styleDefault();
      Splashscreen.hide();

      /*let tapEnabled: any = false;
      let dragEnabled: any = false;
      let toBack: any = true;
      let alpha = 1;
      let rect: any = {
        x: 0, 
        y: 0, 
        width: platform.width(), 
        height: platform.height()
      };
 
      CameraPreview.startCamera(
        rect,
        'back',
        tapEnabled,
        dragEnabled,
        toBack,
        alpha, 
        () => {
          CameraPreview.showCamera();
        }
      );*/
    });
  }
}
