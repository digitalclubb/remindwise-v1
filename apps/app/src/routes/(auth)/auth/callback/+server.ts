import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	const goto = url.searchParams.get('goto');

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	if (goto) {
		throw redirect(302, '/settings/update-password');
	}
	throw redirect(303, '/');
};
