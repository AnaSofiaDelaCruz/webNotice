import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/public/login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './layout/public/register/register/register.component';
import { PrincipalComponent } from './layout/public/principal/principal.component';
//import { app_routing } from './app.routes';
import { RouterModule } from '@angular/router';
import { BasenewsComponent } from './layout/public/basenews/basenews.component';
import { WriterComponent } from './layout/public/writer/writer.component';
import { Writer2Component } from './layout/public/writer2/writer2.component';
import { StatisticsComponent } from './layout/public/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PrincipalComponent,
    BasenewsComponent,
    WriterComponent,
    Writer2Component,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'home', component: PrincipalComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'register2', component: RegisterComponent},
      { path: 'login', component: LoginComponent},
      { path: 'news', component: BasenewsComponent},
      { path: 'writer', component: WriterComponent},
      { path: 'writerstep2', component: Writer2Component},
      { path: 'statistics', component: StatisticsComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full'},
    ]),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    //app_routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
