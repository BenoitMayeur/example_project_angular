import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DataLoginDto } from '../dto/data-login-dto';
import { User } from '../interfaces/user';
import { UserDto } from '../interfaces/userDto';
import { map } from 'rxjs/operators';
import { AddUserDto } from '../interfaces/addUserDto';
import { AddUserComponent } from '../pages/add-user/add-user.component';
import { UpdateUserDto } from '../interfaces/updateUserDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlAPI: string = environment.baseAppUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.urlAPI + 'users')
    .pipe(map((arrayUsersDto: UserDto []) => {
      return arrayUsersDto.map(userDto => User.fromDto(userDto))
    }
    ));
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.urlAPI + `users/${id}`)
    .pipe(map( (userDto: UserDto) => {
      return User.fromDto(userDto)
    }));
  }

  createUser(payload: AddUserDto) {
    return this.http
      .post<User>(`${this.urlAPI}users`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateUser(payload: UpdateUserDto): Observable<User> {
    return this.http
      .patch<User>(`${this.urlAPI}users/${payload.id}`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  removeUser(id: number): Observable<User> {
    return this.http
      .delete<any>(`${this.urlAPI}users/${id}`)
      .pipe(catchError((error: any) => throwError(error)));
  }
    

}
