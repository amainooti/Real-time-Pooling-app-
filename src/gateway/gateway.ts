import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class Mygateway {
  @SubscribeMessage('newMessage')
  onMessage(@MessageBody() body: any) {
    console.log(body);
  }
}
