import { Component, ViewChild, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { AdminService } from './admin.service';

export interface CustomModal {
  obj: any;
}
@Component({  
    selector: 'confirm',
    styles: [require('../css/checkbox.scss')],
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">Edit User - {{obj.name}}</h4>
                   </div>
                  <form #userForm="ngForm" (ngSubmit)="submit()">
                   <div  class="modal-body" style="padding-top:5px;padding-bottom:5px;">
                     <label for="input01">Name</label>
                     <input style="color: #373a3c;border: 1px solid;border-color: #00abff;line-height: inherit;" type="text" [(ngModel)]="name" [ngModelOptions]="{standalone: true}" class="form-control" id="input01" value="{{obj?.name}}" placeholder="{{obj?.name}}" required>
                     <label for="input02">Email</label>
                     <input style="color: #373a3c;border: 1px solid;border-color: #00abff;line-height: inherit;" type="email" [(ngModel)]="email" [ngModelOptions]="{standalone: true}" class="form-control" id="input02" value="{{obj?.email}}" placeholder="{{obj?.email}}" required>
                     <label for="input03">Role</label>
                     <input style="color: #373a3c;border: 1px solid;border-color: #00abff;line-height: inherit;" type="text" [(ngModel)]="role" [ngModelOptions]="{standalone: true}" class="form-control" id="input03" value="{{obj?.role}}" placeholder="{{obj?.role}}" required>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary"  (click)="cancel()">Cancel</button>
                     <button type="submit" class="btn btn-primary" (click)="initSubmit()">Submit</button>
                   </div>
                   </form>
                 </div>
              </div>`,
    providers: [AdminService]
})
export class EditModal extends DialogComponent<CustomModal, number> implements CustomModal, OnInit {
  obj: any;
  name: string;
  email: string;
  role: string;
  submitAttempt: boolean = false;

  constructor(dialogService: DialogService, private _adminService: AdminService) {
    super(dialogService);  
    this._adminService = _adminService;
  }
  ngOnInit(){
    this.name = this.obj.name;
    this.email = this.obj.email;
    this.role = this.obj.role;
  }
  submit() {
    this.obj.name = this.name;
    this.obj.email = this.email;
    this.obj.role = this.role;
    console.log(this.obj);
    this._adminService.udpateUser(JSON.stringify(this.obj)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.result = 2;
        this.close()
      } else if (res.status < 200 || res.status >= 300){
        this.result = 2;
        this.close()
      }
      // If everything went fine, return the response
      else {
        this.result = 1;
        this.close();
        return res.json();
        
      }
    }).subscribe(data => this.obj = data,
      err => console.error('Error: ' + err),
          () => console.log("")
      );
  }
  initSubmit(){
	  this.submitAttempt = true;
  }
  cancel(){
    this.result = 3;
    this.close();
  }
}