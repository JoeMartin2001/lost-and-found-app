import {io} from 'socket.io-client';
import {baseUrl} from '../config/baseUrl';

export const socketIO = io(baseUrl, {
  transports: ['websocket'],
  upgrade: false,
});

socketIO.on('connect', () => console.log('Connected to socket.io!'));
