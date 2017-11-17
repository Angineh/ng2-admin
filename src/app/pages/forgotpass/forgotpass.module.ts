import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Forgotpass } from './forgotpass.component';
import { routing }       from './forgotpass.routing';

import { ForgotpassService } from './forgotpass.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Forgotpass
  ],
  providers: [
    ForgotpassService
  ],
})
export default class ForgotpassModule {}
