import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageTypeModalPage } from './image-type-modal';

@NgModule({
  declarations: [
    ImageTypeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageTypeModalPage),
  ],
})
export class ImageTypeModalPageModule {}
