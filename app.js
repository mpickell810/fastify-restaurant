import Fastify from 'fastify';
import authPlugin from './plugins/auth.js';
import datasourcePlugin from './plugins/datasource.js';
import recipesPlugin from './routes/recipes.js';
import ordersPlugin from './routes/orders.js';

const serverOptions = {
    logger: true
};

const app = Fastify(serverOptions);

app.addHook('onReady', async function hook () {
    this.log.info(`onReady runs from file ${import.meta.url}`);
});
app.addHook('onClose', function hook (app, done) {
    app.log.info(`onClose runs from file ${import.meta.url}`);
    done();
});

app.get('/', async function homeHandler () {
    return {
        api: 'fastify-restuarant-api',
        version: 1
    };
});

app.register(authPlugin);
app.register(datasourcePlugin);
app.register(recipesPlugin);
app.register(ordersPlugin);

export default app;
export { serverOptions as options };