import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform } from 'ionic-angular';
import $ from "jquery";
import { AtomService } from '../service/atom';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html',
})
export class PaymentMethodPage {

  payImg1: any;
  payImg2: any;
  PaymentTypeMethod: any;
  txn = {};
  res1: any;
  f_code: any;
  signature: any;
  mmp_txn: any;
  bank_name: any;
  desc: any;
  date: any;
  mer_txn: any;
  amt: any;
  auth_code: any;
  ipg_txn_id: any;
  clientcode: any;
  discriminator: any;
  bank_txn: any;
  surcharge: any;
  merchant_id: any;
  prod: any;
  CardNumber: any;
  udf1: any;
  udf2: any;
  udf3: any;
  udf4: any;
  udf5: any;
  udf6: any;

  result: any;
  current_plan:any;
  view_contact:any;

  DateFS:any;
  status_orderFS:any;
  order_statusFS:any;
  AmountFS:any;
  transaction_idFS:any;
  plan_nameFS:any;
  bank_nameFS:any;
  periodFS:any;
  imgFS:any;
  today:any;
  mm:any;
  dd:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public serviceProvider: ServiceProvider,
    public atomService: AtomService) {
    $('.tabbar ').css('display', 'none');
    this.payImg1 = 'assets/imgs/unselectpayment.png';
    this.payImg2 = 'assets/imgs/unselectpayment.png';
    localStorage.removeItem("PaymentType");
    platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      localStorage.setItem("pageToPlan",'0') 

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodPage');
  }

  gobackProfile() {
    this.navCtrl.pop();
    localStorage.setItem("pageToPlan",'0') 
  }

  paymentSelect(payNo) {
    if (payNo == '1') {
      this.payImg1 = 'assets/imgs/selectpayment.png';
      this.payImg2 = 'assets/imgs/unselectpayment.png';
      localStorage.setItem("PaymentType", "PAYTM");
    }
    else {
      this.payImg1 = 'assets/imgs/unselectpayment.png';
      this.payImg2 = 'assets/imgs/selectpayment.png';
      localStorage.setItem("PaymentType", "ATOM");
    }
  }
  SelectPaymentType() {
    this.PaymentTypeMethod = localStorage.getItem("PaymentType");
    if (this.PaymentTypeMethod == null || this.PaymentTypeMethod == '' || this.PaymentTypeMethod == undefined) {
      this.presentToast('Please Select Payment Method !', 'bgRed');
    }
    else {
      if (this.PaymentTypeMethod === "PAYTM") {
        this.presentToast('Coming Soon !', 'bgGreen');
      }
      else {
        // console.log(this.PaymentTypeMethod)
        this.PurchasePlanList();
      }
    }
  }

  PurchasePlanList() {
    let priceListObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "PlanID": localStorage.getItem("PlanID"),
      "PaymentType":localStorage.getItem("PaymentType"),
      "Type": "1",
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.PurchasePlan(priceListObj).then(data => {
      this.result = data;
     
      if (this.result.status == 1) {
        this.pay(this.result.info.OrderID,this.result.info.Amount)
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




  public pay(OrderID,Amount) {
    this.today = new Date();
    var dd =  this.today.getDate();
    var mm =  this.today.getMonth() + 1; //January is 0!
    
    var yyyy =  this.today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    } 
    this.today = dd + '/' + mm + '/' + yyyy;

    let amt = Amount;
    let orderNo = OrderID;
    let RegisterId = localStorage.getItem("register_id")

    //Atom Settings
  
    this.atomService.loginId = "110465";
    this.atomService.password = "ba43b0a9";
    this.atomService.prodid = "SHADI";
    this.atomService.reqhashkey = "e7bd65f323d2e2adc4";
    this.atomService.reshashkey = "0556649dbccd77bfb4";
    //this.atomService.mode = "uat"; //Remove this line for production  

    //Atom Mandatory Data
    this.atomService.addData("amt", amt);
    this.atomService.addData("txnid", orderNo);
    this.atomService.addData("custacc", RegisterId);
    this.atomService.addData("date", this.today);
    this.atomService.addData("clientcode", "001");
    

    //Atom Optional Date (Don't add, if do not want to send)
    this.atomService.addData("udf1", "Test Name");
    this.atomService.addData("udf2", "9999999999");
    this.atomService.addData("udf3", "test@gmail.com");
    this.atomService.addData("udf4", "Test Address");
    this.atomService.addData("udf5", "ANything");
  

    this.atomService.process().then((res: any) => {
       this.res1 = JSON.stringify(res);
       //console.log(this.res1)
      if (res.f_code == '' || res.f_code == null) { this.f_code = '';} else { this.f_code = res.f_code;}
      if (res.signature == '' || res.signature == null) { this.signature = '';} else { this.signature = res.signature;}
      if (res.mmp_txn == '' || res.mmp_txn == null) { this.mmp_txn = '';} else { this.mmp_txn = res.mmp_txn;}
      if (res.bank_name == '' || res.bank_name == null) { this.bank_name = '';} else { this.bank_name = res.bank_name;}
      if (res.desc == '' || res.desc == null) { this.desc = '';} else { this.desc = res.desc;}
      if (res.date == '' || res.date == null) { this.date = '';} else { this.date = res.date;}
      if (res.mer_txn == '' || res.mer_txn == null) { this.mer_txn = '';} else { this.mer_txn = res.mer_txn;}
      if (res.amt == '' || res.amt == null) { this.amt = '';} else { this.amt = res.amt;}
      
      if (res.auth_code == '' || res.auth_code == null) { this.auth_code = '';} else { this.auth_code = res.auth_code;}
      if (res.ipg_txn_id == '' || res.ipg_txn_id == null) { this.ipg_txn_id = '';} else { this.ipg_txn_id = res.ipg_txn_id;}
      if (res.clientcode == '' || res.clientcode == null) { this.clientcode = '';} else { this.clientcode = res.clientcode;}
      if (res.discriminator == '' || res.discriminator == null) { this.discriminator = '';} else { this.discriminator = res.discriminator;}
      
      if (res.bank_txn == '' || res.bank_txn == null) { this.bank_txn = '';} else { this.bank_txn = res.bank_txn;}
      if (res.surcharge == '' || res.surcharge == null) { this.surcharge = '';} else { this.surcharge = res.surcharge;}
      if (res.merchant_id == '' || res.merchant_id == null) { this.merchant_id = '';} else { this.merchant_id = res.merchant_id;}
      if (res.prod == '' || res.prod == null) { this.prod = '';} else { this.prod = res.prod;}
      if (res.CardNumber == '' || res.CardNumber == null) { this.CardNumber = '';} else { this.CardNumber = res.CardNumber;}

      if (res.udf1 == '' || res.udf1 == null) { this.udf1 = '';} else { this.udf1 = res.udf1;}
      if (res.udf2 == '' || res.udf2 == null) { this.udf2 = '';} else { this.udf2 = res.udf2;}
      if (res.udf3 == '' || res.udf3 == null) { this.udf3 = '';} else { this.udf3 = res.udf3;}
      if (res.udf4 == '' || res.udf4 == null) { this.udf4 = '';} else { this.udf4 = res.udf4;}
      if (res.udf5 == '' || res.udf5 == null) { this.udf5 = '';} else { this.udf5 = res.udf5;}
      

      let paymentResObj = {
        "FCODE": this.f_code,
        "SIGNATURE": this.signature,
        "MMP_TXN": this.mmp_txn,
        "BANKNAME": this.bank_name,
        "DESC": this.desc,
        "TRAN_DATE": this.date,
        "MER_TXN": this.mer_txn,
        "AMOUNT": this.amt,
        "AUTH_CODE": this.auth_code,
        "IPG_TXN_ID": this.ipg_txn_id,
        "CLIENT_CODE": this.clientcode,
        "DISCRIMINATOR": this.discriminator,
        "BANKTXNID":this.bank_txn,
        "SURCHARGE": this.surcharge,
        "MERCHANT_ID": this.merchant_id,
        "PROD": this.prod,
        "CARD_NUMBER": this.CardNumber,
        "UDF1":this.udf1,
        "UDF2":this.udf2,
        "UDF3":this.udf3,
        "UDF4":this.udf4,
        "UDF5":this.udf5,
        "UDF6":'',
        "ORDERID": OrderID,
        "RegisterId": localStorage.getItem("register_id"),
        "ValidData": localStorage.getItem("ValidDataJat"),
        "Type": "1"
      }
    
      if (res.f_code == 'success_00') {
        console.log('success_00')
       } else if (res.f_code == 'F_05') {
        console.log('failed')
      } else if (res.f_code == 'C_06') {
        console.log('cancel')
      }
      this.serviceProvider.UpdateTransactionStatus(paymentResObj).then(data => {
        this.result = data;
   
        if (this.result.status == 1) {
         // this.presentToast(this.result.msg, 'bgGreen'); 
          this.current_plan = this.result.info.PlanID;
          localStorage.setItem("current_plan", this.current_plan);
          this.view_contact = this.result.info.view_contact;
          localStorage.setItem("view_contact", this.view_contact);

          this.DateFS = this.result.info.Date;
          localStorage.setItem("DateFS", this.DateFS);

          this.status_orderFS = this.result.info.status_order;
          localStorage.setItem("status_orderFS", this.status_orderFS);

          this.order_statusFS = this.result.info.order_status;
          localStorage.setItem("order_statusFS", this.order_statusFS);

          this.AmountFS = this.result.info.Amount;
          localStorage.setItem("AmountFS", this.AmountFS);

          this.transaction_idFS = this.result.info.transaction_id;
          localStorage.setItem("transaction_idFS", this.transaction_idFS);

          this.plan_nameFS = this.result.info.plan_name;
          localStorage.setItem("plan_nameFS", this.plan_nameFS);

          this.bank_nameFS = this.result.info.bank_name;
          localStorage.setItem("bank_nameFS", this.bank_nameFS);
          this.periodFS = this.result.info.period;
          localStorage.setItem("periodFS", this.periodFS);
          this.imgFS = this.result.info.img;
          localStorage.setItem("imgFS", this.imgFS);
        
        this.navCtrl.push('OrderScreenPage');
        }
        else {
         // this.presentToast(this.result.msg, 'bgRed'); 
        }
      }, error => {
        this.presentToast('No Internet connection !', 'bgRed');    
        console.log(error.json());
      
      });
    });
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
