import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController } from 'ionic-angular';

import { Auth } from '@ionic/cloud-angular';

@Component({
  selector: 'page-emaillogin',
  templateUrl: 'emaillogin.html'
})
export class EmailLoginPage {
  
  public status: string;
  public email: string;
  public password: string;
  public confirm: string;

  constructor (public viewCtrl: ViewController,
               public navParams: NavParams,
               public alertCtrl: AlertController,
               public auth: Auth
  ) {

    this.status = 'login';
  }

  dismiss() {
    let data = 'cancel';
    this.viewCtrl.dismiss(data);
  }

  toggleLogin() {
    this.status = 'login' ? 'register' : 'login';
  }

  tryLogin() {

    if(status === 'login') {

      if(this.email === '' || this.password === '') {      //if fields are empty
        this.alertCtrl.create({
          title: 'Register Error', 
          message: 'All fields are required',
          buttons: ['OK']
        }).present();
      } else {

        let details = { 'email': this.email, 'password': this.password };

        this.auth.login('basic', details).then(() => {     //set status to logged in, dismiss modal with data
          let data = 'login';
          this.viewCtrl.dismiss(data);

        }, (err) => {                                      //if login is a failure

          console.log(err.message);
          let errors = '';

          if(err.message === 'UNPROCESSABLE ENTITY') {
            errors += 'Email isn\'t valid.<br/>';
          }
          if(err.message === 'UNAUTHORIZED') {
            errors += 'Password is required.<br/>';
          }

          this.alertCtrl.create({
            title: 'Login Error', 
            message: errors,
            buttons: ['OK']
          }).present();
        });
      }

    } else {  //register

      if (this.password != this.confirm) {
        this.alertCtrl.create({
          title: 'Register Error', 
          message: 'Password and confirmation do not match',
          buttons: ['OK']
        }).present();
      }

      let details = { 'email': this.email, 'password': this.password };

      this.auth.signup(details).then(() => {

        this.auth.login('basic', details).then(() => {

          let data = 'login';
          this.viewCtrl.dismiss(data);

        }, (err) => {

          let errors = '';

          for(let e of err.details) {
            console.log(e);
            if(e === 'required_email') {
              errors += 'Email is required.<br/>';
            }
            if(e === 'required_password') {
              errors += 'Password is required.<br/>';
            }
            if(e === 'conflict_email') {
              errors += 'A user with this email already exists.<br/>';
            }
            if(e === 'invalid_email') {
              errors += 'Your email address isn\'t valid.';
            }
          }

          this.alertCtrl.create({
            title: 'Register Error', 
            message: errors,
            buttons: ['OK']
          }).present();
        });   //end login
      });     //end signup
    }
  }

}
