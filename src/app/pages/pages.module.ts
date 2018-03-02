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
import {MomentModule} from "angular2-moment";
import {PipeCuadroNecesidadesPipe} from "../pipes/pipe-cuadro-necesidades.pipe";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    RequerimientosComponent,
    PipeCuadroNecesidadesPipe
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    RequerimientosComponent,
    PipeCuadroNecesidadesPipe
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    CommonModule,
    //HttpModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    MomentModule

  ]
})

export class PagesModule {}
