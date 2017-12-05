import {Injectable} from '@angular/core';
import {Router, Routes} from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Pages } from '../../../pages/pages.component';

@Injectable()
export class BaMenuService {
  menuItems = new BehaviorSubject<any[]>([]);

  protected _currentMenuItem = {};

  constructor(private _router:Router) { }

  /**
   * Updates the routes in the menu
   *
   * @param {Routes} routes Type compatible with app.menu.ts
   */
  public updateMenuByRoutes(routes: Routes) {
    let convertedRoutes = this.convertRoutesToMenus(_.cloneDeep(routes));
    this.menuItems.next(convertedRoutes);
  }

  public convertRoutesToMenus(routes:Routes):any[] {
    let items = this._convertArrayToItems(routes);
    return this._skipEmpty(items);
  }

  public getCurrentItem():any {
    return this._currentMenuItem;
  }

  public selectMenuItem(menuItems:any[]):any[] {
    let items = [];
    menuItems.forEach((item) => {
      this._selectItem(item);

      if (item.selected) {
        this._currentMenuItem = item;
      }

      if (item.children && item.children.length > 0) {
        item.children = this.selectMenuItem(item.children);
      }
      items.push(item);
    });
    return items;
  }

  protected _skipEmpty(items:any[]):any[] {
    let menu = [];
    items.forEach((item) => {
      let menuItem;
      if (item.skip) {
        if (item.children && item.children.length > 0) {
          menuItem = item.children;
        }
      } else {
        menuItem = item;
      }

      if (menuItem) {
        menu.push(menuItem);
      }
    });

    return [].concat.apply([], menu);
  }

  protected _convertArrayToItems(routes:any[], parent?:any):any[] {
    let items = [];
    routes.forEach((route) => {
      items.push(this._convertObjectToItem(route, parent));
    });
    return items;
  }

  protected _convertObjectToItem(object, parent?:any):any {
    let item:any = {};
    if (object.data && object.data.menu) {
      // this is a menu object
      item = object.data.menu;
      item.route = object;
      delete item.route.data.menu;
    } else {
      item.route = object;
      item.skip = true;
    }

    // we have to collect all paths to correctly build the url then
    if (Array.isArray(item.route.path)) {
      item.route.paths = item.route.path;
      //console.log(item.route.path);
    } else {
      
      if(item.route.path.indexOf("%2F") > 0){
        item.route.path = item.route.path.replace("%2F","/");
      }

      item.route.paths = parent && parent.route && parent.route.paths ? parent.route.paths.slice(0) : ['/'];
      if (!!item.route.path) item.route.paths.push(item.route.path);
      
      //console.log(item.route.paths);
    }

    if (object.children && object.children.length > 0) {
      item.children = this._convertArrayToItems(object.children, item);
    }

    let prepared = this._prepareItem(item);

    // if current item is selected or expanded - then parent is expanded too
    if ((prepared.selected || prepared.expanded) && parent) {
      parent.expanded = true;
    }

    return prepared;
  }

  protected _prepareItem(object:any):any {
    if (!object.skip) {
      object.target = object.target || '';
      object.pathMatch = object.pathMatch  || 'full';
      return this._selectItem(object);
    }

    return object;
  }

  protected _selectItem(object:any):any {
    object.selected = this._router.isActive(this._router.createUrlTree(object.route.paths), object.pathMatch === 'full');
    return object;
  }

  
  public getAuthRoutes(currentUser:any): Routes{
    
        if(currentUser.role == "startup"){
            
              return [
                {
                  path: 'login',
                  loadChildren: () => System.import('../../../pages/login/login.module')
                },
                {
                  path: 'register',
                  loadChildren: () => System.import('../../../pages/register/register.module')
                },
                {
                  path: 'verify',
                  loadChildren: () => System.import('../../../pages/verify/verify.module')
                },
                {
                  path: 'forgotpass',
                  loadChildren: () => System.import('../../../pages/forgotpass/forgotpass.module')
                },
                {
                  path: 'pages',
                  component: Pages,
                  children: [
                    { path: '', redirectTo: 'company/'+currentUser.ref_id, pathMatch: 'full' },
                    { path: 'dashboard', loadChildren: () => System.import('../../../pages/dashboard/dashboard.module') },
                    { path: 'company',  loadChildren: () => System.import('../../../pages/company/company.module') },
                    { path: 'editcompany',  loadChildren: () => System.import('../../../pages/editcompany/editcompany.module') },
                    { path: 'settings',  loadChildren: () => System.import('../../../pages/settings/settings.module') }
                  ]
                }
              ];
               
            }else if(currentUser.role == "user"){
              return [
              {
                path: 'login',
                loadChildren: () => System.import('../../../pages/login/login.module')
              },
              {
                path: 'register',
                loadChildren: () => System.import('../../../pages/register/register.module')
              },
              {
                path: 'verify',
                loadChildren: () => System.import('../../../pages/verify/verify.module')
              },
              {
                path: 'forgotpass',
                loadChildren: () => System.import('../../../pages/forgotpass/forgotpass.module')
              },
              {
                path: 'pages',
                component: Pages,
                children: [
                  { path: '', redirectTo: 'startups', pathMatch: 'full' },
                  { path: 'dashboard', loadChildren: () => System.import('../../../pages/dashboard/dashboard.module') },
                  { path: 'startups',  loadChildren: () => System.import('../../../pages/startups/startups.module') },
                  { path: 'company',  loadChildren: () => System.import('../../../pages/company/company.module') },
                  { path: 'portfolio',  loadChildren: () => System.import('../../../pages/portfolio/portfolio.module') },
                  { path: 'settings',  loadChildren: () => System.import('../../../pages/settings/settings.module') }
                ]
              }
            ];
            }else if(currentUser.role == "global"){
              return [
                {
                  path: 'login',
                  loadChildren: () => System.import('../../../pages/login/login.module')
                },
                {
                  path: 'register',
                  loadChildren: () => System.import('../../../pages/register/register.module')
                },
                {
                  path: 'verify',
                  loadChildren: () => System.import('../../../pages/verify/verify.module')
                },
                {
                  path: 'forgotpass',
                  loadChildren: () => System.import('../../../pages/forgotpass/forgotpass.module')
                },
                {
                  path: 'pages',
                  component: Pages,
                  children: [
                    { path: '', redirectTo: 'mystartups', pathMatch: 'full' },
                    { path: 'dashboard', loadChildren: () => System.import('../../../pages/dashboard/dashboard.module') },
                    { path: 'startups',  loadChildren: () => System.import('../../../pages/startups/startups.module') },
                    { path: 'mystartups',  loadChildren: () => System.import('../../../pages/mystartups/mystartups.module') },
                    { path: 'newstartup',  loadChildren: () => System.import('../../../pages/newstartup/newstartup.module') },
                    { path: 'newcorporation',  loadChildren: () => System.import('../../../pages/newcorporation/newcorporation.module') },
                    { path: 'company',  loadChildren: () => System.import('../../../pages/company/company.module') },
                    { path: 'editcompany',  loadChildren: () => System.import('../../../pages/editcompany/editcompany.module') },
                    { path: 'portfolio',  loadChildren: () => System.import('../../../pages/portfolio/portfolio.module') },
                    { path: 'top100lists',  loadChildren: () => System.import('../../../pages/top100lists/top100lists.module') },
                    { path: 'top100',  loadChildren: () => System.import('../../../pages/top100/top100.module') },
                    { path: 'top20lists',  loadChildren: () => System.import('../../../pages/top20lists/top20lists.module') },
                    { path: 'top20',  loadChildren: () => System.import('../../../pages/top20/top20.module') },
                    { path: 'dealflowlists',  loadChildren: () => System.import('../../../pages/dealflowlists/dealflowlists.module') },
                    { path: 'dealflow',  loadChildren: () => System.import('../../../pages/dealflow/dealflow.module') },
                    { path: 'batchlists',  loadChildren: () => System.import('../../../pages/batchlists/batchlists.module') },
                    { path: 'batch',  loadChildren: () => System.import('../../../pages/batch/batch.module') },
                    { path: 'settings',  loadChildren: () => System.import('../../../pages/settings/settings.module') },
                    { path: 'admin',  loadChildren: () => System.import('../../../pages/admin/admin.module') },
                    //{ path: 'arbitrage',  loadChildren: () => System.import('./arbitrage/arbitrage.module') }
                  ]
                }
              ];
            }else{
            //const routes: Routes 
            return [
              {
                path: 'login',
                loadChildren: () => System.import('../../../pages/login/login.module')
              },
              {
                path: 'register',
                loadChildren: () => System.import('../../../pages/register/register.module')
              },
              {
                path: 'verify',
                loadChildren: () => System.import('../../../pages/verify/verify.module')
              },
              {
                path: 'forgotpass',
                loadChildren: () => System.import('../../../pages/forgotpass/forgotpass.module')
              },
              {
                path: 'pages',
                component: Pages,
                children: [
                  { path: '', redirectTo: 'startups', pathMatch: 'full' },
                  { path: 'dashboard', loadChildren: () => System.import('../../../pages/dashboard/dashboard.module') },
                  { path: 'startups',  loadChildren: () => System.import('../../../pages/startups/startups.module') },
                  { path: 'newstartup',  loadChildren: () => System.import('../../../pages/newstartup/newstartup.module') },
                  { path: 'newcorporation',  loadChildren: () => System.import('../../../pages/newcorporation/newcorporation.module') },
                  { path: 'company',  loadChildren: () => System.import('../../../pages/company/company.module') },
                  { path: 'editcompany',  loadChildren: () => System.import('../../../pages/editcompany/editcompany.module') },
                  { path: 'portfolio',  loadChildren: () => System.import('../../../pages/portfolio/portfolio.module') },
                  { path: 'top100lists',  loadChildren: () => System.import('../../../pages/top100lists/top100lists.module') },
                  { path: 'top100',  loadChildren: () => System.import('../../../pages/top100/top100.module') },
                  { path: 'top20lists',  loadChildren: () => System.import('../../../pages/top20lists/top20lists.module') },
                  { path: 'top20',  loadChildren: () => System.import('../../../pages/top20/top20.module') },
                  { path: 'dealflowlists',  loadChildren: () => System.import('../../../pages/dealflowlists/dealflowlists.module') },
                  { path: 'dealflow',  loadChildren: () => System.import('../../../pages/dealflow/dealflow.module') },
                  { path: 'batchlists',  loadChildren: () => System.import('../../../pages/batchlists/batchlists.module') },
                  { path: 'batch',  loadChildren: () => System.import('../../../pages/batch/batch.module') },
                  { path: 'settings',  loadChildren: () => System.import('../../../pages/settings/settings.module') },
                  { path: 'admin',  loadChildren: () => System.import('../../../pages/admin/admin.module') },
                  //{ path: 'arbitrage',  loadChildren: () => System.import('./arbitrage/arbitrage.module') }
                ]
              }
            ];
            }
      }
    
      public getPageMenu(currentUser:any): Routes{
        if(currentUser.role == "startup"){
            return [
              {
                path: 'pages',
                children: [
                  {
                    path: 'dashboard',
                    data: {
                      menu: {
                        title: 'Dashboard',
                        icon: 'fa fa-tachometer',
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  }
                ]
              }
            ];
          }else if (currentUser.role == "user") {
            return [
              {
                path: 'pages',
                children: [
                  {
                    path: 'dashboard',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Dashboard', // menu title
                        icon: 'fa fa-tachometer', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'startups',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Startups', // menu title
                        icon: 'fa fa-plug', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'portfolio',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Portfolio', // menu title
                        icon: 'fa fa-certificate', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  }
                ]
              }
            ];
          }else if (currentUser.role == "global") {
            return [
              {
                path: 'pages',
                children: [
                  {
                    path: 'dashboard',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Dashboard', // menu title
                        icon: 'fa fa-tachometer', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'mystartups',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'My Startups', // menu title
                        icon: 'fa fa-globe', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'startups',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Startups', // menu title
                        icon: 'fa fa-plug', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'portfolio',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Portfolio', // menu title
                        icon: 'fa fa-certificate', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'top100lists',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Top 100', // menu title
                        icon: 'fa fa-trophy', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'top20lists',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Top 20', // menu title
                        icon: 'fa fa-building', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'dealflowlists',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Dealflow', // menu title
                        icon: 'fa fa-exchange', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'batchlists',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Batch', // menu title
                        icon: 'fa fa-stack-overflow', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  }
                ]
              }
            ];
          }else{
            return [
              {
                path: 'pages',
                children: [
                  {
                    path: 'dashboard',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Dashboard', // menu title
                        icon: 'fa fa-tachometer', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'startups',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Startups', // menu title
                        icon: 'fa fa-plug', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'portfolio',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Portfolio', // menu title
                        icon: 'fa fa-certificate', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'top100lists',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Top 100', // menu title
                        icon: 'fa fa-trophy', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'top20lists',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Top 20', // menu title
                        icon: 'fa fa-building', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'dealflowlists',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Dealflow', // menu title
                        icon: 'fa fa-exchange', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  },
                  {
                    path: 'batchlists',  // path for our page
                    data: { // custom menu declaration
                      menu: {
                        title: 'Batch', // menu title
                        icon: 'fa fa-stack-overflow', // menu icon
                        pathMatch: 'prefix', // use it if item children not displayed in menu
                        selected: false,
                        expanded: false,
                        order: 0
                      }
                    }
                  }
                ]
              }
            ];
          
          }
      }

  /* public updateMenuByRoutes(routes: Routes) {
    let convertedRoutes = this.convertRoutesToMenus(_.cloneDeep(routes));

    this.fixRoutes(convertedRoutes); // own fix for route cp/Pages -> array[cp, pages]

    //this.menuItems.next(convertedRoutes);
    return convertedRoutes;
  }


  private fixRoutes(convertedRoutes: any) {
    convertedRoutes.forEach((routeItem) => {
   
     let newPaths = [];

      routeItem["route"].paths.forEach((path) => {
        //console.log(path);
        if (path.indexOf('/') > 0) {
          let firstPath = path.substring(0, path.indexOf('/'));
          let secondPath = path.substring(path.indexOf('/') + 1);
          newPaths.push(firstPath);
          newPaths.push(secondPath);
        } else {
          newPaths.push(path);
        }
      });

      routeItem.route.paths = newPaths;
    });
  } */
}
