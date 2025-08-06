import io from 'socket.io-client';
import { baseUrl } from '../config';
export const client = io.connect(baseUrl);
