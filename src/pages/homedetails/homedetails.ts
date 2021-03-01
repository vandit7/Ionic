import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform, App, AlertController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import $ from "jquery";
import { ServiceProvider } from '../../providers/service/service';
import { ChatwindowPage } from '../chatwindow/chatwindow';
import { PriceTablePage } from '../price-table/price-table';
import { ImgFullPage } from '../img-full/img-full';

@IonicPage()
@Component({
  selector: 'page-homedetails',
  templateUrl: 'homedetails.html',
})
export class HomedetailsPage {
  value: any;
  result: any;
  dataSet: any;
  profile: any;
  fullname: any;
  age: any;
  height: any;
  education_field: any;
  city: any;
  state: any;
  country_name: any;
  profile_for: any;
  register_id: any;
  about: any;
  mobile_no: any;
  email_id: any;
  weight: any;
  marital_status: any;
  smoke: any;
  drink: any;
  skin_type: any;
  body_type: any;
  education_level: any;
  organisation: any;
  income: any;
  RequestStatus: any;
  RequestID: any;
  Selectregister_id: any;
  expectationDiv: any;
  MainLabel: any;
  leftSide: any;
  matches_count: any;
  leftProImg: any;
  leftAge: any;
  leftTitle: any;
  leftHeight: any;
  leftMarital_status: any;
  leftSmoke: any;
  leftDrink: any;
  rightSide: any;
  rightProImg: any;
  rightTitle: any;
  rightAge: any;
  rightHeight: any;
  rightDrink: any;
  rightSmoke: any;
  rightMarital_status: any;
  is_expire: any;
  LinkList: any[] = [];
  LinkListFull: any;
  userListImg: any[] = [];
  linkListAll:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public serviceProvider: ServiceProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public app: App,
    public platform: Platform, ) {
    this.expectationDiv = false;
    $('.tabbar').css('display', 'none')
    //this.value = navParams.get('id');
    this.value = localStorage.getItem("Profile_id"),
      this.userSelectedId(this.value);

    platform.registerBackButtonAction(() => {
      //this.navCtrl.setRoot(HomePage); 
      this.navCtrl.pop();
      if (localStorage.getItem('pageToHome') == '0') {
        $('.tabbar ').css('display', 'flex');
      }  else{
        $('.tabbar ').css('display', 'none');
      }
    });
    this.is_expire = localStorage.getItem("is_expire");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomedetailsPage');
    //  this.userSelectedId();
  }
  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      if (localStorage.getItem('pageToHome') == '0') {
        $('.tabbar ').css('display', 'flex');
      }  else{
        $('.tabbar ').css('display', 'none');
      }
    });
  }
  gotoMain() {
    // this.navCtrl.setRoot(HomePage);
    this.navCtrl.pop();
    if (localStorage.getItem('pageToHome') == '0') {
      $('.tabbar ').css('display', 'flex');
    }  else{
      $('.tabbar ').css('display', 'none');
    }
  }

  userSelectedId(value) {
    let userSelectedIdObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "UserId": value,
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "2",
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.userSelectedId(userSelectedIdObj).then(data => {
      this.result = data;
      if (this.result.status == 1) {


        for (let i = 0; i < Object.keys(this.result.info.slider).length; i++) {
          this.userListImg.push(this.result.info.slider[i])
        }
       
        this.profile = this.result.info.user_detail.profile;
        this.fullname = this.result.info.user_detail.fullname;
        this.age = this.result.info.user_detail.age;
        this.height = this.result.info.user_detail.height;
        this.education_field = this.result.info.user_detail.education_field;

        this.city = this.result.info.user_detail.city;
        this.state = this.result.info.user_detail.state;
        this.country_name = this.result.info.user_detail.country_name;
        this.register_id = this.result.info.user_detail.register_id;
        this.profile_for = this.result.info.user_detail.profile_for;
        this.about = this.result.info.user_detail.about;

        // this.mobile_no=this.result.info.user_detail.mobile_no;
        let deemail = this.result.info.user_detail.mobile_no;
        let mailLength = deemail.length;
        let intLetters1 = deemail.substring(0, 2);
        let intLettersss1 = deemail.substring(mailLength - 3, mailLength);
        this.mobile_no = intLetters1 + "*****" + intLettersss1   //"+dem*******om"


        this.email_id = this.result.info.user_detail.email_id;
        this.weight = this.result.info.user_detail.weight;
        this.marital_status = this.result.info.user_detail.marital_status;

        this.smoke = this.result.info.user_detail.smoke;
        this.drink = this.result.info.user_detail.drink;
        this.skin_type = this.result.info.user_detail.skin_type;
        this.body_type = this.result.info.user_detail.body_type;
        this.education_level = this.result.info.user_detail.education_level;
        this.organisation = this.result.info.user_detail.organisation;
        this.income = this.result.info.user_detail.income;
        this.RequestStatus = this.result.info.user_detail.RequestStatus;
        this.RequestID = this.result.info.user_detail.RequestID;
        this.Selectregister_id = this.result.info.user_detail.register_id;

        if (this.result.info.expectation.length == 0 || this.result.info.expectation == null || this.result.info.expectation == '') {
          this.expectationDiv = false;
        } else {
          this.expectationDiv = true;
          this.MainLabel = this.result.info.expectation.title;
          this.matches_count = this.result.info.expectation.matches_count;

          this.leftSide = this.result.info.expectation.left;
          this.leftProImg = this.leftSide.profile;
          this.leftTitle = this.leftSide.title;
          this.leftAge = this.leftSide.age;
          this.leftHeight = this.leftSide.height;
          this.leftMarital_status = this.leftSide.marital_status;
          this.leftDrink = this.leftSide.drink;
          this.leftSmoke = this.leftSide.smoke;

          this.rightSide = this.result.info.expectation.right;
          this.rightProImg = this.rightSide.profile;
          this.rightTitle = this.rightSide.title;
          this.rightAge = this.rightSide.age;
          this.rightHeight = this.rightSide.height;
          this.rightMarital_status = this.rightSide.marital_status;
          this.rightDrink = this.rightSide.drink;
          this.rightSmoke = this.rightSide.smoke;

        }

        loader.dismiss();
      }
      else {
        loader.dismiss();
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
  }
  joinChat(Id) {
    localStorage.setItem("con_id", Id);
    this.navCtrl.push('ChatwindowPage');
    localStorage.setItem("pageTo", '1')
    // this.app.getActiveNav().push(ChatwindowPage)

  }
  connectNow(ToRegisterId) {
    let connectNowObj = {
      "FromRegisterId": localStorage.getItem("register_id"),
      "ToRegisterId": ToRegisterId,
      "Type": "1",
      "ValidData": localStorage.getItem("ValidDataJat"),

    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.connectNow(connectNowObj).then(data => {
      this.result = data;

      if (this.result.status == 1) {
        this.presentToast(this.result.msg, 'bgGreen');
        this.value = localStorage.getItem("Profile_id"),
          this.userSelectedId(this.value);

        loader.dismiss();
      }
      else {
        this.presentToast(this.result.msg, 'bgRed');
        loader.dismiss();

      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
  }

  UpdateStatus(RequestID, UpdateStatus) {
    let UpdateStatusObj = {

      "Mode": "1",
      "UpdateStatus": UpdateStatus,
      "RequestId": RequestID,
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1",

    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.UpdateStatus(UpdateStatusObj).then(data => {
      this.result = data;

      if (this.result.status == 1) {
        this.presentToast(this.result.msg, 'bgGreen');
        this.value = localStorage.getItem("Profile_id"),
          this.userSelectedId(this.value);
        loader.dismiss();
      }
      else {
        this.presentToast(this.result.msg, 'bgRed');
        loader.dismiss();

      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
  }
  UpdateContact(ToRegisterId) {
    let UpdateContactObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "UserRegisterId": ToRegisterId,
      "Type": "1",
      "ValidData": localStorage.getItem("ValidDataJat"),

    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.UpdateContact(UpdateContactObj).then(data => {
      this.result = data;

      if (this.result.status == 1) {
        //this.presentToast(this.result.msg ,'bgGreen');
        this.mobile_no = this.result.info;
        this.is_expire = '3';
        loader.dismiss();
      }
      else {
        // this.presentToast(this.result.msg ,'bgRed');
        loader.dismiss();
        this.ShowPopupApi(this.result.msg)

      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
  }

  ShowPopupApi(msg) {
    let alert = this.alertCtrl.create({
      title: 'Upgrade',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Upgrade',
          handler: () => {
            //this.app.getActiveNav().push(PriceTablePage);
            this.navCtrl.push('PriceTablePage');
            localStorage.setItem("pageToPlan", '1')
          }
        }
      ]
    });
    alert.present();
  }

  ShowPopupUpgrade() {
    let alert = this.alertCtrl.create({
      title: 'Upgrade',
      message: 'Please Upgrade Your Plan !',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Upgrade',
          handler: () => {
            // this.app.getActiveNav().push(PriceTablePage);
            this.navCtrl.push('PriceTablePage');
            localStorage.setItem("pageToPlan", '1')
          }
        }
      ]
    });
    alert.present();
  }
  ShowPopupExpired() {

    let alert = this.alertCtrl.create({
      title: 'Renew',
      message: 'Your Plan is Expired !',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Renew',
          handler: () => {
            // this.app.getActiveNav().push(PriceTablePage);
            this.navCtrl.push('PriceTablePage');
            localStorage.setItem("pageToPlan", '1')
          }
        }
      ]
    });
    alert.present();

  }
  ShowPopupMobile(register_id) {

    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure want to show this Mobile No ?',
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
            this.UpdateContact(register_id)
          }
        }
      ]
    });
    alert.present();

  }


  ShowPopupCancelReq(RequestID) {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure want to cancel this request ?',
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
            this.UpdateStatus(RequestID, '3')
          }
        }
      ]
    });
    alert.present();
  }
  openModal(imgUrl, name) {
    localStorage.setItem("PopImgUrl", imgUrl);
    localStorage.setItem("PopName", name);
    const profileModal = this.modalCtrl.create(ImgFullPage, { userId: 8675309 }, { cssClass: "mymodal4" });
    profileModal.onDidDismiss(data => {
      // console.log(data);


    });
    profileModal.present();
  }


  linkPro(proId) {
    this.linkListAll='LinkList_'+localStorage.getItem("register_id")
 
     this.LinkListFull = JSON.parse(localStorage.getItem(this.linkListAll));
     if (this.LinkListFull != null) {
 
       for (let i = 0; i < Object.keys(this.LinkListFull).length; i++) {
         if (this.LinkListFull[i] === proId) {
           this.LinkList.push(this.LinkListFull[i]);
           break;
         }
       }
     }
     else { }
 
     this.LinkList = JSON.parse(localStorage.getItem( this.linkListAll));
     if (this.LinkList != null) { }
     else {
       this.LinkList = []
     }
     this.LinkList.push(proId);
     localStorage.setItem( this.linkListAll, JSON.stringify(this.LinkList))
    
   }
   unLinkPro(proId1) {
     this.linkListAll='LinkList_'+localStorage.getItem("register_id")
     this.LinkListFull = JSON.parse(localStorage.getItem( this.linkListAll));
     if (this.LinkListFull != null) {
       
       for (let i = 0; i < Object.keys(this.LinkListFull).length; i++) {
         if (this.LinkListFull[i] === proId1) {
           this.LinkListFull.splice(i, 1);
           localStorage.setItem( this.linkListAll, JSON.stringify(this.LinkListFull))
           break;
         }
       }
     }
   
    
   }
 
   test(id) {
     this.linkListAll='LinkList_'+localStorage.getItem("register_id")
     this.LinkListFull = JSON.parse(localStorage.getItem(this.linkListAll));
     var matchFound = false
     if (this.LinkListFull != null) {
 
       for (let i = 0; i < Object.keys(this.LinkListFull).length; i++) {
         if (this.LinkListFull[i] === id) {
           matchFound = true;
           break;
         }
       }
 
       return matchFound;
     }
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
