import { Injectable } from '@angular/core';
import { Observable, throwError, of, BehaviorSubject, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DataLoginDto } from '../dto/data-login-dto';
import { encode } from 'js-base64';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public currentUser: BehaviorSubject<{id:number; username: string; role: string; banished: boolean}> = new BehaviorSubject<{id:number; username: string; role: string; banished: boolean}>(null);
// toute personne qui y souscrit reçoit la dernière valeur

  private urlAPI: string = environment.baseAppUrl;

  constructor(
    private http: HttpClient,
    private routeur: Router
    ) { }
  
  isLogged(){
    return !! sessionStorage.getItem('token');
  }

  isEditor(){
    const token = sessionStorage.getItem('role');
    if(token === 'EDITOR'){
        return true;
    }
    return false;
  }

  isAuthor(){
    const token = sessionStorage.getItem('role');
    if(token === 'AUTHOR'){
        return true;
    }
    return false;
  }

  takeDataFromSessionStorage(){
    return sessionStorage.getItem('role');
  }

  isNotLogged(){
    return ! sessionStorage.getItem('token');
  }

  isBanished(){
    return sessionStorage.getItem('banished');
  }

  whatIsTheUserId(){
    return parseInt(sessionStorage.getItem('id'));
  }

  decodeTokenForLoginGoogle(token){
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(token);
    sessionStorage.setItem('id', decodedToken.id)
    sessionStorage.setItem('username', decodedToken.username)
    sessionStorage.setItem('role', decodedToken.role)
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('banished', decodedToken.banished)
    this.currentUser.next(decodedToken)
  }

  checkLogin(credentials: DataLoginDto){

    const helper = new JwtHelperService();

    console.log("checkLogin")
    let toSend = encode(credentials.login + ":"+ credentials.password);
    return this.http.get<{username: string, access_token: string}>(this.urlAPI + 'auth/login', {headers:{Authorization: 'Basic ' + toSend}})
    .pipe(
      tap(response => {console.log("réussi", response)

      const decodedToken = helper.decodeToken(response.access_token);

      console.log('decodedToken', decodedToken);
      sessionStorage.setItem('id', decodedToken.id)
      sessionStorage.setItem('username', decodedToken.username)
      sessionStorage.setItem('role', decodedToken.role)
      sessionStorage.setItem('token', response.access_token)
      sessionStorage.setItem('banished', decodedToken.banished)
      this.currentUser.next(decodedToken)
    }
    ),
/*
      catchError(error => {
        console.log("raté", error)
        return of (1) //catcherror doit retourner un observable => on doit mettre un return of 
      })*/
    )
  }

  async logout(){
    let id = sessionStorage.getItem('id');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('banished');

    let variable = sessionStorage.getItem('token');

    console.log("variable", variable)

    this.routeur.navigate([""])
  }

  logoutGoogle(){



    let variable = sessionStorage.getItem('token');

    console.log("variable", variable)


    return this.http.get(this.urlAPI + `auth/logout`).pipe(
      tap(()=>{
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('banished');
      }
    )
    )
    }

/*

  getAllUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.urlAPI + 'users')
    .pipe(map((arrayUsersDto: UserDto []) => {
      return arrayUsersDto.map(userDto => User.fromDto(userDto))
    }
    ));
  }

*/


}
