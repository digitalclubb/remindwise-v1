import { graphql } from '$houdini';
import { redirect } from '@sveltejs/kit';

export const actions = {
	addReminder: async (event) => {
		const data = await event.request.formData();
		const categoryId = data.get('category-select') as string;
		const company = data.get('company') as string;
		const cost = parseFloat(data.get('cost') as string);
		const dateOfRenewal = new Date(data.get('renewal') as string);
		const autoRenewal = data.get('auto') === 'true';
		const notes = data.get('notes') as string;
		const userid = data.get('userId') as string;

		const actionMutation = graphql(`
			mutation addReminder(
				$categoryId: BigInt
				$company: String!
				$cost: Float
				$dateOfRenewal: Date
				$autoRenewal: Boolean
				$notes: String
				$userid: UUID!
				$enabled: Boolean
			) {
				insertIntoremindersCollection(
					objects: [
						{
							company: $company
							cost: $cost
							dateOfRenewal: $dateOfRenewal
							categoryId: $categoryId
							autoRenewal: $autoRenewal
							userid: $userid
							notes: $notes
							enabled: $enabled
						}
					]
				) {
					affectedCount
					records {
						id
						company
					}
				}
			}
		`);

		await actionMutation.mutate(
			{
				categoryId,
				company,
				cost,
				dateOfRenewal,
				notes,
				autoRenewal,
				userid,
				enabled: true,
			},
			{ event }
		);

		// TODO on reminder add we want to take them to the categories page? the list might not be updated so need to look into how to bust cache
		throw redirect(303, '/');
	},
};
