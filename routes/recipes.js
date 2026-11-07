function recipesPlugin (app, opts, next) {
    app.get('/menu', { handler: menuHandler });
    app.get('/recipes', { handler: menuHandler });
    
    app.register(async function protectRoutesPlugin (app, opts) {
        app.addHook('onRequest', async function (request, reply) {
            if (reply.context.config.auth) {
                await app.authOnlyChef(request, reply);
            }
        });
            
        app.post('/recipes', {
            config: { auth: true },
            handler: async function addToMenu (request, reply) {
                const { name, country, description, order, price } = request.body;
                const newPlateId = await app.source.insertRecipe({
                    name,
                    country,
                    description,
                    order,
                    price,
                    createAt: new Date()
                });
            reply.code(201);
            return { id: newPlateId };
            }
        });
        app.delete('/recipes/:id', {
            config: { auth: true },
            handler: function removeFromMenu (request, reply) {
                reply.send(new Error('Not implemented'));
            }
    });
next();
});

async function menuHandler (request, reply) {
    this.log.info('Logging GET /menu from this');
    request.log.info('Logging GET /menu from request');
    throw new Error('Not implemented');
}
}
export default recipesPlugin;