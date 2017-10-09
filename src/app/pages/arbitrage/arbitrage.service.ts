import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http"
import 'rxjs/add/operator/map';

@Injectable()
export class ArbitrageService {
    
    constructor (private _http: Http) {
      
    }

    /* getPoloniexBTCPrice(){
        let headers = new Headers({ 'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('https://poloniex.com/public?command=returnTicker',options)
            .map(res => res.json());
    } */

    getPoloniexBTCPrice(){
        let headers = new Headers({ 'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&e=Poloniex',options)
            .map(res => res.json());
    }

    getCexioBTCPrice(){
        let headers = new Headers({ 'Accept': 'application/json'});
        //let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': 'http://localhost:3000','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization, X-Auth-Token'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&e=Cexio',options)
            .map(res => res.json());
    }

    getKrakenETHPrice(){
        let headers = new Headers({ 'Accept': 'application/json'});
        //let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': 'http://localhost:3000','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization, X-Auth-Token'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&e=Kraken',options)
            .map(res => res.json());
    }

    getPoloniexETHPrice(){
        let headers = new Headers({ 'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&e=Poloniex',options)
            .map(res => res.json());
    }

    getCexioETHPrice(){
        let headers = new Headers({ 'Accept': 'application/json'});
        //let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': 'http://localhost:3000','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization, X-Auth-Token'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&e=Cexio',options)
            .map(res => res.json());
    }

    getKrakenBTCPrice(){
        let headers = new Headers({ 'Accept': 'application/json'});
        //let headers = new Headers({ 'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin': 'http://localhost:3000','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS','Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization, X-Auth-Token'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&e=Kraken',options)
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