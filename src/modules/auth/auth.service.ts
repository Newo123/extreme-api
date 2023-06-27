import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/common/error';
import { UserUnPassword } from 'src/types/auth.interfaces';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly tokenService: TokenService,
	) {}

	private async getToken(user: UserUnPassword): Promise<string> {
		const token = await this.tokenService.getToken(user);
		return token;
	}

	public async register(dto: CreateUserDto) {
		const newUser = await this.userService.create(dto);

		const token = await this.getToken(newUser);

		return { ...newUser, token };
	}

	public async login(dto: LoginUserDto) {
		const user = await this.userService.findUser(dto.email);

		if (!user) {
			throw new HttpException(
				AppError.USER_EMAIL_NOT_FOUND,
				HttpStatus.NOT_FOUND,
			);
		}

		const comparePassword = await bcrypt.compare(dto.password, user.password);

		if (!comparePassword) {
			throw new BadRequestException(AppError.USER_PASSWORD_INVALID);
		}

		const token = await this.getToken(user);
		const newUser = await this.userService.findUserByEmail(dto.email);

		return { ...newUser, token };
	}
}
