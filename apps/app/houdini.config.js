/** @type {import('houdini').ConfigFile} */
const config = {
	plugins: {
		'houdini-svelte': {
			client: './src/client.ts',
		},
	},
	scalars: {
		BigInt: {
			type: Number,
		},
		UUID: {
			type: String,
		},
		Date: {
			type: Date,
		},
	},
};

export default config;
