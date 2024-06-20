import { browser, dev } from '$app/environment';

export async function enableMocking() {
	// Clientside mocking
	if (dev && browser) {
		const { worker } = await import('./browser');
		return worker.start();
	}

	// Serverside mocking
	if (dev && !browser) {
		const { server } = await import('./server');
		return server.listen();
	}
}
