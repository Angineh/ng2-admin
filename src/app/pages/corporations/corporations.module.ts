import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2PaginationModule } from 'ng2-pagination'; 

import { CorporationsComponent, SearchPipe, PipeFilter, SearchArrayPipe } from './corporations.component';
import { CorporationsService } from './corporations.service';
import { routing } from './corporations.routing';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ModalComponent } from './custom.modal';
import { FilterModal } from './filter.modal';
import { ConfirmModal } from './confirm.modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2PaginationModule,
    routing,
    BootstrapModalModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ModalComponent,
    FilterModal,
    ConfirmModal
  ],
  declarations: [
    CorporationsComponent,
    SearchPipe,
    PipeFilter,
    SearchArrayPipe,
    ModalComponent,
    FilterModal,
    ConfirmModal
  ],
  bootstrap:[ CorporationsComponent ],
  providers: [
    CorporationsService
  ]

})
export default class CorporationsModule {}