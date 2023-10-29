import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	const next = url.searchParams.get('next');

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	if (next) {
		throw redirect(302, '/settings/update-password');
	}
	throw redirect(303, '/');
};
