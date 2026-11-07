import fp from 'fastify-plugin';

async function authPlugin (app, opts) {
    app.decorateRequest('isChef', function isChef () {
        return this.headers['x-api-key'] === 'fastify-rocks';
    });
    app.decorate('authOnlyChef', async function (request, reply) {
        if (!request.isChef()) {
            reply.code(401);
            throw new Error('Invalid API key');
        }
    app.addHook('onRoute', function hook (routeOptions) {
        if (routeOptions.config?.auth === true) {
            routeOptions.onRequest =
            [app.authOnlyChef].concat(RouteOptions.onRequest || []);
        }
    })
    });
}

export default fp(authPlugin);