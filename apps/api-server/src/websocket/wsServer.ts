import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';

let wss: WebSocketServer;

export const initWebSocket = (server: Server): void => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    console.log('🔌 WebSocket client connected');

    ws.on('close', () => console.log('🔌 WebSocket client disconnected'));
    ws.on('error', (err) => console.error('WebSocket error:', err));
  });

  console.log('WebSocket server initialized');
};

export const broadcastAssignmentUpdate = (
  assignmentId: string,
  payload: Record<string, any>
): void => {
  if (!wss) return;

  const message = JSON.stringify({ assignmentId, ...payload });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};