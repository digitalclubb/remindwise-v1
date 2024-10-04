import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export type EmailSenderOptions = {
	fromAddress: string;
	displayName: string;
};

export type EmailSenderRequest = {
	recipients: Array<string>;
	subject: string;
	message: string;
};

export interface EmailSender {
	sendEmail: (request: EmailSenderRequest) => Promise<void>;
}

export const createEmailSender = (
	sesClient: SESClient,
	options: EmailSenderOptions
): EmailSender => {
	return {
		sendEmail: async (request: EmailSenderRequest): Promise<void> => {
			const params = {
				Destination: {
					ToAddresses: request.recipients,
				},
				Message: {
					Body: {
						Text: {
							Charset: 'UTF-8',
							Data: request.message,
						},
					},
					Subject: {
						Charset: 'UTF-8',
						Data: request.subject,
					},
				},
				Source: `${options.displayName} <${options.fromAddress}>`,
			};
			const command = new SendEmailCommand(params);

			await sesClient.send(command);
		},
	};
};
