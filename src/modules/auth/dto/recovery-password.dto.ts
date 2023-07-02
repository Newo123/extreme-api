import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RecoveryPasswordDto {
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string;
}
