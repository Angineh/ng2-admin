import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Resetpass } from './resetpass.component';
import { routing }       from './resetpass.routing';

import { ResetpassService } from './resetpass.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Resetpass
  ],
  providers: [
    ResetpassService
  ],
})
export default class ResetpassModule {}
