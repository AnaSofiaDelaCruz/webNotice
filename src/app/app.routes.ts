import { RouterModule, Routes } from "@angular/router"; 
import { RegisterComponent } from './layout/public/register/register/register.component';
import { PrincipalComponent } from './layout/public/principal/principal.component';

const app_routes: Routes = [
    { path: 'principal', component: PrincipalComponent},
    { path: 'register', component: RegisterComponent},
    {path: '**', pathMatch: 'full', redirectTo:''}
];

 export const app_routing = RouterModule.forRoot(app_routes);