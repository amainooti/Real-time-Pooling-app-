import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

// anotate it with websocketgateway
@WebSocketGateway()
// onmoduleinit for when an instance is created
export class Mygateway implements OnModuleInit {
  @WebSocketServer()
  // allows us get the connection instance
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('newMessage')
  onMessage(@MessageBody() body: any) {
    console.log(body);

    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }
}
