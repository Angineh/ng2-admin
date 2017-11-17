import {Injectable} from '@angular/core';
import {Router, Routes} from '@angular/router';

@Injectable()
export class BaMenuService {

  protected _currentMenuItem = {};

  constructor(private _router:Router) {
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

  public updateMenuByRoutes(routes: Routes) {
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
  }
}
