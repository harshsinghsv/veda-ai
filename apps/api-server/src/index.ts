import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { connectDB } from './config/db';
import assignmentRoutes from './routes/assignments';
import { initWebSocket } from './websocket/wsServer';

// Start worker (import registers it)
import './queues/assignmentWorker';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.use('/api/assignments', assignmentRoutes);

// Create HTTP server (needed to share with WebSocket)
const server = http.createServer(app);
initWebSocket(server);

// Boot sequence
const start = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
};

start();