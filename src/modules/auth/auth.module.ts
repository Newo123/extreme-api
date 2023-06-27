import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [UsersModule, TokenModule],
	controllers: [AuthController],
	providers: [AuthService, PrismaService],
})
export class AuthModule {}
