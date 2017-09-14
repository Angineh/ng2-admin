import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
//import { FileSelectDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';

import { EditCompanyComponent } from './editcompany.component';
import { EditCompanyService } from './editcompany.service';
import { routing } from './editcompany.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    FileUploadModule
  ],
  declarations: [
    EditCompanyComponent
  ],
  providers: [
    EditCompanyService
  ],

})
export default class EditCompanyModule {}