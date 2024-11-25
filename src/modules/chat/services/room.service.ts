import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Room } from 'src/database/entities/chat/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  private logger = new Logger(RoomService.name);
  constructor(
    @InjectRepository(Room) private roomReposiotory: Repository<Room>,
  ) {}

  async findByUserId(userId: string) {
    try {
      const rooms = await this.roomReposiotory
        .createQueryBuilder('room')
        .innerJoin(
          'room.participants',
          'participant',
          'participants.id = :userId',
          { userId },
        )
        .leftJoinAndSelect('room.participants', 'allParticipants')

        .getMany();

        return rooms;
    } catch (error) {
      this.logger.error(
        `Failed to find rooms for user ID ${userId}: ${error.message}`,
        { userId, errorStack: error.stack },
      );
      throw new WsException(
        'An error occurred while retrieving user rooms. Please try again later.',
      );
    }
  }
}
