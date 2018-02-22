import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {NopagefoundComponent} from "./shared/nopagefound/nopagefound.component";

const appRoutes: Routes = [
  /*{
    path: '',
    component: PagesComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'req', component: RequerimientosComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },*/
  {path: 'login', component: LoginComponent},
  {path: 'Reg', component: LoginComponent},
  {path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true})
