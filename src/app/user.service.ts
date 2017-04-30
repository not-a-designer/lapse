import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Profile } from './profile.component';


/***
*  User                    (setUser, addProfile, removeProfile, getProfileLength, getProfileList, checkForProfile)
*   |--id                  (getId)
*   |--name                (setName, getName)
*   |--email               (setEmail, getEmail)
*   |--pushOn              (toggleAlertStatus, getAlertStatus)
*   |--profiles[]
*   |   |--title           (setProfileTitle, getProfileTitle)
*   |   |--dateCreated     (getDateCreated)
*   |   |--alertActive     (initializeAlert, toggleAlertActive, getAlertActive)
*   |   |--alertText       (setAlertText, getAlertText, remove)
*   |   |--alertAt         (setAlertAt, getAlertAt)--------^
*   |
*   |--currentNotifications(addNotification, getNotifications, updateNotification)
***/

@Injectable()
export class UserService {
  
  private id: number;
  private name: string;
  private email: string;
  private pushOn: boolean;
  public profiles: Profile[];
  public currentNotifications: any[];

  constructor() {

    this.id = 0;
    this.name = 'empty';
    this.email = 'empty';
    this.pushOn = true;
    this.profiles = [];
    this.currentNotifications = [];
  }



/***** USER METHODS *****/
  public setUser(myId: number, myName: string, myEmail: string, myProfiles: Profile[], myNotifications: any[]) {
    this.id = myId;
    this.name = myName;
    this.email = myEmail;

    if(this.profiles.length) {
      for(let p of myProfiles) {

        this.profiles.push(p);
      }
    }   
  }

  public getId(): number {
    return this.id;
  }

  public setName(myName: string) {
    this.name = myName;
  }
  public getName(): string {
    return this.name;
  }
  
  public setEmail(myEmail: string) {
    this.email = myEmail;
  }
  public getEmail(): string {
    return this.email;
  }

  public toggleAlertStatus() {
    this.pushOn = !this.pushOn;
  }
  public getAlertStatus(): boolean {
    return this.pushOn;
  }

  public addProfile(t: string) {

    let p = new Profile(t);  //create new profile 
    this.profiles.push(p);   //add new profile to array

    console.log(this.profiles);
  }
  public removeProfile(i: number) {

    if(i > -1){
      this.profiles.splice(i, 1);
    } 
    if (this.profiles.length === 0) {
      this.pushOn = false;
    }
    console.log(this.profiles);
  }
 
  public getProfileLength(): boolean {
    return this.profiles.length > 0 ? true : false;
  }
  public getProfileList(): string[] {

    let list: string[] = [];

    if (this.profiles.length > 0) {
      for (let profile of this.profiles) {

        list.push(profile.title);
      }
    } else {
      let msg: string = 'no Profiles';
      list.push(msg);
    }

    return list;
  }

  public checkForProfile(t: () => string): boolean {

    let title: string = String(t);  //stringify promise
    let i: number = 0;              //initialize counter

    for (let p of this.profiles) {
      if (p.title.toLowerCase() === title.toLowerCase()) {
        i++;
      } 
    }
    
    return i === 0 ? false : true;   //check counter 
  }

/***** PROFILE METHODS *****/
  public setProfileTitle(p: number, t: string) {
    this.profiles[p].title = t;
  }
  public getProfileTitle(p: number): string {
    return this.profiles[p].title;
  }

  public getDateCreated(p: number): string {
   return this.profiles[p].dateCreated;
  }

  addHourZero(i: number): string {
    let newString = '';

    if (i < 10) {
      newString = '0' + i;
    } else if ( i > 12) {
      newString = String(i % 12);
    } else {
      newString = String(i);
    }

    return newString;
  }
  
  addMinuteZero(i: number): string {
    let newString = (i < 10) ? '0'+ i : String(i);

    return newString;
  }

  public initializeAlerts() {

    if (this.getProfileLength()) {
      for (let profile of this.profiles) {
        if (profile.alertAt === null && profile.alertText === null) {

          let t = new Date();
          let h = this.addHourZero(t.getHours());
          let m = this.addMinuteZero(t.getMinutes());
          let date = moment(t).format();

          this.setAlertAt(this.profiles.indexOf(profile), date);
          let time = h + '\:' + m;
          let text = 'It\'s ' + time + '\! Time to take your daily photo for your ' + profile.title + ' timeline';
          this.setAlertText(this.profiles.indexOf(profile), text);
        }
      }
    }
  }

  public setAlertText(p: number, t: string){
    this.profiles[p].alertText = t;
  }
  public getAlertText(p: number): string {
    return this.profiles[p].alertText;
  }

  public toggleAlertActive(p: number) {
    this.profiles[p].alertActive = !this.profiles[p].alertActive;
  }
  public getAlertActive(p: number): boolean {
    return this.profiles[p].alertActive;
  }

  public setAlertAt(p: number, d: any) {
    this.profiles[p].alertAt = d;
  }
  public getAlertAt(p: number): any {
    return this.profiles[p].alertAt;
  }

  public addAlert(p: number, t: string) {
    this.profiles[p].alertAt = moment(new Date()).format();
    this.profiles[p].alertText = t;
  }
  public removeAlert(p: number) {
    this.profiles[p].alertText = null;
    this.profiles[p].alertAt = null;  
  }

/****** NOTIFICATION METHODS *******/

  addNotification(notification: any[]) {
    this.user.currentNotification.push(notification);
  }
  
  getNotifications(): string {
    let list = '';
    if (this.currentNotifications) {
      list = this.currentNotifications.join(' ');
    }

    return list === '' ? 'no scheduled notifications' : list;
  }

  updateNotification(i: number, newTitle?: string, newText?: string, newAt?: any) {
    for (let notification of this.currentNotifications) {
      if(notification.id === i) {

        notification.title = newTitle ? newTitle : notification.title;
        notification.text = newText ? newText : notification.text;
        notification.at = newAt ? newAt : notification.at;
      }
    }
  }

}
