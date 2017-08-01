import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, OnDestroy, ViewContainerRef } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {Pipe, PipeTransform} from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { SettingsService } from './settings.service';

const URL = '/rest/plugandplay/api/v1/ventures/logo';

@Component({
  selector: 'settings',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./settings.scss'), require('../css/ng2-toastr.min.scss')], 
  template: require('./settings.html'),
  providers: [SettingsService]
})
export class SettingsComponent implements OnInit {

  user: Object;
  formData: Object;
  public error: boolean;
  public loading: boolean;
  submitAttempt = false;
  public currentUser:any;
  public form:FormGroup;
  public name:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  public submitted:boolean = false;

  

constructor(fb:FormBuilder, private route: ActivatedRoute, private _userService: SettingsService, public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.form = fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
        'passwords': fb.group({
          'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
          'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
      });

      this.name = this.form.controls['name'];
      this.email = this.form.controls['email'];
      this.passwords = <FormGroup> this.form.controls['passwords'];
      this.password = this.passwords.controls['password'];
      this.repeatPassword = this.passwords.controls['repeatPassword'];
      this._userService = _userService;    
      this.toastr.setRootViewContainerRef(vcr);   
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      

}

 ngOnInit() {
    //this.initForm();
    this.form.setValue({
        name: this.currentUser.name,
        email: this.currentUser.email,
        passwords: {
          password: this.currentUser.password,
          repeatPassword: this.currentUser.password
        }        
      })
  }



  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      // your code goes here
      //console.log(values);
      class User {
        public id: number;
        public name: string;
        public email: string;
        public password: string;
      }
      /* console.log(this.name.value);
      console.log(this.email.value);
      console.log(this.password.value); */
      console.log(this.currentUser.id);
      var json = new User();
      json.id = this.currentUser.id;
      json.name = this.name.value;
      json.email = this.email.value;
      json.password = this.password.value;  
      console.log(JSON.stringify(json));
      var body: any;
      this._userService.updateSettings(JSON.stringify(json)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.showError("We could not update your settings.  Please try again.", "", 4000);
      } else if(res.status == 206){
        this.showWarning("We could not detect any changes, please try again.", "", 4000);
      } else if (res.status < 200 || res.status >= 300){
        this.showError("We could not update your settings.  Please try again.", "", 4000);
      }
      // If everything went fine, return the response
      else {
        this.showSuccess("Settings successfully updated!", "Success!", 4000);
        return res.json();        
      }
    }).subscribe(data => body = data,
      err => { console.error('Error: ' + err);
              this.loading = false;},
          () => {//console.log("Completed!");
          this.loading = false;
          //console.log("current "+JSON.stringify(this.currentUser));
          body.token = this.currentUser.token
          //console.log("body "+JSON.stringify(body));
          localStorage.setItem('currentUser', JSON.stringify(body));
          }
      );
      
    }
  }

  showSuccess(message: string, title: string, time: number) {
      this.toastr.success(message, title,{toastLife: time});
  }
  showError(message: string, title: string, time: number) {
        this.toastr.error(message, title,{toastLife: time});
  }
  showWarning(message: string, title: string, time: number) {
        this.toastr.warning(message, title,{toastLife: time});
  }

  initSubmit(){
	  this.submitAttempt = true;
  }
  
/*   updateSettings(){
    // console.log("Update test: "+JSON.stringify(form));
    //console.log("Update test: "+JSON.stringify(this.formData));
    for (var key in this.formData) {
      if (this.formData.hasOwnProperty(key)) {
         //console.log(key + ': ' + this.formData[key])
        if(this.formData[key] != null){
          //console.log(key + " -> " + this.formData[key]);
          this.currentUser[key] = this.formData[key];
        }
      }
    }
    this._userService.updateSettings(JSON.stringify(this.user)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.showError("Couldn't find venture in database to udpate.", "Error")
      } else if (res.status < 200 || res.status >= 300){
        this.showError("Could not update company, please try again.", "Error")
      }
      // If everything went fine, return the response
      else {
        this.showSuccess('Profile has been updated!','Success!');
        return res.json();
        
      }
    }).subscribe(data => this.user = data,
      err => console.error('Error: ' + err),
          () => console.log("Completed!")
      );

  }
  initForm(){
    this.formData = {
      name : null,
      password : null,
    }
  } */

}