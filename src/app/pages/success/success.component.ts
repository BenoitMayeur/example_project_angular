import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  public token;

  constructor(
    private activatedRoute: ActivatedRoute,
    private routeur: Router,
    private authentificationService: AuthentificationService 
    ) {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    console.log("this.token", this.token)

    this.authentificationService.decodeTokenForLoginGoogle(this.token);

    if(this.token){

      this.routeur.navigate(["list-articles"])
    }


  };


  ngOnInit() {

  }

}


/*
  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    




    this.activatedRoute.paramMap.pipe(
      mergeMap((params) => {

        const helper = new JwtHelperService();

        this.token = Number(params.get('token'));
        console.log(this.token);
        const decodedToken = helper.decodeToken(this.token);
        return this.articlesService.getArticleById(this.idArticle)
      }

      )).subscribe((article: Article) => {

        this.articleToDisplay = article;
        
      }), {}

  }*/