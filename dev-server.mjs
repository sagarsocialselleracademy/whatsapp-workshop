import { createServer } from 'vite';

async function start() {
  const server = await createServer({
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
    },
  });
  await server.listen();
  server.printUrls();
  // Keep process alive indefinitely even when stdin is closed
  setInterval(() => {}, 1 << 30);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
