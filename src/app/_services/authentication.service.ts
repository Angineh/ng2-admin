import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
//import { Https } from '@angular/https';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import * as CryptoJS from 'crypto-js';
 
@Injectable()
export class AuthenticationService {
    public token: string;
    

    constructor(private http: Http) {
        // set token if saved in local storage (We get the token from the database so we do not need this anymore)
        // Decrypt 
        /* var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
        var currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); */
        /* var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token; */        
    }

    login(username: string, password: string){
        let header = new Headers({'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header});
       
        return this.http.post('/rest/plugandplay/api/v1/login', JSON.stringify({ email: username, password: password }), options )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    // Encrypt
                    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ id: response.json().id, name: response.json().name, email: response.json().email, password: response.json().password, role: response.json().role, ref_id: response.json().ref_id, token: token }), 'pnp4life!');
                    localStorage.setItem('currentUser', ciphertext);                    
                    //localStorage.setItem('currentUser', JSON.stringify({ id: response.json().id, name: response.json().name, email: response.json().email, password: response.json().password, role: response.json().role, ref_id: response.json().ref_id, token: token }))
                    /* var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
                    var currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                    console.log("Current User: "+JSON.stringify(currentUser)); */
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
    /* loginFake(username: string, password: string): Observable<boolean> {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
    login2(username: string, password: string): Observable<boolean>{
         return new Observable<boolean>( observer => {
             this.httpsReq('POST', '/rest/plugandplay/api/v1/login', JSON.stringify({ email: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ id: response.json().id, name: response.json().name, email: response.json().email, password: response.json().password, role: response.json().role, ref_id: response.json().ref_id, token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
         });
    } */
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    httpsReq(method:string, path:string, body:string):  Observable<Response>{
        const https = require('https');
        var response: Observable<Response>;
        const options = {
        /* hostname: '54.145.172.103',
        port: 8443, */
        hostname: 'localhost',
        path: path,
        method: method
        };

        const req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
            response = d;
        });
        });

        req.on('error', (e) => {
        console.error(e);
        });
        req.end();        
        return response;
    }
}