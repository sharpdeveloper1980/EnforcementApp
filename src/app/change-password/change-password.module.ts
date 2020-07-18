import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ChangePasswordPageRoutingModule } from './change-password-routing.module';
import { MustMatchDirective } from '../_helpers/must-match.directive'
import { ChangePasswordPage } from './change-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ChangePasswordPageRoutingModule
  ],
  declarations: [ChangePasswordPage,MustMatchDirective]
})
export class ChangePasswordPageModule {}
