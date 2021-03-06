import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, OnDestroy, ViewContainerRef } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FileUploader } from 'ng2-file-upload';
import * as CryptoJS from 'crypto-js';
import { BaMenuService } from '../../theme';
import { Router } from '@angular/router';

import { NewCorporationService } from './newcorporation.service';

const URL = '/rest/plugandplay/api/v1/corporations/create';
//const URL = 'http://localhost:8080/plugandplay/api/v1/ventures/create';

@Component({
  selector: 'newcorporation',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./newcorporation.scss'),require('../css/ng2-toastr.min.scss')], 
  template: require('./newcorporation.html'),
  providers: [NewCorporationService]
})
export class NewCorporationComponent implements OnInit, OnDestroy {
  company: Object;
  formData: Object;
  top100: Object;
  top20: Object;
  lists: any[];
  top20list: any[];
  public error: boolean;
  public loading: boolean;
  public loading20: boolean;
  submitAttempt = false;
  public uploader:FileUploader = new FileUploader({url: URL});
  

constructor(private route: ActivatedRoute, private _companyService: NewCorporationService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router, private _menuService: BaMenuService) {
  
  var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
  var currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
  // VERY IMPORTANT these methods will update the menu and routes dependent on the user role
  this._menuService.updateMenuByRoutes(this._menuService.getPageMenu(currentUser));
  this.router.resetConfig(this._menuService.getAuthRoutes(currentUser));    
  this._companyService = _companyService;    
  this.toastr.setRootViewContainerRef(vcr);   
}

 ngOnInit() {
    this.initForm();

  }

  ngOnDestroy() {
  }

  showSuccess() {
        this.toastr.success('New startup has been added!', 'Success!', {toastLife: 2000});
  }
  showError(message: string, title: string) {
        this.toastr.error(message, title,{toastLife: 2000});
  }
 
initSubmit(){
	  this.submitAttempt = true;
}

newCorporation(){
  this.uploader.onBuildItemForm = (fileItem: any, form: any) => { form.append('data', JSON.stringify(this.formData) ); };   
  this.uploader.uploadAll();   
  this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
    //console.log("ImageUpload:uploaded:", item, status);
    //console.log("Response: " +response)
    if(status == 204) {
      this.showError("Couldn't update profile picture, please try again.", "Error")
    } else if (status < 200 || status >= 300){
      this.showError("Couldn't update profile picture, please try again", "Error")
    }
    else {
      this.showSuccess();
      this.initForm();
    }
    };
}

newCorporation2() {
  this._companyService.createVenture(JSON.stringify(this.formData)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.showError("Couldn't not submit new starutp, please try again.", "Error")
      } else if (res.status < 200 || res.status >= 300){
        this.showError("Could not submit new startup, please try again.", "Error")
      }
      // If everything went fine, return the response
      else {
        this.showSuccess();
        this.initForm();
        return res.json();
        
      }
    }).subscribe(data => this.company = data,
      err => console.error('Error: ' + err),
          () => console.log("Completed!")
      );
 }

 initForm(){
  this.formData = {
      companyName : null,
      products : null,
      type : null,
      founded : null,
      revenue : null,
      membership : null,
      ceo : null,
      headquarters : null,
      website : null,
      summary : null,
      topInterests : null,
      incentive : null,
      pressReleases : null,
      pilotsAndInnovation : null,
    } 
  }
}