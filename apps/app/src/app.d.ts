import { SupabaseClient, type AuthSession } from '@supabase/supabase-js';
/// <reference types="@sveltejs/kit" />

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<AuthSession | null>;
		}
		interface PageData {
			session: AuthSession | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}
