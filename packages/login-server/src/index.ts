import 'dotenv/config';
import WebSocket from 'ws';

const PORT = parseInt(process.env.LOGIN_SERVER_PORT || '28000');

const wss = new WebSocket.Server({ port: PORT });

console.log(`✅ Login Server running on port ${PORT}`);

wss.on('connection', (ws) => {
  console.log('Client connected to login server');

  ws.on('message', (data) => {
    console.log('Received:', data);
    ws.send(JSON.stringify({ status: 'ok' }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
