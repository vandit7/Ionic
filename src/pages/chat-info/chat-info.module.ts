import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatInfoPage } from './chat-info';

@NgModule({
  declarations: [
    ChatInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatInfoPage),
  ],
})
export class ChatInfoPageModule {}
