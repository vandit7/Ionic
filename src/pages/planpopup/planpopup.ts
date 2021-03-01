import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlanpopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planpopup',
  templateUrl: 'planpopup.html',
})
export class PlanpopupPage {
  array:any;
  planame:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
  //  this.array = JSON.parse(this.navParams.get('userId'));
    //console.log(typeof(this.array))
    this.array = localStorage.getItem('plan');
    this.planame = localStorage.getItem('planame');
    
    this.array = JSON.parse(localStorage.getItem("plan"));

   // this.array = JSON.parse((this.array));
    //console.log(typeof(this.array))
    console.log('ionViewDidLoad PlanpopupPage');
  }

  closeModal() {
    this.navCtrl.pop();
}

}
