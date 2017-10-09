import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy, ViewContainerRef } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FileUploader } from 'ng2-file-upload';
import * as CryptoJS from 'crypto-js';
import { FormArray, FormControl, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminService } from './admin.service';

import { DialogService } from "ng2-bootstrap-modal";

import { FilterModal } from './filter.modal';

interface Filter {
  name ? : string;
  value ? : string;
}
@Component({
  selector: 'admin',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./admin.scss'),require('../css/ng2-toastr.min.scss')], 
  template: require('./admin.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminService]
})
export class AdminComponent implements OnInit, OnDestroy {
  @ViewChild('input') input: ElementRef;
  @ViewChild('filterButton') filterButton: ElementRef;
  user: Object;
  userFormData: Object;
  public loading: boolean;
  public error: boolean;
  public loadingUser: boolean;
  submitAttempt = false;
  role: Observable<any>;
  filters: Filter[] = [];
  filterList: any[] = ["Name","Email","Role"];
  filteron: boolean = false;
  filterForm: FormGroup;
  deleteon: boolean = false;
  p: number = 1;
  total: number;
  asyncUsers: Observable<any[]>;
  searchString: String;
  searchAttempt: boolean = false;

  settings = {
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string'
      },
      role: {
        title: 'Role',
        type: 'string'
      }
    }
  };
  
constructor(private route: ActivatedRoute, private _adminService: AdminService, private dialogService:DialogService, public toastr: ToastsManager, vcr: ViewContainerRef, private formBuilder: FormBuilder) {
      this._adminService = _adminService;    
      this.toastr.setRootViewContainerRef(vcr);   
      var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
      var currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
      this.role = currentUser.role;
      this.filters = new Array(0);
}

  ngOnInit() {    
    this.searchString = '';
    this.getPage(1);
    /* let eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup')
    eventObservable.subscribe(); */
    this.initUserForm();
    this.filterForm = this.formBuilder.group({
      'Name': ['', Validators.required],
      'Email': ['', Validators.required],
      'Role': ['', Validators.required]
    });
  }

  ngOnDestroy() {
  }

  filterSearch(){
    for(var i = 0; i < this.filters.length; i ++){      
        if(this.filterForm.controls[this.filters[i].name].value != null){
            this.filters[i].value = this.filterForm.controls[this.filters[i].name].value
        }        
    }
    this.getPage(1);
  }

  removeFilter(name: any){
    for(var i = 0; i < this.filters.length; i ++){
        if(name == this.filters[i].name){
            this.filters.splice(i, 1);                
        } 
    }
    this.filterForm.controls[name].setValue(null);
    if(this.filters.length == 0){
        this.getPage(1);
    }         
}

filterModal() {        
    this.filterList = ["Name","Email","Role"];
    
    if(this.filteron == true){
        this.filteron = false;
        return null;
    }
    if(this.deleteon == true){
        this.deleteon = false;
        this.getPage(this.p)
        //console.log("Getting page!!!")
        return null;
    }

    for(var i = 0; i < this.filters.length; i++){
        for(var j = 0; j < this.filterList.length; j++)
        if(this.filters[i].name == this.filterList[j]){
            this.filterList.splice(j,1);
        }
    }       
      
    let disposable = this.dialogService.addDialog(FilterModal, {
        lists: this.filterList
        })
        .subscribe( isConfirmed =>{
            if(isConfirmed){
             
             for(var i = 0; i < isConfirmed.length; i++){
                if(isConfirmed[i].checked == true){   
                    //this.addFilter(isConfirmed[i].listName);
                    var obj:Filter = {};
                    obj.name = isConfirmed[i].listName;                        
                    if(typeof this.filters == 'undefined'){
                        this.filters = new Array(1);
                        this.filters[0] = obj;
                        this.filteron = true;
                        this.filterButton.nativeElement.click();
                      }else{
                        this.filters.push(obj);
                        this.filteron = true;
                        this.filterButton.nativeElement.click();                            
                    }             
                }
            }
            }

        });            
}

  getPage(page: number) {
    this.loading = true;
    this.error = false;
    if(this.filters.length > 0){
        this.asyncUsers = this._adminService.getUsersPageFilter(page, this.filters)
            .do(res => {
                if(res.status == 204) {
                  this.loading = false;
                  this.error = true;
                  console.log("Search did not return any results.")                  
                } else {
                    this.total = res.count;
                    this.p = page;
                    this.loading = false;
                }                
            }).map(res => res.data);          
       
    }else{
        this.asyncUsers = this._adminService.getUsersPage(page, this.searchString)
        .do(res => {
            if(res.status == 204) {
              this.loading = false;
              this.error = true;
              console.log("Search did not return any results.")                  
            } else {
                this.total = res.count;
                this.p = page;
                this.loading = false;
            }
            
        })
        .map(res => res.data);
    }            
}

luceneSearch(event: any){
    this.searchString = event.target.value;
    if(this.searchString.length > 2){
        this.getPage(1);
    }
    if(this.searchString.length == 0){
        this.getPage(1);
    }
}
 
initSubmit(){
	  this.submitAttempt = true;
}

addUser() {
  this.loadingUser = true;
  //console.log(JSON.stringify(this.userFormData));
  this._adminService.addUser(JSON.stringify(this.userFormData)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.loadingUser = false;
        this.showError("Could not add user, please contact a PnP admin.", "", 4000);
      } else if (res.status == 206){
        this.loadingUser = false;
        this.showWarning("Email address is already registered.", "", 4000);
      } else if (res.status < 200 || res.status >= 300){
        this.loadingUser = false;
        this.showError("Could not add user, please try again.", "", 4000);
      }
      // If everything went fine, return the response
      else {
        this.loadingUser = false;
        this.showSuccess("Successfully added new user!", "Success!", 2000);
        this.initUserForm();
        return res.json();
        
      }
    }).subscribe(data => this.user = data,
      err => console.error('Error: ' + err),
          () => console.log()
    );
 }

 initUserForm(){
    this.userFormData = {
      api_key :"f7d624c2-f89e-40b9-9e4b-ff2db471a998",
      name : null,
      email : null,
      password: "" 
    }
  }
  initSearch(){
    this.searchAttempt = true;
  }

  showSuccess(message: string, title: string, time: number) {
      this.toastr.success(message, title,{toastLife: 2000});
  }
  showError(message: string, title: string, time: number) {
      this.toastr.error(message, title,{toastLife: 2000});
  }
  showWarning(message: string, title: string, time: number) {
      this.toastr.warning(message, title,{toastLife: time});
  }


}