import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { routing } from './settings.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [
    SettingsService
  ],

})
export default class SettingsModule {}