async function ordersPlugin (app, ots) {
    async function notImplemented (request, reply) {
        throw new Error('Not implemented');
    }
    app.post('/orders', { handler: notImplemented });
    app.get('/orders', { handler: notImplemented });
    app.patch('/orders/:ordersId', {
        config: { auth: true }, 
        handler: notImplemented
    });
}
export default ordersPlugin;