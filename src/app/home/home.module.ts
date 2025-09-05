import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ModalViewPDFComponent } from '../components/modal-view-pdf/modal-view-pdf.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    ModalViewPDFComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
