import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { StatusBar, Splashscreen, LocalNotifications } from 'ionic-native';

//custom imports
import { TabsPage } from '../pages/tabs/tabs';
import { UserService } from './user.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(public platform: Platform, 
              public user: UserService) {
    
    platform.ready().then( () => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      StatusBar.styleDefault();
      Splashscreen.hide();

      this.user.setUser(1, 'Joel', 'abc@abc.com', [], []);

      console.log(this.user.getId());
      console.log(this.user.getName());
      console.log(this.user.getEmail());
      console.log(this.user.getProfileList());
      
    });
  } 
}
