import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@Post('login')
	public async login(@Body() dto: LoginUserDto) {
		return this.authService.login(dto);
	}

	@Post('register')
	public async register(@Body() dto: CreateUserDto) {
		return this.authService.register(dto);
	}
}
