import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { HttpClientModule } from '@angular/common/http';
import { MasopcionesComponent } from './layout/public/masopciones/masopciones.component';
import { MisNotasComponent } from './layout/public/misnotas/misnotas.component';
import { CrearnotaComponent } from './layout/public/crearnota/crearnota.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriasComponent } from './layout/public/categorias/categorias.component';
import { SubcategoriasComponent } from './layout/public/subcategorias/subcategorias.component';
import { ObjToArray } from './objToArray.pipe';
import { ImagesnotaComponent } from './layout/public/imagesnota/imagesnota.component';

@NgModule({
  declarations: [
    ObjToArray,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PrincipalComponent,
    BasenewsComponent,
    WriterComponent,
    Writer2Component,
    StatisticsComponent,
    MasopcionesComponent,
    MisNotasComponent,
    CrearnotaComponent,
    CategoriasComponent,
    SubcategoriasComponent,
    ImagesnotaComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    EditorModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: PrincipalComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'register2', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'news', component: BasenewsComponent },
      { path: 'writer', component: WriterComponent },
      { path: 'writerstep2', component: Writer2Component },
      { path: 'statistics', component: StatisticsComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'masopciones', component: MasopcionesComponent },
      { path: 'misnotas', component: MisNotasComponent },
      { path: 'crearnota', component: CrearnotaComponent },
      { path: 'categoria', component: CategoriasComponent },
      { path: 'subcategoria', component: SubcategoriasComponent },
      { path: 'crearnota/:id', component: CrearnotaComponent },
      { path: 'imagenes/:id', component: ImagesnotaComponent },
    ]),

    //app_routing
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
