import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Movimientos',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Requerimientos',
          url: '/Requerimiento'
        },
        {
          titulo: 'Plan Operativo',
          url: '/Plan'
        }
      ]
    }
  ];

  constructor() { }

}
