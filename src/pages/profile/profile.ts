import { Component, ViewChild, ɵConsole } from '@angular/core';
import { NavController, ToastController, LoadingController, Platform, Nav, ModalController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import $ from "jquery";
import { ServiceProvider } from '../../providers/service/service';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageTypeModalPage } from '../image-type-modal/image-type-modal';
import { File, FileEntry } from '@ionic-native/file'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  @ViewChild(Nav) nav: Nav;
  madalDismissData: any;
  result: any;
  fullname: any;

  profile: any;
  profile1: any;

  profile2: any;
  profile3: any;

  profile4: any;
  profile5: any;

  profile6: any;
  profile7: any;

  profile8: any;
  profile9: any;
  faq_links: any;
  step1: any;
  no1: any;
  src1: any
  listAccount: any;
  userList: any[] = [];
  dataSet: any;
  myRegister_id: string;
  is_primary: any;
  testImg: any;
  framepath: string;
  myphoto:any;
  current_plan:any;
  is_expire:any;
  view_contact:any;
  public counter=0;
  exitText:any;
  linkListAll:any;
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public serviceProvider: ServiceProvider,
    public alertCtrl: AlertController,
    public platform: Platform,
    private camera: Camera,
    private file: File,
    public modalCtrl: ModalController,
  ) {
    $('.tabbar ').css('display', 'flex');
    this.step1 = true;
    this.no1 = 0;
    this.src1 = '../../assets/imgs/plus.png';
    this.listAccount = false;
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
  funStep1() {
    if (this.no1 == 1) {
      this.step1 = true;
      this.no1 = 0;
      this.src1 = '../../assets/imgs/plus.png';
      this.listAccount = false;
    }
    else {
      this.step1 = false;
      this.no1 = 1;
      this.src1 = '../../assets/imgs/minus.png';
      this.listAccount = true;
    }
  }

  ionViewWillEnter() {

    this.getAllUserDetails();
    $("#tab-t0-0").attr("aria-selected", "false");
    $("#tab-t0-1").attr("aria-selected", "false");
    $("#tab-t0-2").attr("aria-selected", "false");
    $("#tab-t0-3").attr("aria-selected", "true");
    $(".ion-md-person").attr("ng-reflect-is-active", "true");
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
    console.log("Profile")
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage'); 
    //  this.getAllUserDetails();
  }
  gotoFDetails() {
    this.navCtrl.push('FamilydetailsPage');
  }
  gotoEditPreference() {
    this.navCtrl.push('EditpreferencePage');
    localStorage.setItem("pageToPlan",'0') 
  }
  gotoChangePassword() {
    this.navCtrl.push('ChangepasswordPage');
  }
  gotoEditprofile() {
    this.navCtrl.push('EditprofilePage');
  }
  plan()
  { 
    this.navCtrl.push('PriceTablePage'); 
    localStorage.setItem("pageToPlan",'0') 
  }
  TranHis()
  { 
    this.navCtrl.push('TransactionHistoryPage'); 
    localStorage.setItem("pageToPlan",'0') 
  }


  ShowPopupLogout()
  {
 
      let alert = this.alertCtrl.create({
        title: 'Confirm',
        message: 'Are you sure you want to logout?', 
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
              this.gotoLogin(); 
            }
          }
        ]
      });
      alert.present();
    
  }

  gotoLogin() {
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
    this.serviceProvider.UserLogout(allUserObj).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        loader.dismiss();
        this.presentToast(this.result.msg, 'bgGreen');
        localStorage.setItem("Islogin", '0');
        this.linkListAll='LinkList_'+localStorage.getItem("register_id")
        localStorage.removeItem( this.linkListAll)
        this.navCtrl.push('LoginPage');
        $('.tabbar ').css('display', 'none');
      }
      else {
        loader.dismiss();
        this.presentToast(this.result.msg, 'bgRed');
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });


  }
  showPreviewImage1(event: any) {
    this.profile = event.target.files[0];
    if (this.profile == undefined || this.profile == null || this.profile == '') {

    } else {
      this.imageUpload(this.profile, 1);
    }

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.profile1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  showPreviewImage2(event: any) {
    this.profile2 = event.target.files[0];
    if (this.profile2 == undefined || this.profile2 == null || this.profile2 == '') {
    } else {
      //console.log(this.profile2)
      this.imageUpload(this.profile2, 2);
    }

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.profile3 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  showPreviewImage3(event: any) {
    this.profile4 = event.target.files[0];
    if (this.profile4 == undefined || this.profile4 == null || this.profile4 == '') {
    } else {
      this.imageUpload(this.profile4, 3);
    }

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.profile5 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  showPreviewImage4(event: any) {
    this.profile6 = event.target.files[0];
    if (this.profile6 == undefined || this.profile6 == null || this.profile6 == '') {
    } else {
      this.imageUpload(this.profile6, 4);
    }

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.profile7 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  showPreviewImage5(event: any) {

    this.profile8 = event.target.files[0];
    if (this.profile8 == undefined || this.profile8 == null || this.profile8 == '') {
    } else {
      this.imageUpload(this.profile8, 5);
    }

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.profile9 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  imageUpload(imagePath, no) {

    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.updateProfileApi(imagePath, no).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        loader.dismiss();
        this.presentToast(this.result.msg, 'bgGreen');
        this.getAllUserDetails();
      }
      else {
        loader.dismiss();
        this.presentToast(this.result.msg, 'bgRed');
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
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
      this.userList = []; 
      this.profile1 = '';
      this.profile3 = '';
      this.profile5 = '';
      this.profile7 = '';
      this.profile9 = '';
      if (this.result.status == 1) {
        let rand = Math.floor(Math.random() * 20) + 1;

        this.profile1 = this.result.info.user_profile[0].profile + '?time=' + rand;
        this.profile3 = this.result.info.user_profile[1].profile + '?time=' + rand + 5;
        this.profile5 = this.result.info.user_profile[2].profile + '?time=' + rand + 10;
        this.profile7 = this.result.info.user_profile[3].profile + '?time=' + rand + 15;
        this.profile9 = this.result.info.user_profile[4].profile + '?time=' + rand + 50;
        this.is_expire = this.result.info.user_detail.is_expire;
        localStorage.setItem("is_expire", this.is_expire);
        this.current_plan = this.result.info.user_detail.current_plan;
        localStorage.setItem("current_plan", this.current_plan);
        this.view_contact = this.result.info.user_detail.view_contact;
        localStorage.setItem("view_contact", this.view_contact);
           

        this.fullname = this.result.info.user_detail.fullname;
        this.faq_links = this.result.info.user_detail.faq_links;
        this.is_primary = this.result.info.user_detail.is_primary;
        localStorage.setItem("is_primary", this.is_primary);
        this.myRegister_id = localStorage.getItem("register_id"),
          this.dataSet = this.result.info.AllAccount;
        for (let i = 0; i < Object.keys(this.dataSet).length; i++) {
          this.userList.push(this.result.info.AllAccount[i]);
        }
        //  console.log(this.userList)

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
  changeAccount(register_id) {
    localStorage.setItem("register_id", register_id);
    this.getAllUserDetails();
  }

  faqUrl() {
    // this.faq_links
    window.open(this.faq_links, '_system', 'location=yes');
  }



  
  addAccount() {
    if (localStorage.getItem("is_primary") == '0') {
      this.presentToast('Please Add Account using primary account !', 'bgRed');
    }
    else {
      this.navCtrl.push('AddaccountPage'); 
    }
  }
  // OPEN CAMERA
  openCamera() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      this.getSystemURL(imageData);
      // this.framepath = "data:image/jpeg;base64," + imageData;
      //console.log(imageData)
    }, (err) => {
      console.log(err);
    });
  }

  getSystemURL(imageFileUri: any) {
    this.file.resolveLocalFilesystemUrl(imageFileUri)
        .then(entry => (entry as FileEntry).file(file => {
          this.readFile(file);
        }))
        .catch(err => console.log(err));
  }

  readFile(file: any) {
  //  console.log(JSON.stringify(file))
    const reader = new FileReader();
    const formData = new FormData();
   
    reader.onloadend = (evt: any) => {
     
      const myphoto = new Blob([reader.result], {type: file.type});
      formData.append('file',   myphoto, file.name);
    
    //  console.log(JSON.stringify(myphoto))
     // console.log(JSON.stringify(formData))
      this.imageUpload(myphoto, 1);
   
    };
    // reader.onloadend = (evt: any) => {
    //   let imgBlob: any = new Blob([new Uint8Array(evt.target.result)],{type:file.type});
    //   imgBlob.name = 'test.png';
    // ///  that.attachments.push(imgBlob);
    //   console.log(evt);
    //   this.imageUpload(imgBlob, 1);
    //  // resolve(imgBlob);
    // };
    reader.readAsArrayBuffer(file);
    
  }


  openModal(no) {
    const profileModal = this.modalCtrl.create(ImageTypeModalPage, { userId: 8675309 }, { cssClass: "mymodal3" });
    profileModal.onDidDismiss(data => {
    
    try{
      if( data.foo == 'camera')
      {
       this.openCamera();
      }
      else{
      if(no == '1')
      {
        this.profile = data.type1;
        if (this.profile == undefined || this.profile == null || this.profile == '') {
        } else {
          this.imageUpload(this.profile, 1);
        }
        if (data.type1 && data.type1) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.profile1 = event.target.result;
          }
          reader.readAsDataURL(data.type1);
        }
      }

      else  if (no == '2') {
        this.profile2 = data.type1;
         if (this.profile2 == undefined || this.profile2 == null || this.profile2 == '') {
        } else {
          this.imageUpload(this.profile2, 2);
        }
        if (data.type1 && data.type1) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.profile3 = event.target.result;
          }
          reader.readAsDataURL(data.type1);
        }
      }

      else  if (no == '3') {
        this.profile4 = data.type1;
        if (this.profile4 == undefined || this.profile4 == null || this.profile4 == '') {
        } else {
          this.imageUpload(this.profile4, 3);
        }
    
        if (data.type1 && data.type1) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.profile5 = event.target.result;
          }
          reader.readAsDataURL(data.type1);
        }
      }
      else  if (no == '4') {
        this.profile6 = data.type1;
        if (this.profile6 == undefined || this.profile6 == null || this.profile6 == '') {
        } else {
          this.imageUpload(this.profile6, 4);
        }
    
        if (data.type1 && data.type1) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.profile7 = event.target.result;
          }
          reader.readAsDataURL(data.type1);
        }
      }
      else  if (no == '5') {
        this.profile8 =data.type1;
        if (this.profile8 == undefined || this.profile8 == null || this.profile8 == '') {
        } else {
          this.imageUpload(this.profile8, 5);
        }
    
        if (data.type1 && data.type1) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.profile9 = event.target.result;
          }
          reader.readAsDataURL(data.type1);
        }
      }
    }
    }catch(e){

    }

      this.madalDismissData = JSON.stringify(data);
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
