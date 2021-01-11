import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticlesService } from '../../services/articles.service';

import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})

export class ListArticlesComponent implements OnInit {

  public listArticles: Article[]=[];

  constructor(
    private articlesService: ArticlesService, 
    public authentificationService : AuthentificationService
  ) {
    this.articlesService.getAllArticles()
    .subscribe((data) => {this.listArticles = data
      console.log("data", data)
    console.log(this.listArticles)});
   }

  ngOnInit() {
  }

}
