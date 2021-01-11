import { AddUserDto } from './addUserDto';
import { UserDto } from './userDto';


export class User{

    constructor(    
        public id: number,
        public username: string,
        public firstname: string,
        public lastname: string,
        public description: string,
        public password: string,
        public banished: boolean,
        public role: string,
        public email: string
        ){}

    static fromDto(userDto: UserDto): User{
        return new User(
            userDto.id, 
            userDto.username, 
            userDto.firstname, 
            userDto.lastname, 
            userDto.description, 
            userDto.password, 
            userDto.banished,
            userDto.role,
            userDto.email
            )
    }

    addUser(): AddUserDto{
        let dto: AddUserDto;
        dto = {
            username: this.username,
            firstname: this.username,
            lastname: this.lastname,
            description: this.description,
            password: this.password,
            role: this.role,
            email: this.email,

        }
        return dto;
    }
    
    updateUser(): UserDto{
        let dto: UserDto;
        dto = {
            id: this.id,
            username: this.username,
            firstname: this.username,
            lastname: this.lastname,
            description: this.description,
            banished: this.banished,
            password: this.password,
            role: this.role,
            email: this.email
        }
        return dto;
    }

}


