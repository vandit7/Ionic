import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, Slides, ToastController, AlertController, ModalController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { ProfilePage } from '../profile/profile';
import $ from "jquery";
import { SlideContainer } from 'ionic-angular/umd/components/slides/swiper/swiper-interfaces';
import { PlanpopupPage } from '../planpopup/planpopup';

@IonicPage()
@Component({
  selector: 'page-price-table',
  templateUrl: 'price-table.html',
})
export class PriceTablePage {

  result: any;
  priceList: any[] = [];
  dataSet: any;
  current_plan: any;
  view_contact: any;
  planLength: any;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public serviceProvider: ServiceProvider,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,

    public platform: Platform,) {
    $('.tabbar ').css('display', 'none');
    this.current_plan = localStorage.getItem("current_plan");
    this.view_contact = localStorage.getItem("view_contact");
    platform.registerBackButtonAction(() => {
      //   this.navCtrl.setRoot(ProfilePage);
      this.navCtrl.pop();
      if (localStorage.getItem("pageToPlan") == '0') {
        $('.tabbar').css('display', 'flex');
      }
      else { }
    });
  }
  ionViewCanEnter() {
    this.platform.registerBackButtonAction(() => {

      this.navCtrl.pop();
      if (localStorage.getItem("pageToPlan") == '0') {
        $('.tabbar').css('display', 'flex');
      }
      else { }
    });
  }
  ionViewDidLoad() {
    this.allpriceList();
    console.log('ionViewDidLoad PriceTablePage');
    this.platform.registerBackButtonAction(() => {

      this.navCtrl.pop();
      if (localStorage.getItem("pageToPlan") == '0') {
        $('.tabbar').css('display', 'flex');
      }
      else { }
    });
  }

  openPlandetails(plan,planname) {
    localStorage.setItem('plan',JSON.stringify(plan))
    localStorage.setItem('planame',planname)
    const openViewContect = this.modalCtrl.create(PlanpopupPage, { userId: JSON.stringify(plan) });
    openViewContect.onDidDismiss(data => {
    });
    openViewContect.present();
  }


  allpriceList() {
    let priceListObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1",
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.BuyPlan(priceListObj).then(data => {
      this.result = data;
      this.priceList = []
      if (this.result.status == 1) {
        this.priceList = []
        this.dataSet = this.result.info;
        for (let i = 0; i < Object.keys(this.dataSet).length; i++) {
          this.priceList.push(this.result.info[i]);
          console.log(this.result.info[i])
        }
        this.planLength = this.priceList.length;
        loader.dismiss();
      }
      else {
        this.planLength = 0;
        loader.dismiss();
      }
    }, error => {
      //  this.presentToast('No Internet connection !', 'bgRed');    
      console.log(error.json());
      loader.dismiss();
    });
  }

  ShowPopupUpgrade(PlanID) {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure you want to buy this plan ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            localStorage.setItem("PlanID", PlanID);
            localStorage.setItem("pageToPlan", '0')
            this.navCtrl.push('PaymentMethodPage');
          }
        }
      ]
    });
    alert.present();
  }

  gobackProfile() {
    this.navCtrl.pop();
    if (localStorage.getItem("pageToPlan") == '0') {
      $('.tabbar ').css('display', 'flex');
    }
    else { }
    //this.navCtrl.setRoot(ProfilePage);
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
    toast.present();
  }
}
