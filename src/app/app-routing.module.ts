import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { PostekleComponent } from './components/postekle/postekle.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { PostlarimComponent } from './components/postlarim/postlarim.component';
import { PostlarComponent } from './components/postlar/postlar.component';
import { UyelerComponent } from './components/uyeler/uyeler.component';

const redirectLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'post/:key',
    component: PostComponent,
  },
  {
    path: 'postekle',
    component: PostekleComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLogin },
  },
  {
    path: 'postlarim',
    component: PostlarimComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLogin },
  },
  {
    path: 'postlar',
    component: PostlarComponent,
  },
  {
    path: 'uyeler',
    component: UyelerComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
