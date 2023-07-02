import { ConfigService } from '@nestjs/config';

export const getMailConfig = async (configService: ConfigService) => {
	const service = await configService.get<string>('SERVICE');
	const user = await configService.get<string>('EMAIL');
	const pass = await configService.get<string>('PASSWORD');

	return {
		transport: {
			service,
			auth: {
				user,
				pass,
			},
		},
	};
};
