import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {
    body:Object = {api_key :"f7d624c2-f89e-40b9-9e4b-ff2db471a998"}
    constructor (private _http: Http) {
      
    }

    getUsersPage(page:Number, query:String){ 
        let body : any;
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/users/query/'+page+'?query='+query,options)
            .map(res => {
                // If request fails, throw an Error that will be caught
                if(res.status == 204) {
                    console.log(res.status);
                    return res;
                } 
                // If everything went fine, return the response
                else {
                return res.json();
                }
            });
    }

    getUsersPageFilter(page:Number, filters:any[]){ 
        let body : any;
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let query: string = "";
        for(var i = 0; i < filters.length; i ++){
            let filter: String = filters[i].name;
            
            if(i+1 == filters.length){                
                query += filter.toLowerCase() + "=" + filters[i].value
            }else{
                query += filter.toLowerCase() + "=" + filters[i].value + "&";
            }            
        }
        //console.log("Query: "+query);
        return this._http.get('/rest/plugandplay/api/v1/users/filter/'+page+'?'+query,options)
            .map(res => {
                // If request fails, throw an Error that will be caught
                if(res.status == 204) {
                    console.log(res.status);
                    return res;
                } 
                // If everything went fine, return the response
                else {
                return res.json();
                }
            });
    }

    addUser(body:string) { 
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': 'http://54.145.172.103,*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header });
        return this._http.post('/rest/plugandplay/api/v1/register',body,options);
    }

    getAllUsers(){
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/user/all',options)
            .map(res => res.json());
    }

    

    createVenture(body:String) { 
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': 'http://54.145.172.103,*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header });
        return this._http.post('/rest/plugandplay/api/v1/ventures/create',body,options);
    }
    
    getVenture(id:Number) { 
        let headers = new Headers({ 'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/ventures/'+id,options)
            .map(res => res.json());
    }
    
    getTop100Lists(){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/top100/lists',options)
            .map(res => res.json());
    }

    getTop20Lists(){ 
        let headers = new Headers({ 'Accept': 'application/json','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get('/rest/plugandplay/api/v1/top20/lists',options)
            .map(res => res.json());
    }

    updateVenture(body:String) { 
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': 'http://54.145.172.103,*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header });
        return this._http.post('/rest/plugandplay/api/v1/ventures/update',body,options);
    }
  
    addToTop100(id:Number,listName:String) { 
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': 'http://54.145.172.103,*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header });
        return this._http.post('/rest/plugandplay/api/v1/ventures/addtop100',"{\"id\":"+id+",\"listName\":\""+listName+"\"}",options);
    }

    addToTop20(id:Number,listName:String) { 
        let header = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': 'http://54.145.172.103,*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: header });
        return this._http.post('/rest/plugandplay/api/v1/ventures/addtop20',"{\"id\":"+id+",\"listName\":\""+listName+"\"}",options);
    }

    removeFromTop100(id:Number) { 
        let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers: headers });
        return this._http.delete('/rest/plugandplay/api/v1/top100/delete/'+id,options)
            .map(res => res.json());
    }
}