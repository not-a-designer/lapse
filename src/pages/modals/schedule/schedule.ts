import { Component } from '@angular/core';

import { NavController, NavParams, Platform, ModalController, AlertController } from 'ionic-angular';

import { LocalNotifications } from 'ionic-native';
import * as moment from 'moment';

import { UserService } from '../../../app/user.service';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})

export class SchedulePage {

  public selectedIndex: number = null;

  public notifications: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public user: UserService
  ) {

    this.initializeLocalNotifications();
    
  }


  initializeLocalNotifications() {
    LocalNotifications.hasPermission().then((permission) => {

      if(permission) {
        this.user.initializeAlerts();
        console.log('already authorized');
      } else {

        LocalNotifications.registerPermission().then((status) => {

          if(status === true) {
            this.user.initializeAlerts();
            console.log('access granted');
          } else {

            this.alertCtrl.create({
              title: 'Error',
              message: 'cannot access local notifications',
              buttons: [ 'OK']
            }).present();
          }
        });
      }
    });
  }


  changeTime(p, time) {
    let date = new Date();
    date.setHours(time.hour.value);
    date.setMinutes(time.minute.value);
    let h = this.user.addHourZero(date.getHours());
    let m = this.user.addMinuteZero(date.getMinutes());
    let myText = 'It\'s ' + h + '\:' + m + '\! Time to take your daily photo for your ' + this.user.getProfileTitle(p) + ' timeline';
    let newDate = moment(date).format();
    this.user.setAlertAt(p, newDate);
    this.user.setAlertText(p, myText);
  }

  editAlertText(p: number) {
    this.alertCtrl.create({
      title: 'Edit Alert Text',
      inputs: [{
        name: 'newText',
        placeholder: 'Enter new alert text'
      }],
      
      buttons: [{

        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancel clicked');
        }
      }, {

        text: 'Edit',
        handler: (data) => {
          if(data.newText !== '') {
            this.user.setAlertText(p, data.newText);
          }
        }

      }]
    }).present();
  }



  toggleNotification(p: number) {

    //this.user.toggleAlertActive(p);

    let myId = p;
    let myTitle = this.user.getProfileTitle(p);
    let myText = this.user.getAlertText(p);
    let myAt = this.user.getAlertAt(p);

    if (this.user.getAlertActive(p) === true) {

      let notification = {
        id: myId,
        title: myTitle,
        text: myText,
        at: myAt,
        every: 'day'
      };

      this.user.addNotifications(notification);
      console.log(this.user.getNotifications());
      alert('notifications: ' + this.user.getNotifications());

      if(this.platform.is('cordova')) {

        // Cancel any existing notifications
        LocalNotifications.cancel(myId).then(() => {
 
          // Schedule the new notifications
          LocalNotifications.schedule(notification);

        });
        this.alertCtrl.create({
          title: 'Push',
          message: 'Notifications set: ' + myTitle + '  |  '  + myAt,
          buttons: ['Ok']
        }).present(); 
      }
 
    } else {

      LocalNotifications.cancel(myId).then(() => {
        this.alertCtrl.create({
          title: 'Push',
          message: 'Notifications cancelled: ' + myTitle + '  |  '  + myAt,
          buttons: ['Ok']
        }).present(); 
      });
    }

  }


  remove(p: number) {

    this.alertCtrl.create({

      title: 'Delete',
      message: 'Are you sure you want to delete this alert?',
      buttons: [{

        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancel clicked');
        }

      }, {

        text: 'Delete',
        handler: () => {
          this.user.removeAlert(p);
        }
      }]
    }).present();    
  }

  

  dismiss() {
    this.navCtrl.pop(SchedulePage);
  }

}
