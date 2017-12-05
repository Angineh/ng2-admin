import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { FileSelectDirective } from 'ng2-file-upload';

import { NewCorporationComponent } from './newcorporation.component';
import { NewCorporationService } from './newcorporation.service';
import { routing } from './newcorporation.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    NewCorporationComponent,
    FileSelectDirective
  ],
  providers: [
    NewCorporationService
  ],

})
export default class NewCorporationModule {}