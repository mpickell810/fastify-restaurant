import app from './app.js';

const port = process.env.PORT || 3000;

try {
await app.listen({ host: '0.0.0.0', port });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}