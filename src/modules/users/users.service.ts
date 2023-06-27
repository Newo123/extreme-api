import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { userField } from 'src/common/constants';
import { AppError } from 'src/common/error';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserUnPassword } from 'src/types/auth.interfaces';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	private async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		return bcrypt.hash(password, salt);
	}

	public async findUserByEmail(email: string): Promise<UserUnPassword> {
		return this.prismaService.user.findUnique({
			where: { email: email },
			select: { ...userField },
		});
	}

	public async findUser(email: string): Promise<User> {
		return this.prismaService.user.findUnique({ where: { email } });
	}

	public async create(dto: CreateUserDto): Promise<UserUnPassword> {
		const user = await this.findUserByEmail(dto.email);

		if (user) {
			throw new BadRequestException(AppError.USER_EMAIL_ALREADY);
		}

		return this.prismaService.user.create({
			data: {
				full_name: dto.full_name,
				nick_name: dto.nick_name,
				email: dto.email,
				password: await this.hashPassword(dto.password),
				phone: dto.phone,
			},
			select: {
				...userField,
			},
		});
	}
}
