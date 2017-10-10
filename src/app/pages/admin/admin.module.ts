import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2PaginationModule } from 'ng2-pagination'; 

import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { routing } from './admin.routing';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FilterModal } from './filter.modal';
import { ConfirmModal } from './confirm.modal';
import { EditModal } from './edit.modal';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2PaginationModule,
    BootstrapModalModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ],
  entryComponents: [
    FilterModal,
    ConfirmModal,
    EditModal
  ],
  declarations: [
    AdminComponent,
    FilterModal,
    ConfirmModal,
    EditModal
  ],
  bootstrap:[ AdminComponent ],
  providers: [
    AdminService
  ],

})
export default class AdminModule {}