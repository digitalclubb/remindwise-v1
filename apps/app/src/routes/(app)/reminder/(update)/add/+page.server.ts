import { graphql } from '$houdini';
import { redirect } from '@sveltejs/kit';

export const actions = {
	addReminder: async (event) => {
		const data = await event.request.formData();

		const userid = data.get('userId') as string;
		const categoryId = data.get('category-select') as string;
		const name = data.get('name') as string;
		const type = data.get('type') as string;
		const company = data.get('company') as string;
		const cost = parseFloat(data.get('cost') as string);
		const datePurchased = new Date(data.get('renewal') as string);
		const frequency = data.get('frequency') as string;
		const autoRenewal = data.get('auto') === 'true';
		const notes = data.get('notes') as string;

		const actionMutation = graphql(`
			mutation addReminder(
				$userid: UUID!
				$categoryId: BigInt
				$name: String!
				$type: Type
				$company: String!
				$cost: Float
				$datePurchased: Date
				$frequency: Frequency
				$autoRenewal: Boolean
				$notes: String
			) {
				insertIntoremindersCollection(
					objects: [
						{
							userid: $userid
							categoryId: $categoryId
							name: $name
							type: $type
							company: $company
							cost: $cost
							datePurchased: $dateOfRenewal
							frequency: $frequency
							autoRenewal: $autoRenewal
							notes: $notes
						}
					]
				)
			}
		`);

		await actionMutation.mutate(
			{
				userid,
				categoryId,
				name,
				type,
				company,
				cost,
				datePurchased,
				frequency,
				autoRenewal,
				notes,
			},
			{ event }
		);

		// TODO on reminder add we want to take them to the categories page? the list might not be updated so need to look into how to bust cache
		throw redirect(303, '/');
	},
};
