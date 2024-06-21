/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: `https://jhkscdffnfxdqxhouzkq.supabase.co/graphql/v1`,
		headers: {
			apiKey:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impoa3NjZGZmbmZ4ZHF4aG91emtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxODEyMjUsImV4cCI6MTk5OTc1NzIyNX0.rB8_2SVlWj4_PAq1ZJa0OJB0TICCrW3A7K8qJP7Hevg',
		},
	},
	plugins: {
		'houdini-svelte': {
			client: './src/client.ts',
		},
	},
	scalars: {
		BigInt: {
			type: 'number',
		},
		UUID: {
			type: 'string',
		},
		Date: {
			type: 'Date',
		},
		Cursor: {
			type: 'Cursor',
		},
	},
};

export default config;
