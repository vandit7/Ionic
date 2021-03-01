import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular'; 

@IonicPage()
@Component({
  selector: 'page-massage-info',
  templateUrl: 'massage-info.html',
})
export class MassageInfoPage {
  ChatStatusA: any;
  DateA: any;
  IsDeliveryA:any;
  IsReadA:any;
  messageA:any;

  constructor(public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public navParams: NavParams,
    platform: Platform,) {
      this.ChatStatusA=localStorage.getItem("ChatStatusA");
      this.DateA=localStorage.getItem("DateA");
      this.IsDeliveryA=localStorage.getItem("IsDeliveryA");
      this.IsReadA=localStorage.getItem("IsReadA");
      this.messageA=localStorage.getItem("messageA");

      platform.registerBackButtonAction(() => {
        this.dismissModal();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MassageInfoPage');
  }
  dismissModal() {
   this.viewCtrl.dismiss(); 
  }
}
