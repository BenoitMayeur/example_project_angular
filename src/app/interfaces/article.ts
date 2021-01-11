import { AddArticleDto } from './addArticleDto';
import { ArticleDto } from './articleDto';
import { ImageDto } from './imageDto';
import { UpdateArticleDto } from './updateArticleDto';
import { User } from './user';
import { UserDto } from './userDto';

export class Article{

    constructor(    
        public id: number,
        public title: string,
        public content: string,
        public author: Partial<User>,
        public date: Date,
        public published: boolean,
        public publishable: boolean,
        public image: ImageDto
        ){}

    static fromDto(articleDto: ArticleDto): Article{

        return new Article(
            articleDto.id,
            articleDto.title, 
            articleDto.content,
            User.fromDto(articleDto.author),
            articleDto.date,
            articleDto.published,
            articleDto.publishable,
            articleDto.image
            )
    }

    // 🎪 Pourquoi est-ce qu'il n'y a pas un "toDto"?

    addArticle(): AddArticleDto{
        let dto: AddArticleDto;
        dto = {
            title: this.title,
            content: this.content,
            author: {
                id: this.author.id,
                username: this.author.username
            },
            date: this.date,
            published: this.published,
            publishable: this.publishable,
            image: this.image
        }
        return dto;
    }
    
    toUpdateArticleDto(): UpdateArticleDto{
        let dto: UpdateArticleDto;
        dto = {
            id: this.id,
            title: this.title,
            content: this.content,
            author: this.author.id,
            date: this.date,
            published: this.published,
            publishable: this.publishable,
            image: this.image
        }
        return dto;
    }


    toAddArticleDto(): AddArticleDto{
        let dto: AddArticleDto;
        dto = {

            title: this.title,
            content: this.content,
            author: {
                id: this.id,
                username: this.author.username
            },
            date: this.date,
            published: this.published,
            publishable: this.publishable,
            image: this.image
        }
        return dto;
    }
}


