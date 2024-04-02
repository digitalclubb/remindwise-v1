/** @type {import('houdini').ConfigFile} */
const config = {
	plugins: {
		'houdini-svelte': {
			client: './src/client.ts',
		},
	},
	scalars: {
		BigInt: {
			type: 'int',
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
