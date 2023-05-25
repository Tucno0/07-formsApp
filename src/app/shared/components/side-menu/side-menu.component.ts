import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }

      li:hover {
        background-color: #0d6efd;
        color: white;
        border-color: #0d6efd;
      }
    `
  ]
})
export class SideMenuComponent {
  public reactiveMenu: MenuItem[] = [
    { title: 'Básicos', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ];

  public authMenu: MenuItem[] = [
    { title: 'Registro', route: './auth' },
  ]
}
