import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, Alert, Platform, ModalController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import $ from "jquery";
import { ServiceProvider } from '../../providers/service/service';
import { HomePage } from '../home/home';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { IncomepopupPage } from '../incomepopup/incomepopup';
// import { AuthService } from "angularx-social-login";
// import { SocialUser } from "angularx-social-login";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  hei: any;
  result: any;
  types: any;
  subscription: any;
  platform: any;
  disableButton:any;
  emailId:any;
  mobile:any;
  password:any;
  finalHe:any;
//  public user: SocialUser;

displayName: any;
email: any;
familyName: any;
givenName: any;
userId: any;
imageUrl: any;

isLoggedIn:boolean = false;

userData:any;
  @ViewChild('inputToFocus') inputToFocus;
  constructor(public navCtrl: NavController,  
    public serviceProvider: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
   // private authService: AuthService,
    public fb: Facebook, 
    platform: Platform,
    public navParams: NavParams,
    private googlePlus: GooglePlus
    ) {

      platform.registerBackButtonAction(() => {
        navigator['app'].exitApp();
      });
     
  }

  ionViewDidLoad() {
    
   console.log('ionViewDidLoad LoginPage');
    this.hei = window.screen.height;
    this.finalHe = (this.hei/2)+55; 
    $('.heightCss').css('height',this.finalHe+'px'); 
    this.disableButton = false;
    $('.tabbar ').css('display','none')
  
    localStorage.removeItem("Jstep1");
    localStorage.removeItem("Jstep2");
    localStorage.removeItem("Jstep3");
    
  }

  openApp()
  {
    this.navCtrl.setRoot(TabsPage);
  }
  gotoRegister(){
     this.navCtrl.push('Register1Page');       
  }
  gotoForgot(){
    this.navCtrl.push('ForgotpasswordPage');      
  }

  appLogin()
  {
   
    
    if (this.emailId== '' || this.emailId == null || this.emailId.trim() == "") {
      this.presentToast('Please Enter Mobile No !','bgRed');
    }
    // else if (this.password == '' || this.password == null || this.password.trim() == "") {
    //   this.presentToast('Please Enter Password !','bgRed');
    // }
    else {
      this.disableButton = true;
      let signinObj = {
        "UserName": this.emailId,
        "Password": '',
        "ValidData": localStorage.getItem("ValidDataJat"),
        "Type": "1",
        "OTPCode":'',
      }
      let loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: "Please wait...",
      });
      loader.present();
      this.serviceProvider.loginApi(signinObj).then(data => {
        this.result = data;
        this.disableButton = false;
        if (this.result.status == 1) {
          loader.dismiss();
          this.presentToast(this.result.msg ,'bgGreen');
           localStorage.setItem("register_id", this.result.info.register_id); 
           this.navCtrl.setRoot(TabsPage);
        // this.navCtrl.setRoot(HomePage);
        
           localStorage.setItem("Islogin", '1'); 
        }
        else if(this.result.status == 2){
          loader.dismiss();
          this.presentToast(this.result.msg,'bgGreen'); 
          this.navCtrl.push("OtppagePage"); 
          localStorage.setItem("Userregister_id", this.result.info.register_id);
          localStorage.setItem("otpMobile", this.result.info.mobile_no);
        }
        else if(this.result.status == 3){
          loader.dismiss();
          this.presentToast(this.result.msg,'bgGreen'); 
          this.navCtrl.push("LoginotpPage"); 
          // localStorage.setItem("Userregister_id", this.result.info.register_id);
          localStorage.setItem("loginotpMobile", this.result.info.mobile_no);
        }
        else if(this.result.status == 4){
          loader.dismiss();
          this.presentToast(this.result.msg,'bgGreen'); 
          const profileModal = this.modalCtrl.create(IncomepopupPage, { info: this.result.info }, { cssClass: "mymodal4" });
          profileModal.onDidDismiss(data => {
            // console.log(data);
          });
          profileModal.present();
          // localStorage.setItem("Userregister_id", this.result.info.register_id);
          localStorage.setItem("loginotpMobile", this.result.info.mobile_no);
        }
        else {
          loader.dismiss();
          this.presentToast(this.result.msg,'bgRed');
        }
      }, error => {
        this.disableButton = false;
        this.presentToast('No Internet connection !','bgRed'); 
        console.log(error.json());
        loader.dismiss();
      });
    }
  }  
  
  loginActionGmail() {
    localStorage.removeItem("socialEmail");
    localStorage.removeItem("socialLastName"); 
    localStorage.removeItem("socialFirstName");  
    this.googlePlus.login({})
      .then(res => {
        console.log(res);
      
    let signinObj = {
      "EmailId" : res.email,
      "FirstName" : res.familyName,
      "LastName" :  res.givenName,
      "SocialID" : res.userId,
      "SocialType" : "gmail",
      "SocialProfile" : "",
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1"
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.UserSocialLogin(signinObj).then(data => {
      this.result = data;
     // this.disableButton = false;
      if (this.result.status == 1) {
        loader.dismiss();
         if(this.result.info.is_update == '1')
         {
         this.presentToast(this.result.msg ,'bgGreen');
         localStorage.setItem("register_id", this.result.info.register_id); 
         this.navCtrl.setRoot(TabsPage);
         localStorage.setItem("Islogin", '1'); 
         }
         else{
          loader.dismiss();
         // this.presentToast(this.result.msg,'bgGreen'); 
          localStorage.setItem("register_id", this.result.info.register_id); 
          localStorage.setItem("socialEmail", this.result.info.email_id);
          localStorage.setItem("socialLastName", this.result.info.LastName); 
          localStorage.setItem("socialFirstName", this.result.info.FirstName);  
          this.navCtrl.push("SocialformPage"); 
         }
      }
      else if(this.result.status == 2){
        loader.dismiss();
        this.presentToast(this.result.msg,'bgGreen'); 
        this.navCtrl.push("OtppagePage"); 
        localStorage.setItem("Userregister_id", this.result.info.register_id);
        localStorage.setItem("otpMobile", this.result.info.mobile_no);
      }
      else if(this.result.status == 3){
        loader.dismiss();
       // this.presentToast(this.result.msg,'bgGreen'); 
        localStorage.setItem("register_id", this.result.info.register_id); 
        localStorage.setItem("socialEmail", this.result.info.email_id); 
        localStorage.setItem("socialLastName", this.result.info.LastName); 
        localStorage.setItem("socialFirstName", this.result.info.FirstName); 
        this.navCtrl.push("SocialformPage"); 

       
      }
      else {
        loader.dismiss();
        this.presentToast(this.result.msg,'bgRed');
      }
    }, error => {
    //  this.disableButton = false;
      this.presentToast('No Internet connection !','bgRed'); 
      console.log(error.json());
      loader.dismiss();
    });

  })
  .catch(err => {console.error(err); 
    //this.presentToast('Something Went To Wrong','bgRed'); 
  });

  }


  loginActionFB()
{
  this.fb.login(['email', 'public_profile'])
    .then( (res: FacebookLoginResponse) => {
  
        // The connection was successful
        if(res.status == "connected") {
            var fb_id = res.authResponse.userID;
            var fb_token = res.authResponse.accessToken;

            this.fb.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
             // alert(JSON.stringify(profile))
              var res1 = Object.keys(profile).some(v => v == 'email');
              if(res1 == true)
              {
                let signinObj = {
                  "EmailId" : profile.email,
                  "FirstName" : profile.first_name,
                  "LastName" :  profile.last_name,
                  "SocialID" : profile.id,
                  "SocialType" : "facebook",
                  "SocialProfile" : "",
                  "ValidData": localStorage.getItem("ValidDataJat"),
                  "Type": "1"
                }
                let loader = this.loadingCtrl.create({
                  spinner: 'bubbles',
                  content: "Please wait...",
                });
                loader.present();
                this.serviceProvider.UserSocialLogin(signinObj).then(data => {
                  this.result = data;
                 // this.disableButton = false;
                  if (this.result.status == 1) {
                    loader.dismiss();

                    // Varified 
                     if(this.result.info.is_update == '1')
                     {
                     this.presentToast(this.result.msg ,'bgGreen');
                     localStorage.setItem("register_id", this.result.info.register_id); 
                     this.navCtrl.setRoot(TabsPage);
                     localStorage.setItem("Islogin", '1'); 
                     }
                     
                     else{
                      loader.dismiss();
                     // this.presentToast(this.result.msg,'bgGreen'); 
                      localStorage.setItem("register_id", this.result.info.register_id); 
                      localStorage.setItem("socialEmail", this.result.info.email_id);
                      localStorage.setItem("socialLastName", this.result.info.LastName); 
                      localStorage.setItem("socialFirstName", this.result.info.FirstName);  
                      this.navCtrl.push("SocialformPage"); 
                     }
                  }

                  //Add User But Not Varified
                  else if(this.result.status == 2){
                    loader.dismiss();
                    this.presentToast(this.result.msg,'bgGreen'); 
                    this.navCtrl.push("OtppagePage"); 
                    localStorage.setItem("Userregister_id", this.result.info.register_id);
                    localStorage.setItem("otpMobile", this.result.info.mobile_no);
                  }

                  //First Time
                  else if(this.result.status == 3){
                    loader.dismiss();
                   // this.presentToast(this.result.msg,'bgGreen'); 
                    localStorage.setItem("register_id", this.result.info.register_id); 
                    localStorage.setItem("socialEmail", this.result.info.email_id); 
                    localStorage.setItem("socialLastName", this.result.info.LastName); 
                    localStorage.setItem("socialFirstName", this.result.info.FirstName); 
                    this.navCtrl.push("SocialformPage"); 
            
                   
                  }
                  else {
                    loader.dismiss();
                    this.presentToast(this.result.msg,'bgRed');
                  }
                }, error => {
                //  this.disableButton = false;
                  this.presentToast('No Internet connection !','bgRed'); 
                  console.log(error.json());
                  loader.dismiss();
                });
              }
              else{
                this.presentToast('Please Your Facebook Account Login With Email Id','bgRed');
              }
            });   
        } 
        // An error occurred while loging-in
        else {
            console.log("An error occurred...");
        }

    })
    .catch((e) => {
        console.log('Error logging into Facebook', e);     
    });
}

  /**
  * 
  * @param msg 
  */
 presentToast(msg,bgColor) {
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

