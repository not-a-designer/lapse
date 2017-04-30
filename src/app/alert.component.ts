import { Injectable } from '@angular/core';


@Injectable()
export class Alert {

  public id: string;
  public title: string;
  public text: string;
  public at: any;
  public every: string;


  constructor(t: string, d: Date) {

    this.id = t;
    this.title = t;
    
    this.at = d;
    

    this.every = 'day';

    this.text = 'It\'s ' + this.at + '! Time to take you photo for your ' + this.title + ' timeline';
  }
}
