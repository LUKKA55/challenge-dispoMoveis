import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SavedPage } from './saved.page';

import { SavedPageRoutingModule } from './saved-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SavedPageRoutingModule
  ],
  declarations: [SavedPage]
})
export class SavedPageModule {}
