import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, ViewContainerRef} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import { Observable } from 'rxjs/Rx';

import { MyStartupsService } from './mystartups.service';
import { LocalDataSource } from 'ng2-smart-table';
import {Subscription} from 'rxjs';

import { ModalComponent } from './custom.modal';
import { FilterModal } from './filter.modal';
import { ConfirmModal } from './confirm.modal';
import { DialogService } from "ng2-bootstrap-modal";

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { FormArray, FormControl, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { BaMenuService } from '../../theme';
import { Router } from '@angular/router';

interface TopLists {
    listName ? : String; // the "?" makes the property optional, 
    id ? : Number; //  so you can start with an empty object
}
interface Filter {
    name ? : string;
    value ? : string;
}
@Component({
  selector: 'mystartups',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./mystartups.scss'),require('../css/ng2-toastr.min.scss')],
  template: require('./mystartups.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MyStartupsService]
})
export class MyStartupsComponent implements OnInit {
  //@ViewChild('input')
  //input: ElementRef;
  @ViewChild('filterButton') filterButton: ElementRef;
  @Input('data') companies: any[];
  asyncCompanies: Observable<any[]>;
  //asyncCompanies: any[]; //Change from observerable to array
  p: number = 1;
  total: number;
  public loading: boolean;
  public error: boolean;
  busy: Subscription;
  searchString: String
  top20lists: any[] = [];
  dealflowlists: any[] = [];
  top100lists: any[] = [];
  batchlists: any[] = [];
  top20Exclude: TopLists[] = [];
  dealflowExclude: TopLists[] = [];
  top100Exclude: TopLists[] = [];
  batchExclude: TopLists[] = [];
  top100: Object;
  top20: Object;
  dealflow: Object;
  batch: Object;
  filters: Filter[] = [];
  filterList: any[] = ["Tags","Stage","Verticals","Blurb","Location","Company Name","Website","PnP Contact","Contact Name","Phone Number","Total Money Raised",
    "B2B B2C","Employees","City","Competition","Advantage","Background","Founded","Partner Interests","Case Study","Comments","Date Of Investment"];
  filteron: boolean = false;
  searchAttempt: boolean = false;
  filterForm: FormGroup;
  role: Observable<any>;
  deleteon: boolean = false;
  currentUser: any;
  
  constructor(private _startupService: MyStartupsService, private dialogService:DialogService, public toastr: ToastsManager, vcr: ViewContainerRef, 
    private formBuilder: FormBuilder, private router: Router, private _menuService: BaMenuService){
    //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
    this.currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
    // VERY IMPORTANT these methods will update the menu and routes dependent on the user role
    this._menuService.updateMenuByRoutes(this._menuService.getPageMenu(this.currentUser));
    this.router.resetConfig(this._menuService.getAuthRoutes(this.currentUser));
    this.role = this.currentUser.role;
    this.filters = new Array(0);
    this.getTop20Lists();
    this.getDealflowLists();
    this.getTop100Lists();
    this.getBatchLists();
    this.toastr.setRootViewContainerRef(vcr); 
    //console.log(this.currentUser.pnpOffice)
  }

  ngOnInit(){
      this.searchString = '';
      this.getPage(1);
      //let eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup')
      //eventObservable.subscribe();  
      
      this.filterForm = this.formBuilder.group({
        'Tags': ['', Validators.required],
        'Stage': ['', Validators.required],
        'Verticals': ['', Validators.required],
        'Blurb': ['', Validators.required],
        'Location': ['', Validators.required],
        'Company Name': ['', Validators.required],
        'Website': ['', Validators.required],
        'PnP Contact': ['', Validators.required],
        'Contact Name': ['', Validators.required],
        'Phone Number': ['', Validators.required],
        'Total Money Raised': ['', Validators.required],
        'B2B B2C': ['', Validators.required],
        'Employees': ['', Validators.required],
        'City': ['', Validators.required],
        'Competition': ['', Validators.required],
        'Advantage': ['', Validators.required],
        'Background': ['', Validators.required],
        'Founded': ['', Validators.required],
        'Partner Interests': ['', Validators.required],
        'Case Study': ['', Validators.required],
        'Comments': ['', Validators.required],
        'Date Of Investment': ['', Validators.required]
      })      
  }

  deleteStartup(startup:any){
    //console.log("id: "+startup.id);
    //console.log("Name: "+startup.companyName);
    //console.log("role: "+this.role);
    //console.log("index: "+JSON.stringify(this.asyncCompanies.findIndex(obj => obj == startup)));

    let disposable = this.dialogService.addDialog(ConfirmModal, {
        company: startup
        })
        .subscribe( isConfirmed =>{

            if(isConfirmed){
                var deleted;
                this._startupService.deleteStartup(startup.id).map(res => {
                    // If request fails, throw an Error that will be caught
                    if(res.status == 204) {
                      this.showError("Could not delete "+startup.companyName+", please try again.", "", 4000);  
                    } else if (res.status < 200 || res.status >= 300){
                      this.showError("Could not delete "+startup.companyName+", please try again.", "", 4000);  
                      throw new Error('This request has failed ' + res.status);
                    }
                    // If everything went fine, return the response
                    else {
                      this.showSuccess("Successfully deleted startup '" +startup.companyName+"'", "Success!", 2000);
                        //remove element from asyncCompanies
                      
                      this.deleteon = true;
                      this.filterButton.nativeElement.click();                        
                      return res.json();
                      
                    }
                  }).subscribe(data => deleted = data,
                    err => console.error('Error: ' + err),
                        () => console.log('')
                    );
            }
        });
    
  }

  filterSearch(){
    for(var i = 0; i < this.filters.length; i ++){      
        if(this.filterForm.controls[this.filters[i].name].value != null){
            this.filters[i].value = this.filterForm.controls[this.filters[i].name].value
        }        
    }
    this.getPage(1);
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
  initSearch(){
    this.searchAttempt = true;
}
  addTop100(id:Number,listName:String) {
    console.log("Add "+id+ " to Top100 list "+listName);
    this.loading = true;
    this.error = false;
    this._startupService.addToTop100(id,listName).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.loading = false;
        this.error = true;
        this.showWarning("Venture already exists in '"+listName+"'", "", 5000);
      } else if (res.status == 206) {
        this.loading = false;
        this.error = true;
        this.showWarning("The Top 100 list '"+listName+"' already has two hundred entries.", "", 5000);
      } else if (res.status < 200 || res.status >= 300){
        this.loading = false;
        this.showError("Could not add to Top 100, please try again.", "", 4000);
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        this.loading = false;
        this.showSuccess("Successfully added to Top 100 list '" +listName+"'", "Success!", 2000);
        var obj:TopLists = {};
        obj.listName = listName;
        obj.id = id;
        this.top100Exclude.push(obj);
        return res.json();
        
      }
    }).subscribe(data => this.top100 = data,
      err => console.error('Error: ' + err),
          () => console.log("Completed!")
      );
    }

  addTop20(id:Number,listName:String) {
    console.log("Add "+id+ " to Top20 list "+listName);
    this.loading = true;
    //this.error = false;
    this._startupService.addToTop20(id,listName).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.loading = false;
        //this.error = true;
        this.showWarning("Venture already exists in '"+listName+"'", "", 5000);
      } else if (res.status == 206) {
        this.loading = false;
        //this.error = true;
        this.showWarning("The Top 20 list '"+listName+"' already has fifty entries.", "", 5000);
      } else if (res.status < 200 || res.status >= 300){
        this.loading = false;
        this.showError("Could not add to Top 20, please try again.", "", 4000);
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        this.loading = false;
        this.showSuccess("Successfully added to Top 20 list '" +listName+"'", "Success!", 2000);
        var obj:TopLists = {};
        obj.listName = listName;
        obj.id = id;
        this.top20Exclude.push(obj);
        return res.json();
        
      }
    }).subscribe(data => this.top20 = data,
      err => console.error('Error: ' + err),
          () => console.log("Completed!")
      );
    }

  addDealflow(id:Number,listName:String) {
    console.log("Add "+id+ " to Dealflow list "+listName);
    this.loading = true;
    //this.error = false;
    this._startupService.addToDealflow(id,listName).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.loading = false;
        //this.error = true;
        this.showWarning("Venture already exists in '"+listName+"'", "", 5000);
      } else if (res.status == 206) {
        this.loading = false;
        //this.error = true;
        this.showWarning("The Dealflow list '"+listName+"' already has twenty entries.", "", 5000);
      } else if (res.status < 200 || res.status >= 300){
        this.loading = false;
        this.showError("Could not add to Dealflow, please try again.", "", 4000);
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        this.loading = false;
        this.showSuccess("Successfully added to Dealflow list '" +listName+"'", "Success!", 2000);
        var obj:TopLists = {};
        obj.listName = listName;
        obj.id = id;
        this.dealflowExclude.push(obj);
        return res.json();
        
      }
    }).subscribe(data => this.dealflow = data,
      err => console.error('Error: ' + err),
          () => console.log("Completed!")
      );
    }

    addBatch(id:Number,listName:String) {
    //console.log("Add "+id+ " to Top20 list "+listName);
    this.loading = true;
    //this.error = false;
    this._startupService.addToBatch(id,listName).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.loading = false;
        //this.error = true;
        this.showWarning("Venture already exists in '"+listName+"'", "", 5000);
      } else if (res.status == 206) {
        this.loading = false;
        //this.error = true;
        this.showWarning("The Batch list '"+listName+"' already has two hundred entries.", "", 5000);
      } else if (res.status < 200 || res.status >= 300){
        this.loading = false;
        this.showError("Could not add to Batch, please try again.", "", 4000);
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        this.loading = false;
        this.showSuccess("Successfully added to Batch list '" +listName+"'", "Success!", 2000);
        var obj:TopLists = {};
        obj.listName = listName;
        obj.id = id;
        this.batchExclude.push(obj);
        return res.json();
        
      }
    }).subscribe(data => this.batch = data,
      err => console.error('Error: ' + err),
          () => console.log("Completed!")
      );
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
        this.filterList = ["Tags","Stage","Verticals","Blurb","Location","Company Name","Website","PnP Contact", "Contact Name","Phone Number", 
        "Total Money Raised","B2B B2C", "Employees","City","Competition","Advantage","Background","Founded","Partner Interests","Case Study",
        "Comments","Date Of Investment"];
        
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

    top20Modal(company: any) {
            var tmplist : any[] = [];
            for(var i = 0; i < this.top20lists.length; i++){
               tmplist[i] = this.top20lists[i];
            }        

            for(var i = 0; i < tmplist.length; i++){ 
                for(var j = 0; j < company.top20.length; j ++)
                if(tmplist[i].listName == company.top20[j].listName){
                    tmplist.splice(i, 1);
                }            
            }
            console.log("Exclude: "+JSON.stringify(this.top20Exclude));
            for(var i = 0; i < this.top20Exclude.length; i++){
                if(this.top20Exclude[i].id == company.id){
                    for(var j = 0; j < tmplist.length; j++){
                        if(tmplist[j].listName == this.top20Exclude[i].listName){
                             tmplist.splice(j, 1);
                        }
                    }
                }
            }
                        
            let disposable = this.dialogService.addDialog(ModalComponent, {
                lists: tmplist,
                company: company,
                title: "Top 20"
                })
                .subscribe( isConfirmed =>{
                    if(isConfirmed){
                     for(var i = 0; i < isConfirmed.length; i++){
                        if(isConfirmed[i].checked == true){
                            this.addTop20(company.id,isConfirmed[i].listName);                    
                        }
                    }
                    }
                });
    }
    dealflowModal(company: any) {
            var tmplist : any[] = [];
            for(var i = 0; i < this.dealflowlists.length; i++){
               tmplist[i] = this.dealflowlists[i];
            }        

            for(var i = 0; i < tmplist.length; i++){ 
                for(var j = 0; j < company.dealflow.length; j ++)
                if(tmplist[i].listName == company.dealflow[j].listName){
                    tmplist.splice(i, 1);
                }            
            }
            console.log("Exclude: "+JSON.stringify(this.dealflowExclude));
            for(var i = 0; i < this.dealflowExclude.length; i++){
                if(this.dealflowExclude[i].id == company.id){
                    for(var j = 0; j < tmplist.length; j++){
                        if(tmplist[j].listName == this.dealflowExclude[i].listName){
                             tmplist.splice(j, 1);
                        }
                    }
                }
            }
                        
            let disposable = this.dialogService.addDialog(ModalComponent, {
                lists: tmplist,
                company: company,
                title: "Dealflow"
                })
                .subscribe( isConfirmed =>{
                    if(isConfirmed){
                     for(var i = 0; i < isConfirmed.length; i++){
                        if(isConfirmed[i].checked == true){
                            this.addDealflow(company.id,isConfirmed[i].listName);                    
                        }
                    }
                    }
                });
    }
    top100Modal(company: any) {
            var tmplist : any[] = [];
            for(var i = 0; i < this.top100lists.length; i++){
               tmplist[i] = this.top100lists[i];
            }        

            for(var i = 0; i < tmplist.length; i++){ 
                for(var j = 0; j < company.top100.length; j ++)
                if(tmplist[i].listName == company.top100[j].listName){
                    tmplist.splice(i, 1);
                }            
            }
            console.log("Exclude: "+JSON.stringify(this.top100Exclude));
            for(var i = 0; i < this.top100Exclude.length; i++){
                if(this.top100Exclude[i].id == company.id){
                    for(var j = 0; j < tmplist.length; j++){
                        if(tmplist[j].listName == this.top100Exclude[i].listName){
                             tmplist.splice(j, 1);
                        }
                    }
                }
            }
                        
            let disposable = this.dialogService.addDialog(ModalComponent, {
                lists: tmplist,
                company: company,
                title: "Top 100"
                })
                .subscribe( isConfirmed =>{
                    if(isConfirmed){
                     for(var i = 0; i < isConfirmed.length; i++){
                        if(isConfirmed[i].checked == true){
                            this.addTop100(company.id,isConfirmed[i].listName);                    
                        }
                    }
                    }
                });
    }
    batchModal(company: any) {
            var tmplist : any[] = [];
            for(var i = 0; i < this.batchlists.length; i++){
               tmplist[i] = this.batchlists[i];
            }        
            console.log("Company: "+JSON.stringify(company));

            for(var i = 0; i < tmplist.length; i++){ 
                for(var j = 0; j < company.batch.length; j ++)
                if(tmplist[i].listName == company.batch[j].listName){
                    tmplist.splice(i, 1);
                }            
            }
            console.log("Exclude: "+JSON.stringify(this.batchExclude));
            for(var i = 0; i < this.batchExclude.length; i++){
                if(this.batchExclude[i].id == company.id){
                    for(var j = 0; j < tmplist.length; j++){
                        if(tmplist[j].listName == this.batchExclude[i].listName){
                             tmplist.splice(j, 1);
                        }
                    }
                }
            }       
            let disposable = this.dialogService.addDialog(ModalComponent, {
                lists: tmplist,
                company: company,
                title: "Batch"
                })
                .subscribe( isConfirmed =>{
                    if(isConfirmed){
                     for(var i = 0; i < isConfirmed.length; i++){
                        if(isConfirmed[i].checked == true){
                            this.addBatch(company.id,isConfirmed[i].listName);                    
                        }
                    }
                    }
                });
    }
    getPage(page: number) {
        this.loading = true;
        this.error = false;
        if(this.filters.length > 0){
            this.asyncCompanies = this._startupService.getVenturesPageFilter(page, this.filters, this.currentUser.pnpOffice)
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
            /* this._startupService.getVenturesPageFilter(page, this.filters).map(res => {
                // If request fails, throw an Error that will be caught
                if(res.status == 204) {
                    this.loading = false;
                    this.error = true;
                    console.log("Search did not return any results.")                
                } else {
                  this.total = res.json().count;
                  this.p = page;
                  this.loading = false;
                  return res.json().data;
                  
                }
              }).subscribe(data => this.asyncCompanies = data,
                err => console.error('Error: ' + err),
                    () => console.log("")
                ); */              
           
        }else{
            /* this._startupService.getVenturesPage(page, this.searchString).map(res => {
                // If request fails, throw an Error that will be caught
                if(res.status == 204) {
                    this.loading = false;
                    this.error = true;
                    console.log("Search did not return any results.")                
                } else {
                  this.total = res.json().count;
                  this.p = page;
                  this.loading = false;
                  return res.json().data;
                  
                }
              }).subscribe(data => this.asyncCompanies = data,
                err => console.error('Error: ' + err),
                    () => console.log("")
                );  */
            this.asyncCompanies = this._startupService.getVenturesPageFilterOffice(page, this.currentUser.pnpOffice)
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

    getTop20Lists() {
      //this.loading = true;
      //this.error = false;
      this._startupService.getTop20Lists().map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        //this.loading = false;
        //this.error = true;
        console.log("Search did not return any results.") 
      } else if (res.status < 200 || res.status >= 300){
        //this.loading = false;
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        //this.loading = false;
        return res.json();
      }
    }).subscribe(data => this.top20lists = data,
      err => console.error('Error: ' + err),
          () => console.log('Completed!')
      )
  }
  getDealflowLists() {
      //this.loading = true;
      //this.error = false;
      this._startupService.getDealflowLists().map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        //this.loading = false;
        //this.error = true;
        console.log("Search did not return any results.") 
      } else if (res.status < 200 || res.status >= 300){
        //this.loading = false;
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        //this.loading = false;
        return res.json();
      }
    }).subscribe(data => this.dealflowlists = data,
      err => console.error('Error: ' + err),
          () => console.log('Completed!')
      )
  }
  getTop100Lists() {
      //this.loading = true;
      //this.error = false;
      this._startupService.getTop100Lists().map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        //this.loading = false;
        //this.error = true;
        console.log("Search did not return any results.") 
      } else if (res.status < 200 || res.status >= 300){
        //this.loading = false;
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        //this.loading = false;
        return res.json();
      }
    }).subscribe(data => this.top100lists = data,
      err => console.error('Error: ' + err),
          () => console.log('Completed!')
      )
  }
  getBatchLists() {
      //this.loading = true;
      //this.error = false;
      this._startupService.getBatchLists().map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        //this.loading = false;
        //this.error = true;
        console.log("Search did not return any results.") 
      } else if (res.status < 200 || res.status >= 300){
        //this.loading = false;
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        //this.loading = false;
        return res.json();
      }
    }).subscribe(data => this.batchlists = data,
      err => console.error('Error: ' + err),
          () => console.log('Completed!')
      )
  }
}

    

@Pipe({
  name: 'searchPipe',
  pure: false
})
export class SearchPipe implements PipeTransform {
  transform(data: any[], searchTerm: string): any[] {
      searchTerm = searchTerm.toUpperCase();
      return data.filter(item => {
        return item.toUpperCase().indexOf(searchTerm) !== -1 
      });
  }
}

@Pipe({
    name: 'searchFilter'
})

export class PipeFilter implements PipeTransform {
    transform(items: any[], term: any[]): any {
        return items.filter(item => item.companyName.indexOf(term[0]) !== -1);
    }
}   

@Pipe({
	name: "smArraySearch"
})
export class SearchArrayPipe implements PipeTransform {
	transform(list: Array<{}>, search: string): Array<{}> {
		if (!list || !search) {
			return list;
		}

		//return list.filter((item: { companyName: string}) => !!item.companyName.toLowerCase().match(new RegExp(search.toLowerCase()) ));
    return list.filter((item: { companyName: string, blurb: string, verticals: string, website: string, pnpContact: string, contactName: string, email: string, stage: string, b2bb2c: string, location: string, city: string, tags: string}) => 
    (!!item.companyName.toLowerCase().match(new RegExp(search.toLowerCase()))) || 
    (!!item.blurb.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.verticals.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.website.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.pnpContact.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.contactName.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.email.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.stage.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.b2bb2c.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.location.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.city.toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!item.tags.toLowerCase().match(new RegExp(search.toLowerCase())))
    );
    
	}
}