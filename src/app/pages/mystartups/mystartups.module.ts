import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2PaginationModule } from 'ng2-pagination'; 

import { MyStartupsComponent, SearchPipe, PipeFilter, SearchArrayPipe } from './mystartups.component';
import { MyStartupsService } from './mystartups.service';
import { routing } from './mystartups.routing';

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
    MyStartupsComponent,
    SearchPipe,
    PipeFilter,
    SearchArrayPipe,
    ModalComponent,
    FilterModal,
    ConfirmModal
  ],
  bootstrap:[ MyStartupsComponent ],
  providers: [
    MyStartupsService
  ]

})
export default class MyStartupsModule {}