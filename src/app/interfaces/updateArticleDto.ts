import { ImageDto } from './imageDto';


export interface UpdateArticleDto {
    id: number;
    title: string;
    content: string;
    author: number;
    published: boolean;
    publishable: boolean;
    date: Date;
    image: ImageDto;
}
