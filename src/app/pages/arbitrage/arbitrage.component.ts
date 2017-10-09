import {Input, Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, OnDestroy, ViewContainerRef } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ArbitrageService } from './arbitrage.service';

interface Price {
  USD: number;
}

interface Max {
  price: number,
  exchange: string
}

interface Min {
  price: number,
  exchange: string
}

@Component({
  selector: 'arbitrage',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./arbitrage.scss'),require('../css/ng2-toastr.min.scss')], 
  template: require('./arbitrage.html'),
  providers: [ArbitrageService]
})
export class ArbitrageComponent implements OnInit, OnDestroy {
  @Input() poloniexBTC: Object;
  @Input() cexioBTC: Object;
  @Input() krakenBTC: Object;
  @Input() max: Max = {price:null,exchange:null};
  @Input() min: Min = {price:null,exchange:null};;
  @Input() percentIncrease: number;
  @Input() poloniexETH: Object;
  @Input() cexioETH: Object;
  @Input() krakenETH: Object;
  @Input() maxETH: Max = {price:null,exchange:null};
  @Input() minETH: Min = {price:null,exchange:null};;
  @Input() percentIncreaseETH: number;
  formData: Object;
  top100: Object;
  top20: Object;
  lists: any[];
  top20list: any[];
  public error: boolean;
  public loading: boolean;
  public loading20: boolean;
  submitAttempt = false;
  
constructor(private route: ActivatedRoute, private _arbitrageService: ArbitrageService, public toastr: ToastsManager, vcr: ViewContainerRef) {
      this._arbitrageService = _arbitrageService;    
      this.toastr.setRootViewContainerRef(vcr);  
      this.getPoloniex(); 
      this.getCexio();
      this.getKraken();
      this.getPoloniexETH();
      this.getCexioETH();
      this.getKrakenETH();
}

 ngOnInit() {    
   let sub = Observable.interval(5000)
  .subscribe((val) => { 
     this.getPoloniex();
     this.getCexio();
     this.getKraken();
     this.getPoloniexETH();
     this.getCexioETH();
     this.getKrakenETH();

     var pol:Price = JSON.parse(JSON.stringify(this.poloniexBTC));
     var cex:Price = JSON.parse(JSON.stringify(this.cexioBTC));
     var kra:Price = JSON.parse(JSON.stringify(this.krakenBTC));

     this.max.price = Math.max(pol.USD,cex.USD,kra.USD);
     if(pol.USD == this.max.price){
       this.max.exchange = "Poloniex"
     }else if(cex.USD == this.max.price){
       this.max.exchange = "Cex.io"
     }else if(kra.USD == this.max.price){
       this.max.exchange = "Kraken"
     }

     this.min.price = Math.min(pol.USD,cex.USD,kra.USD);
     if(pol.USD == this.min.price){
      this.min.exchange = "Poloniex"
    }else if(cex.USD == this.min.price){
      this.min.exchange = "Cex.io"
    }else if(kra.USD == this.min.price){
      this.min.exchange = "Kraken"
    }

    this.percentIncrease = ((this.max.price - this.min.price)/this.min.price)*100;

    var polETH:Price = JSON.parse(JSON.stringify(this.poloniexETH));
    var cexETH:Price = JSON.parse(JSON.stringify(this.cexioETH));
    var kraETH:Price = JSON.parse(JSON.stringify(this.krakenETH));

    this.maxETH.price = Math.max(polETH.USD,cexETH.USD,kraETH.USD);
    if(polETH.USD == this.maxETH.price){
      this.maxETH.exchange = "Poloniex"
    }else if(cexETH.USD == this.maxETH.price){
      this.maxETH.exchange = "Cex.io"
    }else if(kraETH.USD == this.maxETH.price){
      this.maxETH.exchange = "Kraken"
    }

    this.minETH.price = Math.min(polETH.USD,cexETH.USD,kraETH.USD);
    if(polETH.USD == this.minETH.price){
     this.minETH.exchange = "Poloniex"
   }else if(cexETH.USD == this.minETH.price){
     this.minETH.exchange = "Cex.io"
   }else if(kraETH.USD == this.minETH.price){
     this.minETH.exchange = "Kraken"
   }

   this.percentIncreaseETH = ((this.maxETH.price - this.minETH.price)/this.minETH.price)*100;
  });
  }

  getPoloniex() {
    this._arbitrageService.getPoloniexBTCPrice().subscribe(data => this.poloniexBTC = data,
      error => {
        
        this.showError("Could not get poloniex api, please try again!", "Error", 4000)}, 
        () =>{
          /* var obj = JSON.parse(JSON.stringify(this.poloniexBTC));
          console.log(obj); */
          //return JSON.parse(JSON.stringify(this.poloniexBTC)).USD;
        }
      );
      

   }

   getCexio() {
    this._arbitrageService.getCexioBTCPrice().subscribe(data => this.cexioBTC = data,
      error => {
        
        this.showError("Could not get cex.io api, please try again!", "Error", 4000)}, 
        () =>{
          //var obj = JSON.parse(JSON.stringify(this.cexioBTC));
         // console.log(obj);
         //return JSON.parse(JSON.stringify(this.cexioBTC)).USD;
        }
      );

   }

   getKraken() {
    this._arbitrageService.getKrakenBTCPrice().subscribe(data => this.krakenBTC = data,
      error => {
        
        this.showError("Could not get kraken api, please try again!", "Error", 4000)}, 
        () =>{
          //var obj = JSON.parse(JSON.stringify(this.cexioBTC));
         // console.log(obj);
         
        }
      );

   }

   getPoloniexETH() {
    this._arbitrageService.getPoloniexETHPrice().subscribe(data => this.poloniexETH = data,
      error => {
        
        this.showError("Could not get poloniex api, please try again!", "Error", 4000)}, 
        () =>{
          /* var obj = JSON.parse(JSON.stringify(this.poloniexBTC));
          console.log(obj); */
          //return JSON.parse(JSON.stringify(this.poloniexBTC)).USD;
        }
      );
      

   }

   getCexioETH() {
    this._arbitrageService.getCexioETHPrice().subscribe(data => this.cexioETH = data,
      error => {
        
        this.showError("Could not get cex.io api, please try again!", "Error", 4000)}, 
        () =>{
          //var obj = JSON.parse(JSON.stringify(this.cexioBTC));
         // console.log(obj);
         //return JSON.parse(JSON.stringify(this.cexioBTC)).USD;
        }
      );

   }

   getKrakenETH() {
    this._arbitrageService.getKrakenETHPrice().subscribe(data => this.krakenETH = data,
      error => {
        
        this.showError("Could not get kraken api, please try again!", "Error", 4000)}, 
        () =>{
          //var obj = JSON.parse(JSON.stringify(this.cexioBTC));
         // console.log(obj);
         
        }
      );

   }

  ngOnDestroy() {
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