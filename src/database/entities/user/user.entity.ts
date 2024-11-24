import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from 'typeorm';
import { Base } from '../base.entity';
import { ConnectedUser } from '../chat/connected-user.entity';
import { Message } from '../chat/message.entity';

@Entity()
export class User extends Base {
  @Column({ unique: true })
  username: string;
  @Column()
  hashedPassword: string;
  @Column({ nullable: true })
  avatar: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(()=>ConnectedUser,cu=>cu.user)
  connectedUsers:ConnectedUser[]

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
