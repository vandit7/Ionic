import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, MenuController, Alert, Platform } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Register1Page } from '../register1/register1';



@IonicPage()
@Component({
  selector: 'page-register2',
  templateUrl: 'register2.html',
})
export class Register2Page {
  selectedCity: any;
  cities: { id: number; name: string; avatar: string; }[];
  coin: any;
  result: any;

  countryList1: any[] = [];
  countryList: {}[];
  selectedCountryList: any;
  countryListName: any;
  countryId: any;

  stateList1: any[] = [];
  stateList: {}[];
  selectedStateList: any;
  stateListName: any;
  stateId: any;

  cityList1: any[] = [];
  cityList: {}[];
  selectedCityList: any;
  cityListName: any;
  cityId: any

  marital1: any[] = [];
  marital: {}[];
  selectedMarital: any;
  maritalName: any;

  physical1: any[] = [];
  physical: {}[];
  selectedPhysical: any;
  physicalName: any;

  skin1: any[] = [];
  skin: {}[];
  selectedSkin: any;
  skinName: any;

  body1: any[] = [];
  body: {}[];
  selectedBody: any;
  bodyName: any;

  smoke1: any[] = [];
  smoke: {}[];
  selectedSmoke: any;
  smokeName: any;

  kundli:any[] = [];
  smokeKundli : any;
  selectedKundli : any;

  drink1: any[] = [];
  drink: {}[];
  selectedDrink: any;
  drinkName: any;


  height: {}[];
  selectedHeight: any;
  heightName: any;
  weight: any;
  showBox: any;
  physicalBox: any;
  newArr: any[] = [];
  platform: any;
  constructor(public navCtrl: NavController,
    public serviceProvider: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    platform: Platform,) {
      
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot(Register1Page);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register2Page');

    this.height = [
      { id: '4.0', name: '4ft 0inc' },{ id: '4.1', name: '4ft 1inc' }, { id: '4.2', name: '4ft 2inc' }, { id: '4.3', name: '4ft 3inc' }, { id: '4.4', name: '4ft 4inc' }, { id: '4.5', name: '4ft 5inc' }, { id: '4.6', name: '4ft 6inc' }, { id: '4.7', name: '4ft 7inc' }, { id: '4.8', name: '4ft 8inc' }, { id: '4.9', name: '4ft 9inc' },
      { id: '4.10', name: '4ft 10inc' }, { id: '4.11', name: '4ft 11inc' }, { id: '4.12', name: '4ft 12inc' },{ id:'5.0', name: '5ft 0inc' }, { id:'5.1', name: '5ft 1inc' }, { id: '5.2', name: '5ft 2inc' }, { id: '5.3', name: '5ft 3inc' }, { id: '5.4', name: '5ft 4inc' }, { id: '5.5', name: '5ft 5inc' }, { id: '5.6', name: '5ft 6inc' },
      { id: '5.7', name: '5ft 7inc' }, { id: '5.8', name: '5ft 8inc' }, { id: '5.9', name: '5ft 9inc' }, { id: '5.10', name: '5ft 10inc' }, { id: '5.11', name: '5ft 11inc' }, { id: '5.12', name: '5ft 12inc' },{ id: '6.0', name: '6ft 0inc' },{ id: '6.1', name: '6ft 1inc' }, { id: '6.2', name: '6ft 2inc' }, { id: '6.3', name: '6ft 3inc' },
      { id: '6.4', name: '6ft 4inc' }, { id: '6.5', name: '6ft 5inc' }, { id: '6.6', name: '6ft 6inc' }, { id: '6.7', name: '6ft 7inc' }, { id: '6.8', name: '6ft 8inc' }, { id: '6.9', name: '6ft 9inc' }, { id: '6.10', name: '6ft 10inc' }, { id: '6.11', name: '6ft 11inc' }, { id: '6.12', name: '6ft 12inc' },
      { id: '7.0', name: '7ft 0inc' },{ id: '7.1', name: '7ft 1inc' }, { id: '7.2', name: '7ft 2inc' }, { id: '7.3', name: '7ft 3inc' }, { id: '7.4', name: '7ft 4inc' }, { id: '7.5', name: '7ft 5inc' }, { id: '7.6', name: '7ft 6inc' }, { id: '7.7', name: '7ft 7inc' }, { id: '7.8', name: '7ft 8inc' }, { id: '7.9', name: '7ft 9inc' },
      { id: '7.10', name: '7ft 10inc' }, { id: '7.11', name: '7ft 11inc' }, { id: '7.12', name: '7ft 12inc' },{ id: '8.0', name: '8ft 0inc' }, { id:'8.1', name: '8ft 1inc' }, { id:'8.2', name: '8ft 2inc' }, { id: '8.3', name: '8ft 3inc'}, { id: '8.4', name: '8ft 4inc' }, { id: '8.5', name: '8ft 5inc' }, { id: '8.6', name: '8ft 6inc' },
      { id: '8.7', name: '8ft 7inc' }, { id: '8.8', name: '8ft 8inc' }, { id: '8.9', name: '8ft 9inc' }, { id: '8.10', name: '8ft 10inc' }, { id: '8.11', name: '8ft 11inc' }, { id: '8.12', name: '8ft 12inc' }
    ];

    this.getCountryList();
    this.getAllInfo();
    this.showBox = false;

    if (localStorage.getItem("Jstep2") == '1') {

      if (localStorage.getItem("JCountryListName") != '' || localStorage.getItem("JCountryListName") != null || localStorage.getItem("JCountryListName") != undefined) {
        this.countryId = localStorage.getItem("JCountryList")
        this.getStateList1(this.countryId)
        this.selectedCountryList = localStorage.getItem("JCountryListName");
      }
      if (localStorage.getItem("JStateListName") != '' || localStorage.getItem("JStateListName") != null || localStorage.getItem("JStateListName") != undefined) {
        this.stateId = localStorage.getItem("JStateList")
        this.getCityList1(this.stateId)
        this.selectedStateList = localStorage.getItem("JStateListName");
      }
      if (localStorage.getItem("JCityListName") != '' || localStorage.getItem("JCityListName") != null || localStorage.getItem("JCityListName") != undefined) {
        this.cityId = localStorage.getItem("JCityList")
        this.selectedCityList = localStorage.getItem("JCityListName");
      }
      if (localStorage.getItem("JMarital") != '' || localStorage.getItem("JMarital") != null || localStorage.getItem("JMarital") != undefined) {
        this.selectedMarital = localStorage.getItem("JMarital");
      }
      if (localStorage.getItem("JPhysical") != '' || localStorage.getItem("JPhysical") != null || localStorage.getItem("JPhysical") != undefined) {
        this.selectedPhysical = localStorage.getItem("JPhysical");
        if (localStorage.getItem("JPhysical") == 'OTHER') {
          this.physicalBox = localStorage.getItem("JPhysicalBox");
          this.showBox = true;
        } else {
          this.physicalBox = localStorage.getItem("JPhysicalBox");
          this.showBox = false;
        }
      }
      if (localStorage.getItem("JHeight") != '' || localStorage.getItem("JHeight") != null || localStorage.getItem("JHeight") != undefined) {
        this.selectedHeight = localStorage.getItem("JHeight");
      }
      if (localStorage.getItem("Jweight") != '' || localStorage.getItem("Jweight") != null || localStorage.getItem("Jweight") != undefined) {
        this.weight = localStorage.getItem("Jweight");
      }
      if (localStorage.getItem("JSkin") != '' || localStorage.getItem("JSkin") != null || localStorage.getItem("JSkin") != undefined) {
        this.selectedSkin = localStorage.getItem("JSkin");
      }
      if (localStorage.getItem("JBody") != '' || localStorage.getItem("JBody") != null || localStorage.getItem("JBody") != undefined) {
        this.selectedBody = localStorage.getItem("JBody");
      }
      if (localStorage.getItem("JSmoke") != '' || localStorage.getItem("JSmoke") != null || localStorage.getItem("JSmoke") != undefined) {
        this.selectedSmoke = localStorage.getItem("JSmoke");
      }
      if (localStorage.getItem("JKundali") != '' || localStorage.getItem("JKundali") != null || localStorage.getItem("JKundali") != undefined) {
        this.selectedKundli = localStorage.getItem("JKundali");
      }
      if (localStorage.getItem("JDrink") != '' || localStorage.getItem("JDrink") != null || localStorage.getItem("JDrink") != undefined) {
        this.selectedDrink = localStorage.getItem("JDrink");
      }
  
    }
  }

  getCountryList() {
    let signinObj = {
    }
    // let loader = this.loadingCtrl.create({
    //   spinner: 'bubbles',
    //   content: "Please wait...",
    // });
    // loader.present();
    this.countryList = [];
    this.countryList1 = [];
    //  this.selectedCountryList='';
    this.serviceProvider.getCountryList(signinObj).then(data => {
      this.result = data;

      if (this.result.status == 1) {
       // loader.dismiss();
        for (let i = 0; i < this.result.info.length; i++) {
          this.countryList1.push(this.result.info[i])
        }
        this.countryList = this.countryList1;
      }
      else {
       // loader.dismiss();
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
     // loader.dismiss();
    });
  }

  getStateList1(id){
    let StateList = {
      "CountryID": id
    }
    this.stateList = [];
    this.stateList1 = [];
    //  this.selectedStateList='';
    this.serviceProvider.getStateList(StateList).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        for (let i = 0; i < this.result.info.length; i++) {
          this.stateList1.push(this.result.info[i])
        }
        this.stateList = this.stateList1;
      }
      else {
        this.stateList = [];
        this.stateList1 = [];
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
    });
  }

  onChangeCountryList($event) {
    this.countryListName = $event;
    if (this.countryListName == undefined || this.countryListName == null) { }
    else {
      // console.log(this.countryListName.id)
      localStorage.setItem("Jstep2", '1');
      localStorage.setItem("JCountryListName", this.countryListName.name);
      localStorage.setItem("JCountryList", this.countryListName.id);

      this.countryId = this.countryListName.id;
      this.selectedStateList='';
      this.selectedCityList='';
      this.getStateList(this.countryListName.id)
    }
  }

  getStateList(id) {
    let StateList = {
      "CountryID": id
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.stateList = [];
    this.stateList1 = [];
    //  this.selectedStateList='';
    this.serviceProvider.getStateList(StateList).then(data => {
      this.result = data;

      if (this.result.status == 1) {
        loader.dismiss();
        for (let i = 0; i < this.result.info.length; i++) {
          this.stateList1.push(this.result.info[i])
        }
        this.stateList = this.stateList1;
      }
      else {
        loader.dismiss();
        this.stateList = [];
        this.stateList1 = [];
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
  }

  onChangeStateList($event) {
    this.stateListName = $event;
    if (this.stateListName == undefined || this.stateListName == null) { }
    else {
      // console.log(this.stateListName.id)
      localStorage.setItem("Jstep2", '1');
      localStorage.setItem("JStateListName", this.stateListName.name);
      localStorage.setItem("JStateList", this.stateListName.id);
      this.stateId = this.stateListName.id;
      this.selectedCityList='';
      this.getCityList(this.stateListName.id)
    }
  }


  getCityList(id) {
    let CityList = {
      "StateID": id
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.cityList = [];
    this.cityList1 = [];
    //  this.selectedCityList='';
    this.serviceProvider.getCityList(CityList).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        loader.dismiss();
        for (let i = 0; i < this.result.info.length; i++) {
          this.cityList1.push(this.result.info[i])
        }
        this.cityList = this.cityList1;
      }
      else {
        loader.dismiss();
        this.cityList = [];
        this.cityList1 = [];
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      loader.dismiss();
    });
  }
  getCityList1(id) {
    let CityList = {
      "StateID": id
    }
    this.cityList = [];
    this.cityList1 = [];
    //  this.selectedCityList='';
    this.serviceProvider.getCityList(CityList).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        for (let i = 0; i < this.result.info.length; i++) {
          this.cityList1.push(this.result.info[i])
        }
        this.cityList = this.cityList1;
      }
      else {
        this.cityList = [];
        this.cityList1 = [];
      }
    }, error => {
      this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
    });
  }

  onChangeCityList($event) {
    this.cityListName = $event;
    if (this.cityListName == undefined || this.cityListName == null) { }
    else {
      // console.log(this.cityListName.id) 
      localStorage.setItem("Jstep2", '1');
      localStorage.setItem("JCityListName", this.cityListName.name);
      localStorage.setItem("JCityList", this.cityListName.id);
      this.cityId = this.cityListName.id;
    }
  }


  getAllInfo() {

    let signinObj = {
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.marital = [];
    this.marital1 = [];
    this.skin = [];
    this.skin1 = [];
    this.physical = [];
    this.physical1 = [];
    this.body = [];
    this.body1 = [];
    this.smoke = [];
    this.smoke1 = [];
    this.drink = [];
    this.drink1 = [];
    this.serviceProvider.getAllInfo(signinObj).then(data => {
      this.result = data;

      if (this.result.status == 1) {
        loader.dismiss();

        //MaritalStatus
        for (let i = 0; i < this.result.info.MaritalStatus.length; i++) {
          this.marital1.push(this.result.info.MaritalStatus[i])
        }
        this.marital = this.marital1;

        //SkinType
        for (let i = 0; i < this.result.info.SkinType.length; i++) {
          this.skin1.push(this.result.info.SkinType[i])
        }
        this.skin = this.skin1;

        //PhysicalStatus
        for (let i = 0; i < this.result.info.PhysicalStatus.length; i++) {
          this.physical1.push(this.result.info.PhysicalStatus[i])
        }
        this.physical = this.physical1;

        //Body Type
        for (let i = 0; i < this.result.info.BodyType.length; i++) {
          this.body1.push(this.result.info.BodyType[i])
        }
        this.body = this.body1;

        //Smoke
        for (let i = 0; i < this.result.info.Smoke.length; i++) {
          this.smoke1.push(this.result.info.Smoke[i])
        }
        this.smoke = this.smoke1;
        this.kundli = ["Yes","No"] 

        //Drink
        for (let i = 0; i < this.result.info.Drink.length; i++) {
          this.drink1.push(this.result.info.Drink[i])
        }
        this.drink = this.drink1;

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


  onChangeMarital($event) {
    this.maritalName = $event;
    if (this.maritalName == undefined || this.maritalName == null) { }
    else {
      // console.log(this.maritalName.name)
      localStorage.setItem("Jstep2", '1');
      localStorage.setItem("JMarital", this.maritalName.name);
    }
  }

  onChangeSkin($event) {
    this.skinName = $event;
    if (this.skinName == undefined || this.skinName == null) { }
    else {
      // console.log(this.skinName.name)
      localStorage.setItem("Jstep2", '1');
      localStorage.setItem("JSkin", this.skinName.name);
    }
  }

  onChangePhysical($event) {
    this.physicalName = $event;
    if (this.physicalName == undefined || this.physicalName == null) { }
    else {
      // console.log(this.physicalName.name);
      localStorage.setItem("Jstep2", '1');
      localStorage.setItem("JPhysical", this.physicalName.name);
      if (this.physicalName.name == 'OTHER') {
        this.showBox = true;
      }
      else {
        this.showBox = false;
        this.physicalBox='';
        localStorage.setItem("JPhysicalBox", '');
      }
    }
  }

  onChangeBody($event) {
    this.bodyName = $event;
    if (this.bodyName == undefined || this.bodyName == null) { }
    else {
      // console.log(this.bodyName.name)
      localStorage.setItem("Jstep2", '1');
      localStorage.setItem("JBody", this.bodyName.name);

    }
  }

  onChangeSmoke($event) {
    this.smokeName = $event;
    if (this.smokeName == undefined || this.smokeName == null) { }
    else {
      // console.log(this.smokeName.name)
      localStorage.setItem("Jstep2", '1');
      localStorage.setItem("JSmoke", this.smokeName.name);
    }
  }

  onChangeKundli($event) {
    this.smokeKundli = $event;
    if (this.smokeKundli == undefined || this.smokeKundli == null) { }
    else {
      // console.log(this.smokeName.name)
      localStorage.setItem("Jstep2", '1');
      localStorage.setItem("JKundali", this.smokeKundli);
    }
  }
  onChangeDrink($event) {
    this.drinkName = $event;
    if (this.drinkName == undefined || this.drinkName == null) { }
    else {
      //  console.log(this.drinkName.name)
      localStorage.setItem("Jstep2", '1');
      localStorage.setItem("JDrink", this.drinkName.name);
      
    }
  }
  
  onChangeHeight($event) {
    this.heightName = $event;
    if (this.heightName == undefined || this.heightName == null) { }
    else {
      // console.log(this.heightName.name)
      localStorage.setItem("Jstep2", '1');
      localStorage.setItem("JHeight", this.heightName.id);
    }
  }
  onChangePBox($event) {
    if (this.physicalBox == undefined || this.physicalBox == null) { }
    else {
      localStorage.setItem("Jstep2", '1');
      localStorage.setItem("JPhysicalBox", this.physicalBox);
    }
  }
  onChangeWeight($event) {
    if (this.weight == undefined || this.weight == null) { }
    else {
      localStorage.setItem("Jstep2", '1');
      localStorage.setItem("Jweight", this.weight);
    }
  }

  stepReg2() {
    if (this.selectedCountryList == '' || this.selectedCountryList == null || this.selectedCountryList == undefined) {
      this.presentToast('Please Select Country !', 'bgRed');
    }
    else if (this.selectedStateList == '' || this.selectedStateList == null || this.selectedStateList == undefined) {
      this.presentToast('Please Select State !', 'bgRed');
    }
    else if (this.selectedCityList == '' || this.selectedCityList == null || this.selectedCityList == undefined) {
      this.presentToast('Please Select City !', 'bgRed');
    }
    else if (this.selectedMarital == '' || this.selectedMarital == null || this.selectedMarital == undefined) {
      this.presentToast('Please Select Marital Status !', 'bgRed');
    }
    else if (this.selectedPhysical == '' || this.selectedPhysical == null || this.selectedPhysical == undefined) {
      this.presentToast('Please Select Physical Status !', 'bgRed');
    }
    else if (this.showBox == true && (this.physicalBox == '' || this.physicalBox == null || this.physicalBox == undefined)) {
      this.presentToast('Please Enter Physical Box !', 'bgRed');
    }
    else if (this.selectedHeight == '' || this.selectedHeight == null || this.selectedHeight == undefined) {
      this.presentToast('Please Select Height !', 'bgRed');
    }
    else if (this.weight == '' || this.weight == null || this.weight == undefined || this.weight.trim() == "") {
      this.presentToast('Please Enter Weight !', 'bgRed');
    }
    else if (this.selectedSkin == '' || this.selectedSkin == null || this.selectedSkin == undefined) {
      this.presentToast('Please Select Skin Color !', 'bgRed');
    }
    else if (this.selectedBody == '' || this.selectedBody == null || this.selectedBody == undefined) {
      this.presentToast('Please Select Blood Type !', 'bgRed');
    }
    else if (this.selectedSmoke == '' || this.selectedSmoke == null || this.selectedSmoke == undefined) {
      this.presentToast('Please Select Smoke !', 'bgRed');
    }
    else if (this.selectedKundli == '' || this.selectedKundli == null || this.selectedKundli == undefined) {
      this.presentToast('Please Select Kundali !', 'bgRed');
    }
    else if (this.selectedDrink == '' || this.selectedDrink == null || this.selectedDrink == undefined) {
      this.presentToast('Please Select Drink !', 'bgRed');
    }
    else {

        localStorage.setItem("JCountryListName", this.selectedCountryList);
        localStorage.setItem("JCountryList", this.countryId);
        localStorage.setItem("JStateListName", this.selectedStateList);
        localStorage.setItem("JStateList", this.stateId);
        localStorage.setItem("JCityListName", this.selectedCityList);
        localStorage.setItem("JCityList", this.cityId);

      localStorage.setItem("JMarital", this.selectedMarital);
      localStorage.setItem("JPhysical", this.selectedPhysical);
      if (this.showBox == true) {
        localStorage.setItem("JPhysicalBox", this.physicalBox);
      } else {
        localStorage.setItem("JPhysicalBox", '');
      }
      localStorage.setItem("JHeight", this.selectedHeight);
      localStorage.setItem("Jweight", this.weight);
      localStorage.setItem("JSkin", this.selectedSkin);
      localStorage.setItem("JBody", this.selectedBody);
      localStorage.setItem("JSmoke", this.selectedSmoke);
      localStorage.setItem("JKundali", this.selectedKundli);
      localStorage.setItem("JDrink", this.selectedDrink);

      localStorage.setItem("Jstep2", '1');

      this.navCtrl.push('Register3Page');
    }
  }

  gotoRegister1Page() {
    this.navCtrl.push('Register1Page');
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
