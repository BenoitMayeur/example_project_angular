import { ImageDto } from './imageDto';
import { UserDto } from './userDto';

export interface ArticleDto {

    id: number;
    title: string;
    content: string;
    author: UserDto;
    date: Date;
    published: boolean;
    publishable: boolean;
    image: ImageDto;
}
