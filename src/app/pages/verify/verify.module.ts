import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Verify } from './verify.component';
import { routing }       from './verify.routing';

import { VerifyService } from './verify.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Verify
  ],
  providers: [
    VerifyService
  ],
})
export default class VerifyModule {}
