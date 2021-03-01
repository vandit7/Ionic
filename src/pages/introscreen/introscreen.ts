import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-introscreen',
  templateUrl: 'introscreen.html',
})
export class IntroscreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroscreenPage');
  }
  gotoRegister(){
    this.navCtrl.push('Register1Page');       
 }
}
