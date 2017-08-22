import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { DealflowComponent, SearchPipe, PipeFilter, SearchArrayPipe } from './dealflow.component';
import { DealflowService } from './dealflow.service';
import { routing } from './dealflow.routing';
import {BusyModule} from 'angular2-busy';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ModalComponent } from './export.modal';
import { CorpModalComponent } from './corp.modal';
import { DealflowModalComponent } from './dealflow.modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    BusyModule,
    routing,
    BootstrapModalModule
  ],
  entryComponents: [
    ModalComponent,
    CorpModalComponent,
    DealflowModalComponent
  ],
  declarations: [
    DealflowComponent,
    SearchPipe,
    PipeFilter,
    SearchArrayPipe,
    ModalComponent,
    CorpModalComponent,
    DealflowModalComponent
  ],
  providers: [
    DealflowService
  ],

})
export default class StartupsModule {}