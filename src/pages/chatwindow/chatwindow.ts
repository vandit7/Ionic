import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController, Content, ModalController, AlertController, App } from 'ionic-angular';
import $ from "jquery";
import { ContactPage } from '../contact/contact';
import { ServiceProvider } from '../../providers/service/service';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Clipboard } from '@ionic-native/clipboard';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { MassageInfoPage } from '../massage-info/massage-info';
import { PopoverController } from 'ionic-angular';
import { ChatsettingComponent } from '../../components/chatsetting/chatsetting';
import { ChatInfoPage } from '../chat-info/chat-info';
@IonicPage()
@Component({
  selector: 'page-chatwindow',
  templateUrl: 'chatwindow.html',
})
export class ChatwindowPage {

  @ViewChild(Content) content: Content;
  @ViewChild('inputToFocus') inputToFocus;
  @ViewChild('SearchToFocus') SearchToFocus;
  messages = [];
  messagesOther = [];
  messagesOther1 = [];
  messagesNew = [];
  nickname = '';
  message = '';
  msg = [];
  Name: any;
  ToUserDetail: any;
  selected = [];
  msgText: any;
  msgAll: any;
  deleteChat = [];
  selectIocn: any;
  showOnlyOne: any;
  madalDismissData: any;
  num: any;
  messageDateString: any;
  result: any;
  resultNew: any;
  firstTime: any;
  online_status: any;
  IsBlock: any;
  arrowshow: any;
  searchTerm: any;
  searchDiv: any;
  copyText: any;
  blockText: any;
  blockMsg: any;
  stopScroll: any;
  FirstNum: any;
  showLoadMore: any;
  countNo: any;
  checkF: any;
  endLimit: any;
  endMyLimit: any;
  callVar: any;
  favouriteMarketsData: any;
  messagesOtherlength: any;
  unticList: any = [];
  updateTic: any;
  indexMsg:any;
  messagesUpdateStatus : any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    platform: Platform,
    public socket: Socket,
    public socketSend: Socket,
    public socketDelete: Socket,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private clipboard: Clipboard,
    public serviceProvider: ServiceProvider,
    public modalCtrl: ModalController,
    public app: App,
    public popoverCtrl: PopoverController) {

    this.selectIocn = false;
    this.showOnlyOne = false;
    //  this.nickname = this.navParams.get('name');
    this.arrowshow = false;
    this.searchDiv = false;
    this.stopScroll = true;
    this.showLoadMore = false;
    this.FirstNum = 1;
    this.checkF = 0;
    // this.socket.connect();
    // this.onlyTime();

    $('.tabbar ').css('display', 'none');
    platform.registerBackButtonAction(() => {
      // this.navCtrl.setRoot(ContactPage);
      this.navCtrl.pop();
      if (localStorage.getItem('pageTo') == '0') {
        $('.tabbar ').css('display', 'flex');
      } else {
        $('.tabbar ').css('display', 'none');
      }

    });
    this.firstTime = 1;
    localStorage.removeItem("AllInfoChat");
    this.copyText = false;
    this.blockText = false;

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatwindowPage');
    this.countNo = 0;
    this.firstTimeCall(this.FirstNum);
    //  console.log(this.FirstNum)
    this.socket.connect();
    this.onlyTime();

  }
  scrolling(event) {
    // your content here for scrolling
    try {
      if (event.directionY == 'down' && event.scrollTop != '0') {
        this.arrowshow = false;
      }
      else {
        this.arrowshow = true;
      }
    }
    catch (e) {

    }
  }
  // setFilteredItems() {
  //   this.socket.connect();
  //   var RegisterId = localStorage.getItem("register_id");
  //   var ToRegisterId = localStorage.getItem("con_id");
  //   var Type = "1";
  //   var ValidData = localStorage.getItem("ValidDataJat");
  //   this.socket.emit('ConversationList', { RegisterId: RegisterId, Type: Type, ValidData: ValidData, ToRegisterId: ToRegisterId, Page: '1', Search: this.searchTerm }, function (response) {
  //     // console.log(response);
  //   });
  //   this.socket.on('ReceiveConversationList', (response) => {
  //     //   console.log(response)
  //     if (response.status == '1') {
  //       this.Name = response.info.user.Name;
  //       this.ToUserDetail = response.info.user.ToUserDetail;
  //       this.online_status = response.info.user.online_status;
  //       this.IsBlock = response.info.user.IsBlock;
  //       localStorage.setItem("InfoName", response.info.user.Name);
  //       localStorage.setItem("InfoToUserDetail", response.info.user.ToUserDetail);
  //       localStorage.setItem("InfoAbout", response.info.user.About);
  //       localStorage.setItem("InfoCity", response.info.user.City);
  //       localStorage.setItem("InfoCountry", response.info.user.Country);
  //       localStorage.setItem("InfoDOB", response.info.user.DOB);
  //       localStorage.setItem("InfoEmailID", response.info.user.EmailID);
  //       localStorage.setItem("InfoMobileNo", response.info.user.MobileNo);
  //       localStorage.setItem("InfoIsBlock", response.info.user.IsBlock);
  //       localStorage.setItem("InfoState", response.info.user.State);
  //       localStorage.setItem("ClearChat", response.info.user.ClearChat);

  //       try {
  //         this.messages = []
  //         this.messages = response.info.Chat;
  //       }
  //       catch (e) { }

  //       if (localStorage.getItem("AllInfoChat") == null || localStorage.getItem("AllInfoChat") == '' || localStorage.getItem("AllInfoChat") == undefined) {
  //         this.messagesOther = [];
  //         this.messagesOther = response.info.Chat;
  //         localStorage.setItem("AllInfoChat", JSON.stringify(this.messagesOther))
  //       }
  //       else {
  //         if (JSON.stringify(this.messages) == JSON.stringify(this.messagesOther)) {
  //           //  console.log('old')
  //           try {
  //             if (this.messagesOther.length === 0) {
  //               this.messagesOther = [];
  //               this.messagesOther = this.messages;
  //             }
  //           } catch (e) { }
  //         }
  //         else {
  //           // console.log('new')
  //           localStorage.removeItem("AllInfoChat")
  //           this.messagesOther = [];
  //           this.messagesOther = response.info.Chat;
  //           localStorage.setItem("AllInfoChat", JSON.stringify(this.messagesOther))
  //           if (this.content.scrollToBottom) {
  //             setTimeout(() => {
  //               this.scrollToBottomAll();
  //             }, 200);
  //           }
  //         }
  //       }

  //     }
  //     if (this.firstTime == 1) {
  //       setTimeout(() => {
  //         this.scrollToBottomAll();
  //       }, 500);
  //       this.firstTime = 0;
  //     }
  //     else {
  //       this.firstTime = 0;
  //     }
  //   });
  // }
  ionViewWillEnter() {
    //this.messagesOther = [];
    // this.socket.connect();
    // this.onlyTime();
    // this.firstTimeCall(this.FirstNum);
    // console.log(this.FirstNum)
    // this.socket.connect();
    // this.onlyTime();
    //this.firstTimeCall('1');
  }

  firstTimeFun() {
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    setTimeout(() => {
      loader.dismiss();
    }, 500);
    this.FirstNum += 1;
    this.onlyTime()
  }
  onlyTime() {
    // console.log("new" + this.FirstNum)
    var RegisterId = localStorage.getItem("register_id");
    var ToRegisterId = localStorage.getItem("con_id");
    var Type = "1";
    var ValidData = localStorage.getItem("ValidDataJat");
    this.socket.emit('ConversationList', { RegisterId: RegisterId, Type: Type, ValidData: ValidData, ToRegisterId: ToRegisterId, Page: this.FirstNum, Search: '' }, function (response) {
      // console.log(response);
    });
  }
  firstTimeCall(nums) {
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();

    this.socket.on('ReceiveConversationList', (response) => {
      // console.log(response)
      loader.dismiss();
      if (response.status == '1') {

        this.Name = response.info.user.Name;
        this.ToUserDetail = response.info.user.ToUserDetail;
        this.online_status = response.info.user.online_status;
        this.IsBlock = response.info.user.IsBlock;
        localStorage.setItem("InfoName", response.info.user.Name);
        localStorage.setItem("InfoToUserDetail", response.info.user.ToUserDetail);
        localStorage.setItem("InfoAbout", response.info.user.About);
        localStorage.setItem("InfoCity", response.info.user.City);
        localStorage.setItem("InfoCountry", response.info.user.Country);
        localStorage.setItem("InfoDOB", response.info.user.DOB);
        localStorage.setItem("InfoEmailID", response.info.user.EmailID);
        localStorage.setItem("InfoMobileNo", response.info.user.MobileNo);
        localStorage.setItem("InfoIsBlock", response.info.user.IsBlock);
        localStorage.setItem("InfoState", response.info.user.State);
        localStorage.setItem("ClearChat", response.info.user.ClearChat);
        // console.log(response.limit.end_limit)

        this.messages = []
        this.messages = response.info.Chat;

        if (response.limit.count_chat > 50) {
          this.showLoadMore = true;
        }
        else {
          this.showLoadMore = false;
        }

        try {
          if (localStorage.getItem("checkF") == response.limit.count_chat) {
            this.callVar = 1;
          }
          else {
            this.checkF = 0;
            this.callVar = 0;
            this.FirstNum = 1;
            this.onlyTime();
            if (this.content.scrollToBottom) {
              this.content.scrollToBottom();
            }
            setTimeout(() => {
              this.scrollToBottomAll();
            }, 50);

          }
          if (this.checkF == 0) {
            if (this.messages != null) {
              localStorage.setItem("checkF", response.limit.count_chat);

              this.favouriteMarketsData = this.messages.filter(x => this.messagesOther.map((item) => { return item.ChatID }).indexOf(x.ChatID) <= -1);
              if (this.favouriteMarketsData.length > 0) {
                this.messagesOther.push.apply(this.messagesOther, this.favouriteMarketsData);
                this.messagesOther.sort((a, b) => {
                  return a.ChatID - b.ChatID
                });
                this.messagesOtherlength = this.messagesOther.length;
                this.messagesOther.forEach(element => {
                  if (element.ChatStatus != "2") {
                    if (this.unticList.length > 0) {
                      let existItem = this.unticList.filter(item => item.ChatID === element.ChatID);
                      if (existItem.length == 0) {
                        this.unticList.push({ ChatID: element.ChatID });
                      }
                    }
                    else {
                      this.unticList.push({ ChatID: element.ChatID });
                    }
                    // this.unticList.push(element.ChatID);
                  }
                });

                if (this.content.scrollToBottom) {
                  this.content.scrollToBottom();
                }
                setTimeout(() => {
                  this.scrollToBottomAll();
                }, 50);
              }
              //console.log(this.messagesOther);
            }
            this.checkF = 1;
          }
          else {
            if (response.limit.count_chat == response.limit.end_limit) {
              this.showLoadMore = false;
            }
          }
          if (this.callVar == 1) {

            if (this.messages != null) {
              // this.messagesOther[48].ChatStatus = "2";
              // this.messagesOther[49].ChatStatus = "2";
              // this.messagesOther[50].ChatStatus = "2";
              // this.messagesOther[51].ChatStatus = "2";
              // this.messagesOther[52].ChatStatus = "2";
              // this.messagesOther[53].ChatStatus = "2";
              // this.messagesOther[54].ChatStatus = "2";
              // this.messagesOther[55].ChatStatus = "2";
              // this.messagesOther[56].ChatStatus = "2";
              // this.messagesOther[57].ChatStatus = "2";
              //this.messagesOther = [];
              this.favouriteMarketsData = this.messages.filter(x => this.messagesOther.map((item) => { return item.ChatID }).indexOf(x.ChatID) <= -1);
              if (this.favouriteMarketsData.length > 0) {
                this.messagesOther.push.apply(this.messagesOther, this.favouriteMarketsData);
                this.messagesOther.sort((a, b) => {
                  return a.ChatID - b.ChatID
                });
                //  this.scrollToBottomAll();
              } else {
                this.messagesOther.forEach(element => {
                  this.unticList.forEach(untic => {
                    if (element.ChatID == untic.ChatID) {
                      this.updateTic = this.getDimensionsByFilter(untic.ChatID);
                      this.messagesOther[this.indexMsg].ChatStatus = this.messagesUpdateStatus[0].ChatStatus; 
                      this.messagesOther[this.indexMsg].IsDelivery = this.messagesUpdateStatus[0].IsDelivery; 
                      this.messagesOther[this.indexMsg].IsRead = this.messagesUpdateStatus[0].IsRead; 
                      // this.updateTic = this.messagesOther
                    }
                  });
                });
              }
            }
            else {
              this.showLoadMore = false;
            }
          }
        }
        catch (e) { }

      }

      if (this.firstTime == 1) {
        this.scrollToBottomAll();
        this.firstTime = 0;
      }
      else {
        this.firstTime = 0;
      }
    });
  }

  getDimensionsByFilter(id) {
    this.indexMsg =  this.messagesOther.findIndex(x => x.ChatID === id);
    this.messagesUpdateStatus =  this.messages.filter(x => x.ChatID === id);
    return this.messagesOther.filter(x => x.ChatID === id);
  }

  sendMessage() {
    this.inputToFocus.setFocus();
    if (this.message == '' || this.message == null) { }
    else {

      let ConversationObj = {
        "RegisterId": localStorage.getItem("register_id"),
        "ToRegisterId": localStorage.getItem("con_id"),
        "ValidData": localStorage.getItem("ValidDataJat"),
        "Type": "1",
        "Message": this.message
      }
      this.serviceProvider.Conversation(ConversationObj).then(data => {
        this.result = data;
        if (this.result.status == 1) {
          // this.socket.disconnect();
          //  this.messagesOther = []; 
          this.FirstNum = 1;
          this.onlyTime();
          // this.checkF = 0;
          setTimeout(() => {
            if (this.content.scrollToBottom) {
              this.content.scrollToBottom();
            }
          }, 200);
          //  this.content.scrollToBottom();
        }
      }, error => {
        console.log(error.json());
      });

    }
    this.message = '';
  }
  /*******************Delete Message *********************/


  msgDelete() {
    this.deleteChat = [];
    for (var i = 0; i < this.selected.length; i++) {
      this.deleteChat.push(this.selected[i].ChatID)
    }

    let ConversationDelObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ToRegisterId": localStorage.getItem("con_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1",
      "ChatID": this.deleteChat
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.ChatDelete(ConversationDelObj).then(data => {
      this.result = data;
      loader.dismiss();
      if (this.result.status == 1) {
        this.selected = [];
        this.selectIocn = false;
        $('.removeClass').removeClass('active');
        // this.afterDeleteMsg(0);
        this.firstTimeCall(this.FirstNum);
      }
    }, error => {
      // this.presentToast('No Internet connection !', 'bgRed');
      loader.dismiss();
      console.log(error.json());

    });
  }
  /*******************Delete Message *********************/

  /*******************Multi check*********************/

  multicheck(user) {
    this.searchDiv = false;
    var index = this.selected.indexOf(user);
    if (index > -1) {
      this.selected.splice(index, 1);
      user.selected = false;
    } else {
      this.selected.push(user);
      user.selected = true;
    }
    if (this.selected.length > 0) {
      this.selectIocn = true;
      //  this.socket.disconnect();
      if (this.selected.length == 1 && this.selected[0].is_deleted == 0 && this.selected[0].position_text == 'right') {
        localStorage.setItem("ChatStatusA", this.selected[0].ChatStatus);
        localStorage.setItem("DateA", this.selected[0].Date);
        localStorage.setItem("IsDeliveryA", this.selected[0].IsDelivery);
        localStorage.setItem("IsReadA", this.selected[0].IsRead);
        localStorage.setItem("messageA", this.selected[0].message);
        this.showOnlyOne = true;
      }
      else {

        this.showOnlyOne = false;
      }
    }
    else {
      this.showOnlyOne = false;
      this.selectIocn = false;
      //  this.afterDeleteMsg(1);
      // this.FirstNum = 10;
      // this.firstTimeCall(this.FirstNum);
      // this.FirstNum = 1;
      this.onlyTime();
    }
  }


  openModal() {
    const profileModal = this.modalCtrl.create(MassageInfoPage, { userId: 8675309 });
    profileModal.onDidDismiss(data => {
      this.selected = [];
      this.selectIocn = false;
      $('.removeClass').removeClass('active');
      // this.afterDeleteMsg(1);
      // this.firstTimeCall(this.FirstNum);
    });
    profileModal.present();
  }

  /*******************Multi check*********************/

  /*******************Message Copy*********************/
  msgCopy() {
    var msgText = ''
    for (var i = 0; i < this.selected.length; i++) {
      msgText += ' ' + this.selected[i].message + ' ';
    }
    this.clipboard.copy(msgText);
    //this.presentToast('Message Copied', 'bgGreen');
    this.copyText = true;
    msgText = '';
    this.selected = []
    this.selectIocn = false;
    $('.removeClass').removeClass('active');
    setTimeout(() => {
      this.copyText = false;
    }, 1000);
    //  this.afterDeleteMsg(1);
    //this.firstTimeCall(this.FirstNum);
    this.onlyTime();
  }

  /*******************Message Copy*********************/


  isDifferentDay(messageIndex: number): boolean {
    if (messageIndex === 0) return true;

    const d1 = new Date(this.messagesOther[messageIndex - 1].DateTime);
    const d2 = new Date(this.messagesOther[messageIndex].DateTime);

    return (
      d1.getFullYear() !== d2.getFullYear() ||
      d1.getMonth() !== d2.getMonth() ||
      d1.getDate() !== d2.getDate()
    );
  }

  getMessageDate(messageIndex: number): string {
    let dateToday = new Date().toDateString();
    let longDateYesterday = new Date();
    longDateYesterday.setDate(new Date().getDate() - 1);
    let dateYesterday = longDateYesterday.toDateString();
    let today = dateToday.slice(0, dateToday.length - 5);
    let yesterday = dateYesterday.slice(0, dateToday.length - 5);

    const wholeDate = new Date(
      this.messagesOther[messageIndex].DateTime
    ).toDateString();

    this.messageDateString = wholeDate.slice(0, wholeDate.length - 5);

    if (
      new Date(this.messagesOther[messageIndex].DateTime).getFullYear() ===
      new Date().getFullYear()
    ) {
      if (this.messageDateString === today) {
        return "Today";
      } else if (this.messageDateString === yesterday) {
        return "Yesterday";
      } else {
        return this.messageDateString;
      }
    } else {
      return wholeDate;
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ChatsettingComponent);
    popover.onDidDismiss(data => {
      try {
        if (data.type == '1') {
          this.openViewContect();
        } else if (data.type == '2') {
          if (localStorage.getItem("InfoIsBlock") == '0') {
            this.presentConfirmBlock();
          }
          else {
            this.presentConfirmUnBlock();
          }
        } else if (data.type == '3') {
          this.presentConfirmChatClear();
        }
        if (data.type == '4') {

          this.searchTerm = '';
          this.searchDiv = true;
          setTimeout(() => {
            try {
              this.SearchToFocus.setFocus();
            }
            catch (e) { }
          }, 1500);

        } else {

        }
      }
      catch (e) {

      }
    });
    popover.present({
      ev: myEvent
    });
  }
  backtoMain() {
    try {
      this.searchDiv = false;
      this.searchTerm = '';
    } catch (e) { }
  }
  openViewContect() {
    const openViewContect = this.modalCtrl.create(ChatInfoPage, { userId: 8675309 });
    openViewContect.onDidDismiss(data => {
    });
    openViewContect.present();
  }

  presentConfirmDelete() {
    let alert = this.alertCtrl.create({
      message: 'Delete Message ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete For Me',
          handler: () => {
            this.msgDelete()
          }
        }
      ]
    });
    alert.present();
  }

  presentConfirmBlock() {
    let alert = this.alertCtrl.create({
      message: 'Block ' + localStorage.getItem("InfoName") + ' ? Blocked contacts will no longer be able to send you messages.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Block',
          handler: () => {
            this.userBlock();
          }
        }
      ]
    });
    alert.present();
  }
  presentConfirmUnBlock() {
    let alert = this.alertCtrl.create({
      message: 'Unblock ' + localStorage.getItem("InfoName") + ' to send you messages.',
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
            this.userBlock();
          }
        }
      ]
    });
    alert.present();
  }
  presentConfirmChatClear() {
    let alert = this.alertCtrl.create({
      message: 'Are you sure you want to clear messages in this chat?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Clear',
          handler: () => {
            this.allChatClear();
          }
        }
      ]
    });
    alert.present();
  }
  allChatClear() {
    let DeleteAllChatObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ToRegisterId": localStorage.getItem("con_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1",
    }
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Please wait...",
    });
    loader.present();
    this.serviceProvider.DeleteAllChat(DeleteAllChatObj).then(data => {
      this.result = data;
      loader.dismiss();
      if (this.result.status == 1) {
        this.messagesOther = [];
        this.selected = [];
        this.selectIocn = false;
        $('.removeClass').removeClass('active');
        this.FirstNum = 1;
        this.onlyTime();
      }
    }, error => {
      loader.dismiss();
      // this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());

    });
  }


  gobackConversation() {
    // this.navCtrl.setRoot(ContactPage);
    this.navCtrl.pop();
    if (localStorage.getItem('pageTo') == '0') {
      $('.tabbar ').css('display', 'flex');
    }
    else {
      $('.tabbar ').css('display', 'none');
    }
  }

  userBlock() {
    let UserBlockUnblockObj = {
      "RegisterId": localStorage.getItem("register_id"),
      "ToRegisterId": localStorage.getItem("con_id"),
      "ValidData": localStorage.getItem("ValidDataJat"),
      "Type": "1",
      "Block": parseInt(localStorage.getItem("InfoIsBlock")) + 1,
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
        this.blockText = true;
        this.blockMsg = this.result.msg;
        // this.presentToast(this.result.msg, 'bgGreen');
        setTimeout(() => {
          // this.getMessages();
          this.blockText = false;
        }, 2500);
        this.selected = [];
        this.selectIocn = false;
        $('.removeClass').removeClass('active');
        //this.afterDeleteMsg(0);
        //  this.firstTimeCall(this.FirstNum);
        this.FirstNum = 1;
        this.onlyTime();
      }
      else {
        this.blockText = false;
      }
    }, error => {
      // this.presentToast('No Internet connection !', 'bgRed');
      console.log(error.json());
      this.blockText = false;
      loader.dismiss();

    });
  }

  onChange() {
    if (this.content.scrollToBottom) {
      this.content.scrollToBottom();
    }
    this.arrowshow = false;
  }
  onChange1() {
    if (this.content.scrollToBottom) {
      this.content.scrollToBottom();
    }
  }
  scrollToBottomAll() {
    try {

      setTimeout(() => {
        if (this.content.scrollToBottom) {
          this.content.scrollToBottom();
        }
      }, 100);
    }
    catch (e) {

    }
  }
  change() {
    // get elements
    var element = document.getElementById('messageInputBox');
    var textarea = element.getElementsByTagName('textarea')[0];

    // set default style for textarea
    textarea.style.minHeight = '0';
    textarea.style.height = '0';

    // limit size to 96 pixels (6 lines of text)
    var scroll_height = textarea.scrollHeight;
    if (scroll_height > 96)
      scroll_height = 96;

    // apply new style
    element.style.height = scroll_height + "px";
    textarea.style.minHeight = scroll_height + "px";
    textarea.style.height = scroll_height + "px";
  }

  ionViewWillLeave() {
    this.socket.disconnect();
    //  this.messagesOther = [];
    localStorage.removeItem("AllInfoChat");
    // this.socketSend.disconnect();
    // this.socketDelete.disconnect();
  }
  doRefresh(refresher) {
    setTimeout(() => {
      // this.getMessages();
      refresher.complete();
    }, 2000);
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
