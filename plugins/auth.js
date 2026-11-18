import fp from 'fastify-plugin';

async function authPlugin (app, opts) {
    app.decorateRequest('isChef', function () {
        return this.headers['x-api-key'] === opts.tokenValue;
    });
    app.decorate('authOnlyChef', async function (request, reply) {
        if (!request.isChef()) {
            reply.code(401);
            throw new Error('Invalid API key');
        }
    });
}

export default fp(authPlugin);