import {RouterModule, Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RequerimientosComponent} from "./requerimientos/requerimientos.component";
import {NopagefoundComponent} from "../shared/nopagefound/nopagefound.component";

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'Plan', component: DashboardComponent},
      {path: 'Requerimiento', children: [
        {path: '', redirectTo: 'Operaciones', pathMatch: 'full' },
        {path: 'Operaciones', component: RequerimientosComponent }
      ]},
      {path: '', redirectTo: 'Requerimiento', pathMatch: 'full'},
      {path: '**', component: NopagefoundComponent}
    ]
  },
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)
