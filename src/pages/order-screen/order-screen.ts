import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import $ from "jquery";
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-order-screen',
  templateUrl: 'order-screen.html',
})
export class OrderScreenPage {

  DateFS:any;
  status_orderFS:any;
  order_statusFS:any;
  AmountFS:any;
  transaction_idFS:any;
  plan_nameFS:any;
  bank_nameFS:any;
  periodFS:any;
  imgFS:any;
  finalImg:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,) {
    $('.tabbar ').css('display', 'none');
   platform.registerBackButtonAction(() => {
    this.navCtrl.setRoot(ProfilePage);
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderScreenPage');

    this.DateFS = localStorage.getItem("DateFS");
    this.status_orderFS = localStorage.getItem("status_orderFS");
    this.order_statusFS = localStorage.getItem("order_statusFS");
    this.AmountFS = localStorage.getItem("AmountFS");
    this.transaction_idFS = localStorage.getItem("transaction_idFS");
    this.plan_nameFS = localStorage.getItem("plan_nameFS");
    this.bank_nameFS = localStorage.getItem("bank_nameFS");
    this.periodFS = localStorage.getItem("periodFS");
    this.imgFS = localStorage.getItem("imgFS");

  }
  gotoMainPage()
  {
    this.navCtrl.setRoot(ProfilePage);
  }

}
