import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, AsyncValidatorFn, FormArray } from '@angular/forms';
import { Observable, of, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-login-route',
  templateUrl: './login-route.component.html',
  styleUrls: ['./login-route.component.css']
})
export class LoginRouteComponent implements OnInit {

  public userForm: FormGroup;
  public showErrorMessage: boolean = false;
  public errorMessage: string = "Le login ou le mot de passe est incorrect.";
  public idUser: number;

  constructor(
    private formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private routeur: Router
  ) { 
    this.userForm = formBuilder.group({
      username: formBuilder.control('', [Validators.required]),
      password: formBuilder.control('', [Validators.required])
    },{})

  }

  ngOnInit(): void {
  }

  loginStarted(){

    let dataToSend = {
      login: this.userForm.controls.username.value,
      password: this.userForm.controls.password.value,
    }
    this.authentificationService.checkLogin(dataToSend).subscribe(
      answer => this.routeur.navigate(["list-articles"]) , 
      error => {this.showErrorMessage = true
      console.log("Il y a une erreur")}
      );
  }
}
