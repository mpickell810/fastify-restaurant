import app from './app.js';

try {
    const port = process.env.PORT || 3000;
    await app.listen({ host: '0.0.0.0', port });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}