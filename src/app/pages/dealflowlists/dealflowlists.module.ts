import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { DealflowListsComponent, SearchArrayPipe } from './dealflowlists.component';
import { DealflowListsService } from './dealflowlists.service';
import { routing } from './dealflowlists.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    DealflowListsComponent,
    SearchArrayPipe
  ],
  providers: [
    DealflowListsService
  ],

})
export default class StartupsModule {}