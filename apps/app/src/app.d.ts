import {
	SupabaseClient,
	type AuthSession,
	type AuthUser,
} from '@supabase/supabase-js';
/// <reference types="@sveltejs/kit" />

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession: () => Promise<{
				session: AuthSession | null;
				user: AuthUser | null;
			}>;
			session: AuthSession | null;
			user: AuthUser | null;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}
