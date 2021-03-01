import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialformPage } from './socialform';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SocialformPage,
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    IonicPageModule.forChild(SocialformPage),
  ],
})
export class SocialformPageModule {}
