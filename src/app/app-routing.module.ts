/* Angular */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Guards */
import { AuthGuard } from './guards/auth.guard';

/* Components */
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '',  component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'noticias',  component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'adicionar-noticias',  component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'eventos',  component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'adicionar-evento',  component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'trabalhe-conosco',  component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'feedback',  component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'colaboradores',  component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'adicionar-colaborador',  component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
