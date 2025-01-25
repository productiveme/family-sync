const config = Object.freeze({
  port: process.env.VITE_PORT_GQL || 3002,
  cors: {
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['POST', 'GET', 'OPTIONS']
  }
});

export default config;
