<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;

	// console.log("hey", data);
</script>

<div class="row flex-center flex">
	<div class="col-6 form-widget">
		<Auth
			additionalData="{undefined}"
			supabaseClient="{data.supabase}"
			view="sign_in"
			redirectTo="{`${data.url}/logging-in?redirect=/`}"
			showLinks="{true}"
			appearance="{{ theme: ThemeSupa }}"
		/>
	</div>
</div>
