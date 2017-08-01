import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Login } from './login.component';
import { routing }       from './login.routing';

// used to create fake backend
/* import { fakeBackendProvider } from '../../_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http'; */

import { AuthGuard } from '../../_guards/index';
import { AuthenticationService, UserService } from '../../_services/index';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  providers: [
    // providers used to create fake backend
    AuthGuard,
    AuthenticationService,
    //UserService,
    //fakeBackendProvider,
    //MockBackend,
    //BaseRequestOptions
  ],
  declarations: [
    Login
  ]
})
export default class LoginModule {}
