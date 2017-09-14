import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as CryptoJS from 'crypto-js';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        /* console.log("test");
        var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
        console.log("local storage: "+bytes.toString(CryptoJS.enc.Utf8)); */
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}