import { Column, CreateDateColumn, Entity } from 'typeorm';
import { Base } from '../base.entity';

@Entity()
export class RoomParticipantsUser extends Base {
  @Column()
  userId: string;
  @Column()
  roomId: string;

  @CreateDateColumn()
  created_at:Date
}
