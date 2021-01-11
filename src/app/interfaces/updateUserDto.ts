export interface UpdateUserDto {
    id: number;
    username?: string;
    firstname?: string;
    lastname?: string;
    description?: string;
    banished?: boolean;
    role?: string;
    email?: string;
    password?: string
}
