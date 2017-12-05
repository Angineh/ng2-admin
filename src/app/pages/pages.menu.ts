export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
/*       {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      }, */
      { 
        path: 'dashboard',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Dashboard', // menu title
            icon: 'fa fa-plug', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
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
        path: 'corporations',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Corporations', // menu title
            icon: 'fa fa-university', // menu icon
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




/* import * as CryptoJS from 'crypto-js';

var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
var currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
this.role = currentUser.role;

if(this.role == "startup"){
  this.PAGES_MENU = [
    {
      path: 'pages',
      children: [
        {
          path: 'company',  // path for our page
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

      //,
     /* {
        path: 'editors',
        data: {
          menu: {
            title: 'Editors',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'ckeditor',
            data: {
              menu: {
                title: 'CKEditor',
              }
            }
          }
        ]
      },*/
      //{
      //  path: 'components',
      //  data: {
      //    menu: {
      //      title: 'Components',
      //      icon: 'ion-gear-a',
      //      selected: false,
      //      expanded: false,
      //      order: 250,
      //    }
      //  },
      //  children: [
      //    {
      //      path: 'treeview',
      //      data: {
      //        menu: {
      //          title: 'Tree View',
      //        }
      //      }
      //    }
      //  ]
      //},
     /* {
        path: 'charts',
        data: {
          menu: {
            title: 'Charts',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
        children: [
          {
            path: 'chartist-js',
            data: {
              menu: {
                title: 'Chartist.Js',
              }
            }
          }
        ]
      },
      {
        path: 'ui',
        data: {
          menu: {
            title: 'UI Features',
            icon: 'ion-android-laptop',
            selected: false,
            expanded: false,
            order: 300,
          }
        },
        children: [
          {
            path: 'typography',
            data: {
              menu: {
                title: 'Typography',
              }
            }
          },
          {
            path: 'buttons',
            data: {
              menu: {
                title: 'Buttons',
              }
            }
          },
          {
            path: 'icons',
            data: {
              menu: {
                title: 'Icons',
              }
            }
          },
          {
            path: 'modals',
            data: {
              menu: {
                title: 'Modals',
              }
            }
          },
          {
            path: 'grid',
            data: {
              menu: {
                title: 'Grid',
              }
            }
          },
        ]
      },
      {
        path: 'forms',
        data: {
          menu: {
            title: 'Form Elements',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 400,
          }
        },
        children: [
          {
            path: 'inputs',
            data: {
              menu: {
                title: 'Form Inputs',
              }
            }
          },
          {
            path: 'layouts',
            data: {
              menu: {
                title: 'Form Layouts',
              }
            }
          }
        ]
      },
      {
        path: 'tables',
        data: {
          menu: {
            title: 'Tables',
            icon: 'ion-grid',
            selected: false,
            expanded: false,
            order: 500,
          }
        },
        children: [
          {
            path: 'basictables',
            data: {
              menu: {
                title: 'Basic Tables',
              }
            }
          },
          {
            path: 'smarttables',
            data: {
              menu: {
                title: 'Smart Tables',
              }
            }
          }
        ]
      },
      {
        path: 'maps',
        data: {
          menu: {
            title: 'Maps',
            icon: 'ion-ios-location-outline',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: 'googlemaps',
            data: {
              menu: {
                title: 'Google Maps',
              }
            }
          },
          {
            path: 'leafletmaps',
            data: {
              menu: {
                title: 'Leaflet Maps',
              }
            }
          },
          {
            path: 'bubblemaps',
            data: {
              menu: {
                title: 'Bubble Maps',
              }
            }
          },
          {
            path: 'linemaps',
            data: {
              menu: {
                title: 'Line Maps',
              }
            }
          }
        ]
      },*/
     /* {
        path: '',
        data: {
          menu: {
            title: 'Pages',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: ['/login'],
            data: {
              menu: {
                title: 'Login'
              }
            }
          },
          {
            path: ['/register'],
            data: {
              menu: {
                title: 'Register'
              }
            }
          }
        ]
      }*//*,
      {
        path: '',
        data: {
          menu: {
            title: 'Menu Level 1',
            icon: 'ion-ios-more',
            selected: false,
            expanded: false,
            order: 700,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'Menu Level 1.1',
                url: '#'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'Menu Level 1.2',
                url: '#'
              }
            },
            children: [
              {
                path: '',
                data: {
                  menu: {
                    title: 'Menu Level 1.2.1',
                    url: '#'
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'External Link',
            url: 'http://akveo.com',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }*/
