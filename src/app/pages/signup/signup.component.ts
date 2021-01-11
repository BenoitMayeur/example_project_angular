import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, AsyncValidatorFn, FormArray } from '@angular/forms';
import { Observable, of, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public visible: boolean = false;
  public userForm: FormGroup;

  public user: User

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private routeur: Router,
    private usersService: UsersService,
    private authentificationService: AuthentificationService
  ) {

    this.userForm = formBuilder.group({
      username : formBuilder.control('',[Validators.required]),
      password : formBuilder.control('',[Validators.required]),
      password2 : formBuilder.control('',[Validators.required]),
      email : formBuilder.control('',[Validators.required]),

    }, {}
    )

   }

  ngOnInit() {
  }

  addUser(){
    if(this.userForm.controls.password.value != this.userForm.controls.password2.value){
      this.visible = true;
    }
    else{

      this.visible = false;

      let dataToSend = {
        id: 0,
        username: this.userForm.controls.username.value,
        firstname: '',
        lastname: '',
        description: '',
        banished: false,
        password: this.userForm.controls.password.value,
        email: this.userForm.controls.email.value,
        role: 'USER'
      }
  
      let dataToLogIn = {
        login: dataToSend.username,
        password: dataToSend.password
      }
  
      console.log(dataToSend);
      this.usersService.createUser(dataToSend).subscribe(
        () => this.authentificationService.checkLogin(dataToLogIn).subscribe(
          () => this.routeur.navigate(["list-articles"])    
        )
      )
    }

  }

}
