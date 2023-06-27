import {
	Body,
	Controller,
	Delete,
	HttpCode,
	Patch,
	Post,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthResponse } from './response';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@Post('login')
	public async login(@Body() dto: LoginUserDto): Promise<AuthResponse> {
		return this.authService.login(dto);
	}

	@Post('register')
	public async register(@Body() dto: CreateUserDto): Promise<AuthResponse> {
		return this.authService.register(dto);
	}

	@Patch('update')
	public async update() {}

	@Delete()
	public async delete() {}
}
