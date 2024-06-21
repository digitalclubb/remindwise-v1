import { PUBLIC_ENABLE_MOCKING } from '$env/static/public';

// Serverside mocking
if (PUBLIC_ENABLE_MOCKING === 'true') {
	const { server } = await import('$mocks/server');
	server.listen({ onUnhandledRequest: 'bypass' });
}
