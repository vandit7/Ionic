import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, ToastController, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-transaction-history',
  templateUrl: 'transaction-history.html',
})
export class TransactionHistoryPage {
  result: any;
  tranHisList: any[] = [];
  dataSet: any;
  NotFound: any;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController, 
     public navParams: NavParams,
     public serviceProvider: ServiceProvider,
     private toastCtrl: ToastController,
    public platform: Platform,) {
      this.NotFound = false;
      $('.tabbar ').css('display', 'none');
      platform.registerBackButtonAction(() => {
        this.navCtrl.pop();
        if(localStorage.getItem("pageToPlan") == '0'){
          $('.tabbar').css('display', 'flex');
          }
          else{}
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionHistoryPage');
    this.allTranHisList();  
  }
  ionViewCanEnter(){
    this.platform.registerBackButtonAction(() => {
     
      this.navCtrl.pop();
      if(localStorage.getItem("pageToPlan") == '0'){
        $('.tabbar').css('display', 'flex');
        }
        else{}
     });
  }

  allTranHisList() {
    let TranHisListObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"), 
      "Type": "1",
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.TransactionHistory(TranHisListObj).then(data => {
      this.result = data;
      this.tranHisList = [] 
      if (this.result.status == 1) {
        this.NotFound = false;
        this.tranHisList = []
        this.dataSet = this.result.info;
        for (let i = 0; i < Object.keys(this.dataSet).length; i++) { 
          this.tranHisList.push(this.result.info[i]);
        }
        loader.dismiss();
      }
      else {
        loader.dismiss();
        this.NotFound = true;
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');    
      console.log(error.json());
      loader.dismiss();
    });
  }
  goToDetailsPage(item)
  {
    localStorage.setItem("TranItem",JSON.stringify(item))
    this.navCtrl.push('TransactionDetailsPage');
  }

  gobackProfile() {
    this.navCtrl.pop();
    if(localStorage.getItem("pageToPlan") == '0'){
      $('.tabbar').css('display', 'flex');
      }
      else{}
  }
  /**
  * 
  * @param msg 
  */
 presentToast(msg, bgColor) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'top',
    cssClass: bgColor,
  });

  toast.onDidDismiss(() => {
  });
}
}
