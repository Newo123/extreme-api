import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDtoUnPassword } from 'src/types/auth.interfaces';

@Injectable()
export class TokenService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	public async getToken(user: UserDtoUnPassword): Promise<string> {
		const payload = { user };

		return this.jwtService.sign(payload, {
			secret: this.configService.get('JWT_SECRET'),
			expiresIn: this.configService.get('TOKEN_LIFETIME'),
		});
	}
}
