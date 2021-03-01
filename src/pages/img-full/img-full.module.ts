import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgFullPage } from './img-full';

@NgModule({
  declarations: [
    ImgFullPage,
  ],
  imports: [
    IonicPageModule.forChild(ImgFullPage),
  ],
})
export class ImgFullPageModule {}
