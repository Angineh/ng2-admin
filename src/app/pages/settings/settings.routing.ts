import { Routes, RouterModule }  from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  }
];

export const routing = RouterModule.forChild(routes);