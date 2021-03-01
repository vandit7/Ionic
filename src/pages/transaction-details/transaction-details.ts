import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-transaction-details',
  templateUrl: 'transaction-details.html',
})
export class TransactionDetailsPage {
  payImg1: any;
  payImg2: any;
  result:any;
  img:any;
  status: any;
  StatusText: any;
  Date:any;
  TransactionID:any;
  BankName:any;
  PaymentType:any;
  PlanName:any;
  Period:any;
  Amount:any;
  ViewContact:any;
  CallSupport:any;
  PrioritySearch:any;
  SmsNotification:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController, 
    platform: Platform,) {
      $('.tabbar ').css('display', 'none');
      this.payImg1 = 'assets/imgs/unselectpayment.png';
      this.payImg2 = 'assets/imgs/unselectpayment.png';
      localStorage.removeItem("PaymentType");
      platform.registerBackButtonAction(() => {
        this.navCtrl.pop();
       localStorage.setItem("pageToPlan",'0');
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionDetailsPage');
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();

    this.result=JSON.parse(localStorage.getItem("TranItem"));
    this.img=this.result.img;
    this.status=this.result.status;
    this.StatusText=this.result.StatusText;
    this.Date=this.result.Date;
    this.TransactionID=this.result.TransactionID;
    this.BankName=this.result.BankName;
    this.PaymentType=this.result.PaymentType;
    this.PlanName=this.result.PlanName;
    
    this.Period=this.result.Period;
    this.Amount=this.result.Amount;
    this.ViewContact=this.result.ViewContact;
    this.CallSupport=this.result.CallSupport;
    this.PrioritySearch=this.result.PrioritySearch;
    this.SmsNotification=this.result.SmsNotification;
    setTimeout(function(){loader.dismiss(); }, 1000);
  }

  gobackProfile() {
    this.navCtrl.pop();
    localStorage.setItem("pageToPlan",'0') 
  }

}
