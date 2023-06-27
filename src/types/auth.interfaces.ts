import { User } from '@prisma/client';
import { LoginUserDto } from 'src/modules/auth/dto/loginUser.dto';
import { CreateUserDto } from 'src/modules/users/dto/createUser.dto';

export interface IJwtPayload {
	user: IUserJWT;
	iat: number;
	exp: number;
}

export interface IUserJWT {
	email: string;
	name: string;
}

export type UserDtoUnPassword = Omit<CreateUserDto | LoginUserDto, 'password'>;
export type UserUnPassword = Omit<User, 'password'>;
