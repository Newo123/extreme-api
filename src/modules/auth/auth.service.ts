import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/common/error';
import { UserDtoUnPassword } from 'src/types/auth.interfaces';
import { MailService } from '../mail/mail.service';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RecoveryPasswordDto } from './dto/recovery-password.dto';
import { AuthResponse } from './response';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly tokenService: TokenService,
		private readonly mailService: MailService,
		private readonly configService: ConfigService,
	) {}

	private async getToken(user: UserDtoUnPassword): Promise<string> {
		const token = await this.tokenService.getToken(user);
		return token;
	}

	public async register(dto: CreateUserDto): Promise<AuthResponse> {
		const newUser = await this.userService.create(dto);

		const token = await this.getToken(newUser);

		return { ...newUser, token };
	}

	public async login(dto: LoginUserDto): Promise<AuthResponse> {
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

	public async passwordRecovery(dto: RecoveryPasswordDto) {
		const user = await this.userService.findUser(dto.email);

		if (!user) {
			throw new BadRequestException(AppError.USER_EMAIL_NOT_FOUND);
		}

		await this.mailService.sendMail(user);

		// await this.mailService.send({
		// 	from: this.configService.get('JS_CODE_MAIL'),
		// 	to: user.email,
		// 	subject: 'Verify User',
		// 	html: `
		//     <h3>Hello ${user.full_name}!</>
		//     <p>Please use this <a href="http://localhost:3000/login">link</a> to reset your password</p>
		//   `,
		// });
	}
}
