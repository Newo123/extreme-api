import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	public async sendMail(user: User) {
		const { response } = await this.mailerService
			.sendMail({
				to: user.email,
				from: 'Extreme@global.com',
				subject: 'Восстановление пароля',
				text: 'welcome',
				html: `
      <h1>Восстановление пароля!</h1>
      <p>Если вы уверены что забыли пароль и хотите его восстановить вы можете перейти по этой ссылке для восстановления пароля <a href="http://localhost:3000/login">link</a></p>
      `,
			})
			.catch(error => {
				throw new Error(error.message);
			});

		return response;
	}
}
