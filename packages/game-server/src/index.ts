import 'dotenv/config';
import WebSocket from 'ws';

const PORT = parseInt(process.env.GAME_SERVER_PORT || '2000');

const wss = new WebSocket.Server({ port: PORT });

console.log(`✅ Game Server running on port ${PORT}`);

wss.on('connection', (ws) => {
  console.log('Player connected to game server');

  ws.on('message', (data) => {
    console.log('Game message:', data);
    ws.send(JSON.stringify({ type: 'snapshot', players: [] }));
  });

  ws.on('close', () => {
    console.log('Player disconnected');
  });
});
