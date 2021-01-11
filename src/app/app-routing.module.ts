import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { LogoutGuard } from './guards/logout.guard';
import { OnlyAdminGuard } from './guards/only-admin.guard';
import { OnlyAuthorAndAdminGuard } from './guards/only-author-and-admin.guard copy';
import { OnlyAuthorGuard } from './guards/only-author.guard';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { DetailArticleComponent } from './pages/detail-article/detail-article.component';
import { ListArticlesComponent } from './pages/list-articles/list-articles.component';

// Pages
import { LoginRouteComponent } from './pages/login-route/login-route.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { SignupComponent } from './pages/signup/signup.component';
import { OnlyNotBanned } from './guards/only-not-banned';
import { SuccessComponent } from './pages/success/success.component';
 
const routes: Routes = [
  {
    path: '',
    component: LoginRouteComponent,
    canActivate: [LogoutGuard]
  },
  {
    path: 'list-users',
    component: ListUsersComponent,
    canActivate: [OnlyAdminGuard]
  },
  {
    path: 'list-articles',
    component: ListArticlesComponent,
  },
  {
    path: 'add-user/:id',
    component: AddUserComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'add-article/:id/:idauthor',
    component: AddArticleComponent,
    canActivate: [LoginGuard, OnlyAuthorAndAdminGuard]
  },
  {
    path: 'add-article/:id',
    component: AddArticleComponent,
    canActivate: [LoginGuard, OnlyAuthorAndAdminGuard, OnlyNotBanned]
  },

  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: 'article/:id',
    component: DetailArticleComponent,

  },
  {
    path: 'success/:token',
    component: SuccessComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
