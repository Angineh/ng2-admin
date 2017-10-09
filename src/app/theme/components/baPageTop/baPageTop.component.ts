import {Component, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import {GlobalState} from '../../../global.state';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'ba-page-top',
  styles: [require('./baPageTop.scss')],
  template: require('./baPageTop.html'),
  encapsulation: ViewEncapsulation.None
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public currentUser:any;
  role: Observable<any>;

  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
    this.currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
    this.role = this.currentUser.role;
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
