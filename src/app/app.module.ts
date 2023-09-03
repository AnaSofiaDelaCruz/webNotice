import { EditorModule } from '@tinymce/tinymce-angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { HomeWriterComponent } from './layout/public/home-writer/home-writer.component';
import { NewWriterComponent } from './layout/public/new-writer/new-writer.component';
import { ListWritterComponent } from './list-writter/list-writter.component';
import { HomeAdminComponent } from './layout/public/home-admin/home-admin.component';
import { MenuUsuariosAdminComponent } from './menu-usuarios-admin/menu-usuarios-admin.component';
import { CrearCategoriaComponent } from './layout/public/crear-categoria/crear-categoria.component';
import { EditarPerfilComponent } from './layout/public/editar-perfil/editar-perfil.component';
import { NoticiasInternacionalesComponent } from './layout/public/noticias-internacionales/noticias-internacionales.component';
import { NoticiaNacionalComponent } from './layout/public/noticia-nacional/noticia-nacional.component';
import { NoticiaOpinionComponent } from './layout/public/noticia-opinion/noticia-opinion.component';
import { NoticiaChiapasComponent } from './layout/public/noticia-chiapas/noticia-chiapas.component';
import { BusquedaComponent } from './layout/public/busqueda/busqueda.component';

import { ObjToArray } from './ObjToArray.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PrincipalComponent,
    BasenewsComponent,
    WriterComponent,
    Writer2Component,
    StatisticsComponent,
    HomeWriterComponent,
    NewWriterComponent,
    ListWritterComponent,
    HomeAdminComponent,
    MenuUsuariosAdminComponent,
    CrearCategoriaComponent,
    EditarPerfilComponent,
    NoticiasInternacionalesComponent,
    NoticiaNacionalComponent,
    NoticiaOpinionComponent,
    NoticiaChiapasComponent,
    BusquedaComponent,
    ObjToArray,
  ],
  imports: [
    BrowserModule,
    EditorModule,
    RouterModule.forRoot([
      { path: 'home', component: PrincipalComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'register2', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'news', component: BasenewsComponent },
      { path: 'writer', component: WriterComponent },
      { path: 'writerstep2', component: Writer2Component },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'homeWriter', component: HomeWriterComponent },
      { path: 'newWriter', component: NewWriterComponent },
      { path: 'listWriter', component: ListWritterComponent },
      { path: 'homeAdmin', component: HomeAdminComponent },
      { path: 'homeAdminMenu', component: MenuUsuariosAdminComponent },
      { path: 'crear-categoria', component: CrearCategoriaComponent },
      { path: 'editarPerfil/:id', component: EditarPerfilComponent },
      { path: 'noticiaOpinion', component: NoticiaOpinionComponent },
      { path: 'noticiaChiapas', component: NoticiaChiapasComponent },
      { path: 'busqueda', component: BusquedaComponent },
      {
        path: 'noticiaInternacional',
        component: NoticiasInternacionalesComponent,
      },
      { path: 'noticiaNacional', component: NoticiaNacionalComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },

    ]),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //app_routing
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
