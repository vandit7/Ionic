import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MassageInfoPage } from './massage-info';

@NgModule({
  declarations: [
    MassageInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MassageInfoPage),
  ],
})
export class MassageInfoPageModule {}
