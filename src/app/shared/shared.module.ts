import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {BreadcrumbsComponent} from "./breadcrumbs/breadcrumbs.component";
import {NopagefoundComponent} from "./nopagefound/nopagefound.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {DataTablesModule} from "angular-datatables";
import {DatatableComponent} from "./datatable/datatable.component";
import {NgxPaginationModule} from "ngx-pagination";
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NopagefoundComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    DatatableComponent,
    ModalComponent
  ],
  exports: [
    SidebarComponent,
    NopagefoundComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    DatatableComponent,
    ModalComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    DataTablesModule,
    NgxPaginationModule
  ]
})

export class SharedModule {}
