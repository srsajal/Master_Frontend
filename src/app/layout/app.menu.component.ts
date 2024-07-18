import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styles: [`
        .layout-menu {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
    
        .layout-menu .menu-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Light border */
        }
    
        .layout-menu .menu-item a {
          color: #fff;
          text-decoration: none;
          display: block;
          padding: 15px;
          display: flex;
          align-items: center;
        }
    
        .layout-menu .menu-item a:hover {
          background-color: rgba(255, 255, 255, 0.2); /* Hover effect */
        }
    
        .layout-menu .menu-item-active {
          background-color: rgba(255, 255, 255, 0.2); /* Active item */
        }
    
        .layout-menu .menu-item .pi {
          margin-right: 10px;
        }
      `]
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
      this.model = [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                
            ]
        },
        {
            label: 'Master Management Table',
            items: [
                { label: 'DDO', icon:'pi pi-fw pi-table', routerLink:['/masterDDO']},
                { label: 'Detail Head', icon:'pi pi-fw pi-table', routerLink:['/detailHead']},
                { label: 'Sub Detail Head', icon:'pi pi-fw pi-table', routerLink:['/subDetailHead']},
                { label:'Department',icon:'pi pi-fw pi-table', routerLink:['/department']},
                { label:'Major Head',icon:'pi pi-fw pi-table', routerLink:['/majorHead']},
                { label:'Scheme Head',icon:'pi pi-fw pi-table', routerLink:['/schemeHead']},
                { label:'Treasury',icon:'pi pi-fw pi-table', routerLink:['/treasury']}
              
            ]
        },
        
            
            

            
        ];
    }
}
