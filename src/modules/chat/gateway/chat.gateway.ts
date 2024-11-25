import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { ChatService } from '../services/chat.service';
import { Server, Socket } from 'socket.io';
import { Logger, UnauthorizedException, UseFilters } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { ConnectedUserService } from '../services/connected-user.service';
import { WsExceptionFilter } from 'src/common/exceptions/ws-exception.filter';

@UseFilters(WsExceptionFilter)
@WebSocketGateway(6000, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway

  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(
    private readonly chatService: ChatService,
    private jwtService: JwtService,
    private userService: UserService,
    private connectedUserService: ConnectedUserService,
  ) {}
  private logger = new Logger(ChatGateway.name);
  @WebSocketServer() server: Server;
  afterInit(server: Server) {}
  async handleConnection(client: Socket) {
    try {
      const userPayload = this.authenticateSocket(client);
      await this.initializeUserConnection(userPayload, client);
      
    } catch (error) {
      this.handleConnectionError(client, error);
      
    }
  }
  private handleConnectionError(socket: Socket, error: Error): void {
    this.logger.error(
      `Connection error for socket ${socket.id}: ${error.message}`,
    );
    socket.emit('exception', 'Authentication error');
    socket.disconnect();
  }

  handleDisconnect(client: Socket) {}

  private async initializeUserConnection(
    userPayload: { userId: string },
    socket: Socket,
  ) {
    socket.data.user = await this.userService.getPayloadUser(
      userPayload.userId,
    );
    await this.connectedUserService.create(userPayload.userId,socket.id)
  }
  private authenticateSocket(socket: Socket) {
    let token = this.extractJwtToken(socket);
    return this.jwtService.verify(token, {
      secret: process.env.SECRET_JWT_KEY,
    });
  }
  private extractJwtToken(socket: Socket): string {
    const authHeader = socket.handshake.headers.authorization;
    if (!authHeader)
      throw new WsException('No authorization header found');

    const [bearer, token] = authHeader.split(' ');
    if (bearer.toLocaleLowerCase() !== 'bearer' || !token)
      throw new WsException('Invalid or missing token');

    return token;
  }
}
