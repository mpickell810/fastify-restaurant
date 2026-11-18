import Fastify from 'fastify';
import authPlugin from './plugins/auth.js';
import datasourcePlugin from './plugins/datasource.js';
import recipesPlugin from './routes/recipes.js';
import ordersPlugin from './routes/orders.js';
import configPlugin from './plugins/config.js';

const serverOptions = {
    logger: true,
    ajv: {
        customOptions: {
            allErrors: true
        }
    }
};

async function appPlugin (app, opts) {
    app.addHook('onReady', async function hook () {
        this.log.info(`onReady runs from file ${import.meta.url}`);
    });
    app.addHook('onClose', function hook (app, done) {
        app.log.info(`onClose runs from file ${import.meta.url}`);
        done();
    });

    app.get('/', async function homeHandler () {
        return {
            api: 'fastify-restaurant-api',
            version: 1
        };
    });

    await app.register(configPlugin, opts);
    app.register(datasourcePlugin, { databaseUrl: app.appConfig.DATABASE_URL });
    app.register(authPlugin, { tokenValue: app.appConfig.API_KEY });

    app.register(recipesPlugin);
    app.register(ordersPlugin);
}

export default appPlugin;
export { serverOptions as options };