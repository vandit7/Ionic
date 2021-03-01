import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Register1Page } from './register1';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    Register1Page,
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    IonicPageModule.forChild(Register1Page),
  ],
})
export class Register1PageModule {}
