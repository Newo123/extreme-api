import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJWTConfig } from 'src/configs/jwt.config';
import { TokenService } from './token.service';

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		PassportModule.register({
			defaultStrategy: 'jwt',
			property: 'user',
			session: false,
		}),
	],
	providers: [TokenService, JwtService],
	exports: [TokenService],
})
export class TokenModule {}
