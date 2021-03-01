import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Register3Page } from './register3';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Register3Page,
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    IonicPageModule.forChild(Register3Page),
  ],
})
export class Register3PageModule {}
