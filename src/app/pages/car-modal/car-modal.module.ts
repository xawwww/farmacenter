import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarModalPageRoutingModule } from './car-modal-routing.module';

import { CarModalPage } from './car-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarModalPageRoutingModule
  ],
  declarations: [CarModalPage]
})
export class CarModalPageModule {}
