import {Component, ViewEncapsulation} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BaMenuService } from '../../theme';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard {

  constructor(private route: ActivatedRoute, private router: Router, private _menuService: BaMenuService) {
    
    var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
    var currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
    // VERY IMPORTANT these methods will update the menu and routes dependent on the user role
    this._menuService.updateMenuByRoutes(this._menuService.getPageMenu(currentUser));
    this.router.resetConfig(this._menuService.getAuthRoutes(currentUser));
  }

}
