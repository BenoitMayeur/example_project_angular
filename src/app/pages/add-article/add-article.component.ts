import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, AsyncValidatorFn, FormArray } from '@angular/forms';
import { Observable, of, forkJoin } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';

import { Article } from 'src/app/interfaces/article';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthentificationService } from 'src/app/services/authentification.service';

import { ArticleDto } from 'src/app/interfaces/articleDto';
import { environment } from 'src/environments/environment';
import { AddArticleDto } from 'src/app/interfaces/addArticleDto';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  public urlAPI: string = environment.baseAppUrl;

  public Editor = ClassicEditor;
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}

  public imageSrc: string;
  public articleForm: FormGroup;
  public idArticle: number;
  public article: Article;
  public idAuthor: number;
  public url: any;
  public newArticle: ArticleDto;
  public imageToDisplay: string;

  @ViewChild("filefield") image

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private routeur: Router,
    private articlesService: ArticlesService,
    public authentificationService: AuthentificationService
  ) {

    this.activatedRoute.paramMap.pipe(
      mergeMap((params) => {

      this.idArticle = Number(params.get('id'));
      this.idAuthor = Number(params.get('idauthor'));
      
      if(this.idArticle === 0){
        return of(new Article(
          0,
          "",
          "Entrez le corps de l'article",
          {
            id: this.idAuthor
          },
          new Date(),
          false,
          false,
          {
            id: 0,
            name: "",
            article: 0
          }
        ))
      }
      else{
        return this.articlesService.getArticleById(this.idArticle)
      }
    
  })).subscribe((article: Article) => {

    this.article = article;

    console.log(this.article.image?.name)

    this.imageToDisplay = String(this.article.image?.name);
    this.imageSrc = this.urlAPI + 'images/'+ this.imageToDisplay;

    this.articleForm = formBuilder.group({
      title : formBuilder.control(this.article.title,[Validators.required]),
      content : formBuilder.control(this.article.content,[Validators.required]),
      
      date : formBuilder.control(new Date(this.article.date).toISOString().substring(0, 10)),
      published : formBuilder.control(this.article.published),
      publishable : formBuilder.control(this.article.publishable),

      image: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),

    }, {}
    )});

   }

  ngOnInit() {}

  addArticle(){
    console.log(this.idAuthor)
    console.log('this.image.nativeElement.files[0]', this.image.nativeElement.files[0])
    let image = this.image.nativeElement.files[0];
    /*const formData = new FormData();

    formData.append('title', this.articleForm.get('title').value);
    formData.append('content', this.articleForm.get('content').value);
    formData.append('authorId', String(this.idAuthor));
    formData.append('date', this.articleForm.get('datearticle').value);
    formData.append('published', this.articleForm.get('published').value);
    formData.append('publishable', this.articleForm.get('publishable').value);
    formData.append('image', this.image.nativeElement.files[0]);*/

    let articleTest: AddArticleDto = this.articleForm.value;

    console.log(articleTest)

    this.articlesService.createArticle(articleTest, image).subscribe(() =>
    this.routeur.navigate(["list-articles"]))

  }

  updateArticle(){

    console.log("this.article.id", this.article.id)
    console.log('this.image.nativeElement.files[0]', this.image.nativeElement.files[0])
    const formData = new FormData();
    formData.append('image', this.image.nativeElement.files[0]);
    
    formData.append('title', this.articleForm.get('title').value);
    formData.append('content', this.articleForm.get('content').value);
    formData.append('authorId', String(this.idAuthor));
    formData.append('date', this.articleForm.get('date').value);
    formData.append('published', this.articleForm.get('published').value);
    formData.append('publishable', this.articleForm.get('publishable').value);

    console.log("formData",formData)
    this.articlesService.updateArticle(formData, this.article.id).subscribe(() =>
    this.routeur.navigate(["list-articles"]))

  }

  publishArticle(){

    console.log("this.article.id", this.article.id)
    console.log('this.image.nativeElement.files[0]', this.image.nativeElement.files[0])
    const formData = new FormData();
    formData.append('image', this.image.nativeElement.files[0]);
    
    formData.append('title', this.articleForm.get('title').value);
    formData.append('content', this.articleForm.get('content').value);
    formData.append('authorId', String(this.idAuthor));
    formData.append('date', this.articleForm.get('date').value);
    formData.append('published', String(true));
    formData.append('publishable', String(false));

    console.log("formData",formData)
    this.articlesService.updateArticle(formData, this.article.id).subscribe(() =>
    this.routeur.navigate(["list-articles"]))


  }

  depublishArticle(){

    console.log(this.idAuthor)
    console.log('this.image.nativeElement.files[0]', this.image.nativeElement.files[0])
    const formData = new FormData();
    formData.append('image', this.image.nativeElement.files[0]);
    
    formData.append('title', this.articleForm.get('title').value);
    formData.append('content', this.articleForm.get('content').value);
    formData.append('authorId', String(this.idAuthor));
    formData.append('date', this.articleForm.get('date').value);
    formData.append('published', String(false));
    formData.append('publishable', String(false));

    console.log("formData",formData)
    this.articlesService.updateArticle(formData, this.article.id).subscribe(() =>
    this.routeur.navigate(["list-articles"]))
  }

  deleteArticle(){

    if (confirm("Etes-vous sûr de vouloir supprimer cet article?")) {
      this.articlesService.removeArticle(this.idArticle).subscribe(() =>
      this.routeur.navigate(["list-articles"]));

    } 
  }

  onFileChange(event) {

    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.articleForm.patchValue({

          fileSource: reader.result

        });
      };

    }
  }

}
