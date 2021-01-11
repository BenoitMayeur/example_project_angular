import { ImageDto } from './imageDto';
import { UserDto } from './userDto';

export interface AddArticleDto {

    title: string;
    content: string;
    author: {
        id: number,
        username: string
    };
    date: Date;
    published: boolean;
    publishable: boolean;
    image: ImageDto;
}
