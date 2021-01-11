import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

//Guards
import { LoginGuard } from './guards/login.guard';
import { LogoutGuard } from './guards/logout.guard';
import { OnlyAdminGuard } from './guards/only-admin.guard';
import { OnlyAuthorGuard } from './guards/only-author.guard';
import { OnlyAuthorAndAdminGuard } from './guards/only-author-and-admin.guard copy';
import { OnlyNotBanned } from './guards/only-not-banned';

//Pages
import { LoginRouteComponent} from './pages/login-route/login-route.component';
import { ListUsersComponent} from './pages/list-users/list-users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ListArticlesComponent } from './pages/list-articles/list-articles.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { DetailArticleComponent } from './pages/detail-article/detail-article.component';
import { SuccessComponent } from './pages/success/success.component';

//Components
import { HeaderComponent } from './components/header/header.component'
import { SignupComponent } from './pages/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';

//Interceptors
import { LoginInterceptorProvider } from './interceptors/login.interceptors';
import { ShortentextPipe } from './pipes/shortentext.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginRouteComponent,
    ListUsersComponent,
    HeaderComponent,
    AddUserComponent,
    ListArticlesComponent,
    AddArticleComponent,
    ShortentextPipe,
    SignupComponent,
    DetailArticleComponent,
    FooterComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CKEditorModule
  ],
  providers: [LoginGuard, LogoutGuard, OnlyAdminGuard, OnlyAuthorGuard, OnlyAuthorAndAdminGuard, OnlyNotBanned, LoginInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
