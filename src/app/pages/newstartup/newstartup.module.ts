import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { FileSelectDirective } from 'ng2-file-upload';

import { NewStartupComponent } from './newstartup.component';
import { NewStartupService } from './newstartup.service';
import { routing } from './newstartup.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    NewStartupComponent,
    FileSelectDirective
  ],
  providers: [
    NewStartupService
  ],

})
export default class NewStartupModule {}