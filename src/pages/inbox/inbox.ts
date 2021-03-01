import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, LoadingController, Events, Platform, App, Nav, Tabs, AlertController, ModalController } from 'ionic-angular';
import $ from "jquery";
import { ServiceProvider } from '../../providers/service/service';
import { HomePage } from '../home/home';
import { ChatwindowPage } from '../chatwindow/chatwindow';
import { ContactPage } from '../contact/contact';
import { Socket } from 'ng-socket-io';
import { ImgFullPage } from '../img-full/img-full';

@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html'
})
export class InboxPage {
  madalDismissData: any;
  @ViewChild(Nav) nav: Nav;
  receivedTab: any;
  sendTab: any;
  result: any;
  dataSet: any;
  sendList: any[] = [];
  sendNotFound: any;
  receiveList: any[] = [];
  receiveNotFound: any;
  noInternet: any;
  anOtherPage: ChatwindowPage;
  public counter = 0;
  exitText: any;
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public serviceProvider: ServiceProvider,
    public events: Events,
    public socket: Socket,
    public socketSend: Socket,
    public alertCtrl: AlertController,
    private tabs: Tabs,
    public platform: Platform,
    public app: App,) {
    this.receivedTab = true;
    this.sendTab = false;
    this.sendNotFound = false;
    this.noInternet = false;
    platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.presentToast1();
        setTimeout(() => { this.counter = 0 }, 2000)
      } else {
        // console.log("exitapp");
        platform.exitApp();
      }
    }, 0)

  }

  ionViewWillEnter() {
    this.SendInvitationList();
    this.ReceiveInvitationList();
    //   this.allSendList();
    //   this.allReceiveList();  
    this.receivedTab = true;
    this.sendTab = false;
    this.sendNotFound = false;
    this.tabAlls('1');
    $("#tab-t0-0").attr("aria-selected", "false");
    $("#tab-t0-1").attr("aria-selected", "true");
    $("#tab-t0-2").attr("aria-selected", "false");
    $("#tab-t0-3").attr("aria-selected", "false");
    $(".ion-md-person").attr("ng-reflect-is-active", "false");
    this.platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.exitText = true;
        this.presentToast1();
        setTimeout(() => { this.counter = 0 }, 2000)
      } else {
        // console.log("exitapp");
        this.platform.exitApp();
      }
    }, 0)
  }
  ionViewDidEnter() {
    this.platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.exitText = true;
        this.presentToast1();
        setTimeout(() => { this.counter = 0 }, 2000)
      } else {
        // console.log("exitapp");
        this.platform.exitApp();
      }
    }, 0)
  }
  presentToast1() {
    this.exitText = true;
    setTimeout(() => { this.exitText = false; }, 2000)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
    // this.allSendList();
    // this.allReceiveList();  
    this.getAllUserDetails();
  }
  getAllUserDetails() {
    let allUserObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1"
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.getAllUserDetails(allUserObj).then(data => {
      this.result = data;
      this.noInternet = false;
      loader.dismiss();
      if (this.result.status == 1) {
        this.SendInvitationList();
        this.ReceiveInvitationList();
      }
      else {
      }
    }, error => {
      loader.dismiss();
      this.noInternet = true;
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
    });
  }
  tabAlls(no) {
    if (no == 1) {
      $('.tab1').addClass('activeTab');
      $('.tab2').removeClass('activeTab');
      $('.tab2').addClass('disTab');
      $('.tab1').removeClass('disTab');
      this.receivedTab = true;
      this.sendTab = false;
      this.ReceiveInvitationList();
    } else {
      $('.tab2').addClass('activeTab');
      $('.tab1').removeClass('activeTab');
      $('.tab1').addClass('disTab');
      $('.tab2').removeClass('disTab');
      this.receivedTab = false;
      this.sendTab = true;
      this.SendInvitationList();
    }
  }
  allSendList() {
    let sendListObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "2"
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    // loader.present();
    this.serviceProvider.SendInvitationList(sendListObj).then(data => {
      this.result = data;
      this.sendList = []
      if (this.result.status == 1) {
        this.dataSet = this.result.info;
        for (let i = 0; i < Object.keys(this.dataSet).length; i++) {
          this.sendList.push(this.result.info[i]);
        }
        loader.dismiss();
        this.sendNotFound = false;
      }
      else if (this.result.status == 0) {
        loader.dismiss();
        this.sendNotFound = true;
      }
      else {
        loader.dismiss();
        this.sendNotFound = true;
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
  }

  allReceiveList() {
    let sendListObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "2"
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.ReceiveInvitationList(sendListObj).then(data => {
      this.result = data;
      this.receiveList = [];
      if (this.result.status == 1) {
        this.dataSet = this.result.info;
        for (let i = 0; i < Object.keys(this.dataSet).length; i++) {
          this.receiveList.push(this.result.info[i]);
        }
        loader.dismiss();
        this.receiveNotFound = false;
      }
      else if (this.result.status == 0) {
        loader.dismiss();
        this.receiveNotFound = true;
      }
      else {
        loader.dismiss();
        this.receiveNotFound = true;
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
  }


  SendInvitationList() {
    this.socketSend.connect();
    var RegisterId = localStorage.getItem("register_id");
    var Type = "1";
    var ValidData = localStorage.getItem("ValidDataJat");
    this.socketSend.emit('SendInvitationList', { RegisterId: RegisterId, Type: Type, ValidData: ValidData }, function (response) {
      // console.log(response);
    });
    this.socketSend.on('ReceiveSendInvitationList', (data) => {
      this.result = data;
      this.sendList = []
      if (this.result.status == 1) {
        this.dataSet = this.result.info;
        for (let i = 0; i < Object.keys(this.dataSet).length; i++) {
          this.sendList.push(this.result.info[i]);
        }
        this.sendNotFound = false;
      }
      else if (this.result.status == 0) {
        this.sendNotFound = true;
      }
      else {
        this.sendNotFound = true;
      }

    });
  }

  ReceiveInvitationList() {
    this.socket.connect();
    var RegisterId = localStorage.getItem("register_id");
    var Type = "1";
    var ValidData = localStorage.getItem("ValidDataJat");
    this.socket.emit('ReceiveInvitationList', { RegisterId: RegisterId, Type: Type, ValidData: ValidData }, function (response) {
      // console.log(response);
    });
    this.socket.on('ReceivedInvitationList', (data) => {
      // console.log(data)
      this.result = data;
      this.receiveList = [];
      if (this.result.status == 1) {
        this.dataSet = this.result.info;
        for (let i = 0; i < Object.keys(this.dataSet).length; i++) {
          this.receiveList.push(this.result.info[i]);
        }
        this.receiveNotFound = false;
      }
      else if (this.result.status == 0) {
        this.receiveNotFound = true;
      }
      else {
        this.receiveNotFound = true;
      }
    });
  }


  connectNow(ToRegisterId, type) {
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
        // this.allUserList(); 
        loader.dismiss();
        if (type == 'send') {
          this.allSendList();
          this.receivedTab = false;
          this.sendTab = true;
        }
        else {
          this.allReceiveList();
          this.receivedTab = true;
          this.sendTab = false;
        }
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

  UpdateStatus(RequestID, UpdateStatus, type) {
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
        if (type == 'send') {
          this.allSendList();
          this.receivedTab = false;
          this.sendTab = true;
        }
        else {
          this.allReceiveList();
          this.receivedTab = true;
          this.sendTab = false;
        }
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
  joinChat(Id) {
    localStorage.setItem("con_id", Id);
    this.navCtrl.push('ChatwindowPage');
    localStorage.setItem("pageTo", '0')
    // this.app.getActiveNav().push(ChatwindowPage);
  }

  gotoProfileDetails(id) {
     console.log(id)
    const animationsOptions = {
      animation: 'ios-transition',
      duration: 500
    }
    localStorage.setItem("pageToHome", '0')
    localStorage.setItem("Profile_id", id),
      this.navCtrl.push('HomedetailsPage', { id: id }, animationsOptions);
  }

  doRefresh(refresher) {
    setTimeout(() => {
      // this.allSendList();
      // this.allReceiveList();  
      this.SendInvitationList();
      this.ReceiveInvitationList();
      refresher.complete();
    }, 2000);
  }
  ShowPopupCancelReq(ID) {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are You Sure Want to Cancel This Request ?',
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
            this.UpdateStatus(ID, '3', 'send')
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
