import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailModule } from '../mail/mail.module';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [ConfigModule, UsersModule, TokenModule, MailModule],
	controllers: [AuthController],
	providers: [AuthService, PrismaService],
})
export class AuthModule {}
