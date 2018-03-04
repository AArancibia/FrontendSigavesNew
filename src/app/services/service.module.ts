import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarService, SharedService, RequerimientoService} from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    SidebarService,
    SharedService,
    RequerimientoService
  ]
})
export class ServiceModule { }
