import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
	@IsString()
	full_name: string;

	@IsString()
	nick_name: string;

	@IsString()
	@IsEmail()
	email: string;

	@IsString()
	password: string;

	@IsString()
	phone: string;
}
