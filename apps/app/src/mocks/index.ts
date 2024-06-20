import { browser, dev } from '$app/environment';

export async function inject() {
	// const { worker } = await import('./browser');
	// return worker.start();

	if (dev && !browser) {
		const { server } = await import('./server');
		return server.listen();
	}
}
