import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, Nav, App, ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import $ from "jquery";
import { Socket } from 'ng-socket-io';
import { ServiceProvider } from '../../providers/service/service';
import { ImgFullPage } from '../img-full/img-full';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  madalDismissData: any;
  @ViewChild(Nav) nav: Nav;
  result:any;
  dataSet:any;
  chatList:any[]=[];
  chatNotFound:any;
  noInternet:any;
  fir:any;
  public counter=0;
  exitText:any;
  constructor(public navCtrl: NavController,
   
    private socket: Socket,
    public app: App,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public platform: Platform,
    public serviceProvider: ServiceProvider,) {
      $('.tabbar ').css('display','flex');
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
     this.chatNotFound=false;
     this.noInternet=false;
     this.fir=1;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }
  ionViewWillEnter(){
    $("#tab-t0-0").attr("aria-selected", "false");
    $("#tab-t0-1").attr("aria-selected", "false");
    $("#tab-t0-2").attr("aria-selected", "true");
    $("#tab-t0-3").attr("aria-selected", "false");
    $(".ion-md-person").attr("ng-reflect-is-active", "false");
    
    this.getAllUserDetails();
    this.platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.exitText=true;
        this.presentToast1();
        setTimeout(() => { this.counter = 0 }, 2000)
      } else {
        // console.log("exitapp");
        this.platform.exitApp();
      }
    }, 0)
  }
  ionViewDidEnter()
  {
    this.platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.exitText=true;
        this.presentToast1();
        setTimeout(() => { this.counter = 0 }, 2000)
      } else {
        // console.log("exitapp");
        this.platform.exitApp();
      }
    }, 0)
  }
  presentToast1() {
    this.exitText=true;
    setTimeout(() => {  this.exitText=false; }, 2000)
  }
  getAllUserDetails() {
    let allUserObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1"
    } 
    //  let loader = this.loadingCtrl.create({
    //   spinner: 'bubbles',
    //   content: "Please wait...",
    // });
    //  loader.present();
    this.serviceProvider.getAllUserDetails(allUserObj).then(data => {
    //  loader.dismiss();
      this.result = data;
      this.noInternet=false;
      if (this.result.status == 1) {
        this.allChatListNew(); 
      }
      else {
      }
    }, error => {
     // loader.dismiss();
      this.noInternet=true;
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
    });
  }
  allChatListNew(){
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.socket.connect(); 
    var RegisterId =  localStorage.getItem("register_id"); 
  	var Type = "1";
    var ValidData = localStorage.getItem("ValidDataJat");
    this.socket.emit('PendingListData', {RegisterId: RegisterId,Type: Type,ValidData: ValidData}, function (response) {
     // console.log(response);
    });
    this.socket.on('ReceivePendingListData', (response) => {
 
       this.result = response;
       this.chatList=[]
       loader.dismiss();
       if (this.result.status == 1) { 
         this.dataSet=this.result.info; 
        
         for(let i=0;i<Object.keys(this.dataSet).length;i++) 
         {
          this.chatList.push(this.result.info[i]);    
         }
        
         this.chatNotFound=false;
       }
       else if(this.result.status == 0){
         this.chatNotFound=true;
       }
       else {
         this.chatNotFound=true; 
       }
    }); 

    this.socket.on('disconnect', function(){
      loader.dismiss();
      this.noInternet=true;
    });
  }

  presentConfirmUnBlock(name,register_id) {
    let alert = this.alertCtrl.create({
      message: 'To send a message, Unblock '+name+'',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Unblock',
          handler: () => {
           this.userBlock(register_id);
          }
        }
      ]
    });
    alert.present();
  }

  // allChatList()  
  // {
  //   let chatListObj = {
  //     "RegisterId": localStorage.getItem("register_id"), 
  //     "ValidData": localStorage.getItem("ValidDataJat"), 
  //     "Type": "1"
  //   }
  //   let loader = this.loadingCtrl.create({
  //     spinner: 'bubbles',
  //     content: "Please wait...",
  //   });
  //   loader.present();
  //   this.serviceProvider.ChatList(chatListObj).then(data => { 
  //     this.result = data;
  //     this.chatList=[]
  //     if (this.result.status == 1) {
  //       this.dataSet=this.result.info;  
  //       for(let i=0;i<Object.keys(this.dataSet).length;i++) 
  //       {
  //        this.chatList.push(this.result.info[i]);    
  //       }
  //       loader.dismiss();
  //       this.chatNotFound=false;
  //     }
  //     else if(this.result.status == 0){
  //       loader.dismiss();
  //       this.chatNotFound=true;
  //     }
  //     else {
  //       loader.dismiss();
  //       this.chatNotFound=true;
  //     }
  //   }, error => { 
  //     this.presentToast('No Internet connection !', 'bgRed');   
  //     console.log(error.json());
  //     loader.dismiss();
  //   });
  // }
  userBlock(Toregister_id) {
    let UserBlockUnblockObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ToRegisterId":Toregister_id,
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1",
      "Block": "2",
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.UserBlockUnblock(UserBlockUnblockObj).then(data => {
      this.result = data;
      loader.dismiss();
      if (this.result.status == 1) {
       
      }
      else {
       
      }
    }, error => {
      // this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      
      loader.dismiss();

    });
  }

  joinChat(name,Id) 
  {
   localStorage.setItem("con_id",Id);
   this.navCtrl.push('ChatwindowPage',{name:name}); 
   localStorage.setItem("pageTo",'0')   
  }
  openModal(imgUrl,name) {
    localStorage.setItem("PopImgUrl",imgUrl);
    localStorage.setItem("PopName",name);
    console.log(name)
    const profileModal = this.modalCtrl.create(ImgFullPage, { userId: 8675309 }, { cssClass: "mymodal4" });
    profileModal.onDidDismiss(data => {
     // console.log(data);

      this.madalDismissData = JSON.stringify(data);
    });
    profileModal.present();
  }
  
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
