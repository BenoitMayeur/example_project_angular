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
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public userForm: FormGroup;
  public idUser: number;
  public user: User

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private routeur: Router,
    private usersService: UsersService,
    public authentificationService: AuthentificationService,
  ) {

    this.activatedRoute.paramMap.pipe(
      mergeMap((params) => {
      this.idUser = Number(params.get('id'));

      if(this.idUser === 0){
        return of(new User(
          0,
          "",
          "",
          "",
          "",
          "",
          false,
          "",
          ""
        ))
      }
      else{
        return this.usersService.getUserById(this.idUser)
      }
    
  })).subscribe((user: User) => {

    this.user = user;
    console.log(this.user)
    this.userForm = formBuilder.group({
      username : formBuilder.control(this.user.username,[Validators.required]),
      firstname : formBuilder.control(this.user.firstname, [Validators.maxLength(30)]),
      lastname : formBuilder.control(this.user.lastname, [Validators.maxLength(30)]),
      description : formBuilder.control(this.user.description),
      banished : formBuilder.control(this.user.banished),
      password : '',
      role : formBuilder.control(this.user.role,[Validators.required]),
      email : formBuilder.control(this.user.email,[Validators.required]),

    }, {}
    )

  });

   }

  ngOnInit() {
  }


  addUser(){

    let dataToSend = {
      id: 0,
      username: this.userForm.controls.username.value,
      firstname: this.userForm.controls.firstname.value,
      lastname: this.userForm.controls.lastname.value,
      description: this.userForm.controls.description.value,
      banished: this.userForm.controls.banished.value,
      password: this.userForm.controls.password.value,
      role: this.userForm.controls.role.value,
      email: this.userForm.controls.email.value,

    }

    console.log(dataToSend);
    this.usersService.createUser(dataToSend).subscribe(() =>
    this.routeur.navigate(["list-users"]))
  }

  updateUser(){
    let dataToSend;

    if(this.userForm.controls.password.value != ''){
      console.log('le MDP est rempli')
      dataToSend = {
        id: this.idUser,
        username: this.userForm.controls.username.value,
        firstname: this.userForm.controls.firstname.value,
        lastname: this.userForm.controls.lastname.value,
        description: this.userForm.controls.description.value,
        banished: this.userForm.controls.banished.value,
        password: this.userForm.controls.password.value,
        role: this.userForm.controls.role.value,
        email: this.userForm.controls.email.value
      }
    }
    else{
      console.log('le MDP est vide')
      dataToSend = {
        id: this.idUser,
        username: this.userForm.controls.username.value,
        firstname: this.userForm.controls.firstname.value,
        lastname: this.userForm.controls.lastname.value,
        description: this.userForm.controls.description.value,
        banished: this.userForm.controls.banished.value,

        role: this.userForm.controls.role.value,
        email: this.userForm.controls.email.value
      }
    }

    console.log("dataToSend", dataToSend)
    this.usersService.updateUser(dataToSend).subscribe(() =>
    {
      if(this.authentificationService.isEditor()){
        this.routeur.navigate(["list-users"])
      }
      else{
        this.routeur.navigate(["list-articles"])
      }

    });
  }

  banUser(){
    if (confirm("Etes-vous sûr de vouloir bannir cet utilisateur? Un utilisateur banni ne pourra plus poster d'articles et modifier ses articles déjà parus")) {

      let dataToSend = {
        id: this.idUser,
        banished: true

      }

      this.usersService.updateUser(dataToSend).subscribe(() =>
      {

          this.routeur.navigate(["list-users"])

  
      });

    } 
  }

  deleteUser(){

    console.log("deleteArticle")
    if (confirm("Etes-vous sûr de vouloir supprimer cet utilisateur?")) {
      this.usersService.removeUser(this.idUser).subscribe(() =>
      this.routeur.navigate(["list-users"]));

    } 
  }

}
