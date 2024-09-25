import type { SNSMessage, SQSEvent } from 'aws-lambda';
import type { UserProfileRecord } from '../types';

export const getUserProfile = (sqsEvent: SQSEvent): UserProfileRecord => {
	const { body } = sqsEvent.Records[0];
	const snsMessage = JSON.parse(body) as SNSMessage;
	const userProfile = JSON.parse(snsMessage.Message, (key, value) => {
		if (key === 'updated_at') {
			return new Date(value);
		}

		return value;
	});

	return userProfile;
};
