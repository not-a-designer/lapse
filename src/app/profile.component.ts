/***
*  custom profile object
*  profile
*  |--title
*  |--dateCreated
*  |--alertActive
*  |--alertText
*  |--alertAt
***/

export class Profile {

  public title: string;
  public dateCreated: string;
  public alertActive: boolean;
  public alertText: string;
  public alertAt: any;

  constructor(public t: string) {

    //generate formatted dateCreated strings
    let date = new Date().toDateString();
    let time = new Date().toLocaleTimeString('en-US');
    
    //t input should be result of user.getProfileTitle()
    this.title = t;

    //concat strings
    this.dateCreated = date + ' - ' + time;

    //default active status, off
    this.alertActive = false;

    //empty alert message
    this.alertText = null;

    //empty alert time
    this.alertAt = null;
    
  }

}

