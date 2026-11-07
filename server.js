import app from './app.js';

const port = process.env.PORT || 3000;
await app.listen({ host: '0.0.0.0', port });
