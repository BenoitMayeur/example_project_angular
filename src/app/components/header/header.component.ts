import { HttpResponseBase } from '@angular/common/http';
import { Identifiers } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public username: string;
  public userrole: string;
  public iduser: number;
  public userBanned: boolean;
  public currentUserObject: Subscription;
  public userBanihsed: boolean;


  constructor(
    private router: Router,
    public authentificationService: AuthentificationService,
    
  ) {
    this.currentUserObject = this.authentificationService.currentUser.subscribe(
      user => {
        if(user){
          this.username = user.username; 
          this.userrole = user.role; 
          this.iduser = Number(user.id);
          this.userBanned = user.banished;
          console.log('userBanned? ', this.userBanned)
        
          if (this.userrole === "EDITOR") {
            this.userrole = 'éditeur';
          }
          else if (this.userrole === "AUTHOR") {
            this.userrole = 'auteur'
          }
          else {
            this.userrole = 'lecteur'
          }
        }
      }
    )

  }

  ngOnInit() {


  }

  ngOnDestroy(){
    if(this.currentUserObject){
      this.currentUserObject.unsubscribe();
    }

  }

  logout() {
    this.authentificationService.logout();
  }

  showMenu(){
    console.log('Yep')

    document.querySelector(".navbar-collapse").classList.toggle("show");



  }

  logoutGoogle(){
    this.authentificationService.logoutGoogle().subscribe(
      () => {
        this.router.navigate([""])
      }
    );
  }

}

