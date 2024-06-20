import { dev } from '$app/environment';

// Serverside mocking
if (dev) {
	const { server } = await import('$mocks/server');
	server.listen({ onUnhandledRequest: 'bypass' });
}
