import { test } from 'node:test';
import { strictEqual, deepStrictEqual, ok } from 'node:assert';
import { buildApplication } from './helper.js';

test('GET /', async function (t) {
    const app = await buildApplication();
    t.after(async function () {
        await app.close();
    });
    const response = await app.inject({
        method: 'GET',
        url: '/'
    });
    strictEqual(response.statusCode, 200);
    deepStrictEqual(response.json(), {
        api: 'fastify-restaurant-api',
        version: 1
    });
});