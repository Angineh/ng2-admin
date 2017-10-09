import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { FileSelectDirective } from 'ng2-file-upload';

import { ArbitrageComponent } from './arbitrage.component';
import { ArbitrageService } from './arbitrage.service';
import { routing } from './arbitrage.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    ArbitrageComponent,
    FileSelectDirective
  ],
  providers: [
    ArbitrageService
  ],

})
export default class ArbitrageModule {}