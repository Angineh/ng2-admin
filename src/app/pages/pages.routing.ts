import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
  {
    path: 'register',
    loadChildren: () => System.import('./register/register.module')
  },
  {
    path: 'verify',
    loadChildren: () => System.import('./verify/verify.module')
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'startups', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      { path: 'startups',  loadChildren: () => System.import('./startups/startups.module') },
      { path: 'newstartup',  loadChildren: () => System.import('./newstartup/newstartup.module') },
      { path: 'company',  loadChildren: () => System.import('./company/company.module') },
      { path: 'editcompany',  loadChildren: () => System.import('./editcompany/editcompany.module') },
      { path: 'portfolio',  loadChildren: () => System.import('./portfolio/portfolio.module') },
      { path: 'top100lists',  loadChildren: () => System.import('./top100lists/top100lists.module') },
      { path: 'top100',  loadChildren: () => System.import('./top100/top100.module') },
      { path: 'top20lists',  loadChildren: () => System.import('./top20lists/top20lists.module') },
      { path: 'top20',  loadChildren: () => System.import('./top20/top20.module') },
      { path: 'dealflowlists',  loadChildren: () => System.import('./dealflowlists/dealflowlists.module') },
      { path: 'dealflow',  loadChildren: () => System.import('./dealflow/dealflow.module') },
      { path: 'batchlists',  loadChildren: () => System.import('./batchlists/batchlists.module') },
      { path: 'batch',  loadChildren: () => System.import('./batch/batch.module') },
      { path: 'settings',  loadChildren: () => System.import('./settings/settings.module') }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

//{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//{ path: 'editors', loadChildren: () => System.import('./editors/editors.module') },
//{ path: 'components', loadChildren: () => System.import('./components/components.module') }
//{ path: 'charts', loadChildren: () => System.import('./charts/charts.module') },
//{ path: 'ui', loadChildren: () => System.import('./ui/ui.module') },
//{ path: 'forms', loadChildren: () => System.import('./forms/forms.module') },
//{ path: 'tables', loadChildren: () => System.import('./tables/tables.module') },
//{ path: 'maps', loadChildren: () => System.import('./maps/maps.module') },