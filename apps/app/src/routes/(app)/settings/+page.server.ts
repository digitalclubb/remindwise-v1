import { graphql } from '$houdini';
import { redirect } from '@sveltejs/kit';
export const actions = {
	updateSettings: async (event) => {
		const data = await event.request.formData();
		const firstName = data.get('firstName') as string;
		const lastName = data.get('lastName') as string;
		const email = data.get('email') as string;
		const id = data.get('id') as string;

		const actionMutation = graphql(`
			mutation updateSettings(
				$id: UUID
				$firstName: String
				$lastName: String
				$email: String
			) {
				updatesettingsCollection(
					filter: { id: { eq: $id } }
					set: { first_name: $firstName, last_name: $lastName, email: $email }
				) {
					affectedCount
					records {
						id
					}
				}
			}
		`);

		await actionMutation.mutate(
			{
				firstName,
				lastName,
				email,
				id,
			},
			{ event }
		);

		throw redirect(303, '/');
	},
};
