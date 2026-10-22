const test = require('node:test');
const assert = require('node:assert');
const server = require('./app');

let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      baseUrl = `http://127.0.0.1:${server.address().port}`;
      resolve();
    });
  });
});

test.after(() => {
  server.close();
});

test('GET / returns greeting', async () => {
  const res = await fetch(baseUrl + '/');
  assert.strictEqual(res.status, 200);
  const text = await res.text();
  assert.match(text, /Hello from the CI\/CD pipeline/);
});

test('GET /health returns ok', async () => {
  const res = await fetch(baseUrl + '/health');
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { status: 'ok' });
});

test('unknown route returns 404', async () => {
  const res = await fetch(baseUrl + '/nope');
  assert.strictEqual(res.status, 404);
});
