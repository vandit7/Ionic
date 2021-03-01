import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
@Component({
  selector: 'chatsetting',
  templateUrl: 'chatsetting.html'
})
export class ChatsettingComponent {

  data: any;
  ClearChat:any;
  IsBlock:any;
  constructor(public viewCtrl: ViewController) {
    // console.log('Hello ChatsettingComponent Component'); 
    this.ClearChat=localStorage.getItem("ClearChat");
    this.IsBlock= localStorage.getItem("InfoIsBlock");   
  }
  close(type) {

    if (type != null || type != '') {
      this.data = { 'type': type };
    }
    else {
      this.data = { 'type': '' };
    }
    this.viewCtrl.dismiss(this.data);
  }
}
