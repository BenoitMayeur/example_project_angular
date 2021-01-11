import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { ArticlesService } from 'src/app/services/articles.service';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {

  public articleToDisplay: Article
  public idArticle: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articlesService: ArticlesService
  ) {


    this.activatedRoute.paramMap.pipe(
      mergeMap((params) => {

        this.idArticle = Number(params.get('id'));
        console.log(this.idArticle);
        return this.articlesService.getArticleById(this.idArticle)
      }

      )).subscribe((article: Article) => {

        this.articleToDisplay = article;

      }), {}

  }





  ngOnInit() {
  }

}
