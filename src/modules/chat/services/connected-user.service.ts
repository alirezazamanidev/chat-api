import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { ConnectedUser } from 'src/database/entities/chat/connected-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectedUserService {
  private logger = new Logger(ConnectedUserService.name);
  constructor(
    @InjectRepository(ConnectedUser)
    private connectedUserRepo: Repository<ConnectedUser>,
  ) {}

  async create(userId: string, socketId: string) {
    try {
        await this.connectedUserRepo.insert({
            userId,socketId
        })
    } catch (ex) {
      this.logger.error(
        `Failed to create a connected user for userId: ${userId}`,
        ex.stack,
      );
      throw new WsException('Error creating new user connection.');
    }
  }
}
