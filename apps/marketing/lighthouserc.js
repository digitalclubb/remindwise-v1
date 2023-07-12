export default {
	ci: {
		collect: {
			url: ['http://localhost:4173/'],
			startServerCommand: 'pnpm preview',
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
