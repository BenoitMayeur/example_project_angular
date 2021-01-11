import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DataLoginDto } from '../dto/data-login-dto';

import { map } from 'rxjs/operators';
import { AddUserComponent } from '../pages/add-user/add-user.component';
import { Article } from '../interfaces/article';
import { ArticleDto } from '../interfaces/articleDto';
import { AddArticleDto } from '../interfaces/addArticleDto';
import { UpdateArticleDto } from '../interfaces/updateArticleDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private urlAPI: string = environment.baseAppUrl;

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<Article[]> {

    return this.http.get<ArticleDto[]>(this.urlAPI + 'articles')
    .pipe(map((arrayArticlesDto: ArticleDto []) => { 

      return arrayArticlesDto.map(articleDto => Article.fromDto(articleDto))
    }
    ));
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<ArticleDto>(this.urlAPI + `articles/${id}`)
    .pipe(map( (articleDto: ArticleDto) => {
      return Article.fromDto(articleDto)
    }));
  }

  getArticleByAuthor(id: number): Observable<Article[]> {
    return this.http.get<ArticleDto[]>(this.urlAPI + `articles/author/${id}`)
    .pipe(map( (arrayArticlesDto: ArticleDto[]) => {
      return arrayArticlesDto.map(articleDto => Article.fromDto(articleDto))
    }));
  }

  createArticle(articleForm: AddArticleDto, image: File) {

    const formData = new FormData();

    formData.append('image', image);
    formData.append('title', articleForm.title);
    formData.append('content', articleForm.content);
    formData.append('authorId', String(articleForm.author));
    formData.append('date', String(articleForm.date));
    formData.append('published', String(articleForm.published));
    formData.append('publishable', String(articleForm.publishable));

    return this.http
      .post<Article>(`${this.urlAPI}articles`, formData)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateArticle(payload: FormData, idArticleUpdated): Observable<Article> {
    return this.http
      .patch<Article>(`${this.urlAPI}articles/${idArticleUpdated}`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  removeArticle(id: number): Observable<Article> {
    return this.http
      .delete<any>(`${this.urlAPI}articles/${id}`)
      .pipe(catchError((error: any) => throwError(error)));
  }


}
