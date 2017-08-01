import { Routes, RouterModule }  from '@angular/router';

import { Verify } from './verify.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: ':api_key',
    component: Verify
  }
];

export const routing = RouterModule.forChild(routes);
