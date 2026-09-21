import app, { initDbPromise } from '../server.js';

export default async function handler(req, res) {
  try {
    await initDbPromise;
  } catch (err) {
    console.error('Error initializing DB:', err);
  }
  return app(req, res);
}
