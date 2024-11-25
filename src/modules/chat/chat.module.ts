import { Module } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { ChatGateway } from './gateway/chat.gateway';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/database/entities/chat/room.entity';
import { ConnectedUser } from 'src/database/entities/chat/connected-user.entity';
import { Message } from 'src/database/entities/chat/message.entity';
import { ConnectedUserService } from './services/connected-user.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Room, ConnectedUser, Message]),
  ],
  providers: [ChatGateway, ChatService,ConnectedUserService],
})
export class ChatModule {}
