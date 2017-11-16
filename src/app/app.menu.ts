import { PAGES_MENU } from './pages/pages.menu';
 export const MENU = [
  ...PAGES_MENU
];
/* 
import * as CryptoJS from 'crypto-js';

var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
var currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
this.role = currentUser.role;
var startuppath = encodeURIComponent("company/"+currentUser.ref_id);
export const PAGE_MENU: any = '';
if(this.role == "startup"){
  this.PAGES_MENU = [
    {
      path: 'pages',
      children: [
        {
          path: startuppath,  // path for our page
          data: { // custom menu declaration
            menu: {
              title: 'Profile', // menu title
              icon: 'fa fa-plug', // menu icon
              pathMatch: 'prefix', // use it if item children not displayed in menu
              selected: false,
              expanded: false,
              order: 0
            }
          }
        }
      ]
    }
  ];
}else{
  this.PAGES_MENU = [
    {
      path: 'pages',
      children: [
        {
          path: 'startups',  // path for our page
          data: { // custom menu declaration
            menu: {
              title: 'Startups', // menu title
              icon: 'fa fa-plug', // menu icon
              pathMatch: 'prefix', // use it if item children not displayed in menu
              selected: false,
              expanded: false,
              order: 0
            }
          }
        },
        {
          path: 'portfolio',  // path for our page
          data: { // custom menu declaration
            menu: {
              title: 'Portfolio', // menu title
              icon: 'fa fa-certificate', // menu icon
              pathMatch: 'prefix', // use it if item children not displayed in menu
              selected: false,
              expanded: false,
              order: 0
            }
          }
        },
        {
          path: 'top100lists',  // path for our page
          data: { // custom menu declaration
            menu: {
              title: 'Top 100', // menu title
              icon: 'fa fa-trophy', // menu icon
              pathMatch: 'prefix', // use it if item children not displayed in menu
              selected: false,
              expanded: false,
              order: 0
            }
          }
        },
        {
          path: 'top20lists',  // path for our page
          data: { // custom menu declaration
            menu: {
              title: 'Top 20', // menu title
              icon: 'fa fa-building', // menu icon
              pathMatch: 'prefix', // use it if item children not displayed in menu
              selected: false,
              expanded: false,
              order: 0
            }
          }
        },
        {
          path: 'dealflowlists',  // path for our page
          data: { // custom menu declaration
            menu: {
              title: 'Dealflow', // menu title
              icon: 'fa fa-exchange', // menu icon
              pathMatch: 'prefix', // use it if item children not displayed in menu
              selected: false,
              expanded: false,
              order: 0
            }
          }
        },
        {
          path: 'batchlists',  // path for our page
          data: { // custom menu declaration
            menu: {
              title: 'Batch', // menu title
              icon: 'fa fa-stack-overflow', // menu icon
              pathMatch: 'prefix', // use it if item children not displayed in menu
              selected: false,
              expanded: false,
              order: 0
            }
          }
        }
      ]
    }
  ];

} */
