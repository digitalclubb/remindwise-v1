import { updateSettingsStore } from '$houdini';
import { redirect } from '@sveltejs/kit';
export const actions = {
	updateSettings: async (event) => {
		const data = await event.request.formData();
		const firstName = data.get('firstName') as string;
		const lastName = data.get('lastName') as string;
		const email = data.get('email') as string;
		const id = data.get('id') as string;

		const updateSettings = new updateSettingsStore();

		await updateSettings.mutate(
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
