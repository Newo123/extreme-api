import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMailConfig } from 'src/configs/nodemailer.config';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMailConfig,
		}),
		MailModule,
		UsersModule,
		AuthModule,
		TokenModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
