import {NgModule} from "@angular/core";
import {RequerimientosComponent} from "./requerimientos/requerimientos.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PagesComponent} from "./pages.component";
import {SharedModule} from "../shared/shared.module";
import {PAGES_ROUTES} from "./pages.routes";
import {CommonModule} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    RequerimientosComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    RequerimientosComponent
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    CommonModule,
    //HttpModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule

  ]
})

export class PagesModule {}
