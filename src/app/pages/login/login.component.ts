import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router, Routes, RouterModule } from '@angular/router';
import * as CryptoJS from 'crypto-js';
 
import { AuthenticationService } from '../../_services/index';
import { BaMenuService } from '../../theme';
import { Pages } from '../pages.component';
//import { PAGES_MENU } from '../pages.menu.auth';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login implements OnInit  { 
  
  //public routes: Routes = [];
  model: any = {};
  loading = false;
  error = '';
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  
  constructor(fb:FormBuilder, private router: Router, private authenticationService: AuthenticationService, private _menuService: BaMenuService) {

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }
  ngOnInit() {
        // reset login status
        this.authenticationService.logout();

    }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      /*console.log(values);
      console.log(this.email.value);
      console.log (this.password.value);*/
      this.loading = true;
       //this.authenticationService.login(this.model.username, this.model.password)
/*         this.authenticationService.login2(this.email.value, this.password.value).subscribe(result => {
               console.log(result);
                if (result === true) {
                    // login successful
                    this.router.navigate(['pages/startups']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });  */
           this.authenticationService.login(this.email.value, this.password.value)
            .subscribe(result => {
               //console.log(result);
                if (result === true) {
                    // login successful
                    //console.log("login successful");
                    var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
                    var currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
                    // VERY IMPORTANT these methods will update the menu and routes dependent on the user role
                    this._menuService.updateMenuByRoutes(this._menuService.getPageMenu(currentUser));
                    this.router.resetConfig(this._menuService.getAuthRoutes(currentUser));

                    this.router.navigate(['pages/']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });    
      
    }
  }
}
