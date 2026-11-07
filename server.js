import app from './app.js';
import appPlugin, { options } from './app.js';

const app = Fastify({
    logger: true
});

await app.register(appPlugin, opts);

try {
    const port = process.env.PORT || 3000;
    await app.listen({ host: '0.0.0.0', port });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}