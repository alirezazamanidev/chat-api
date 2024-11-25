import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Base } from '../base.entity';
import { TypeRoomEnum } from 'src/modules/chat/enums/type.enum';
import { Message } from './message.entity';
import { User } from '../user/user.entity';
@Entity()
export class Room extends Base {
  @Column({ type: 'enum', enum: TypeRoomEnum })
  type: string;
  @Column()
  ownerId: string;
  @Column()
  name: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.rooms)
  @JoinTable({
    name: 'roomParticipantsUser',
    joinColumn: {
      name: 'roomId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  participants: User[];
}
