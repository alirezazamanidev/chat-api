import { Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Base } from '../base.entity';
import { User } from '../user/user.entity';

export class ConnectedUser extends Base {
  @Column()
  userId: number;
  @Column()
  socketId: number;
  @ManyToOne(() => User, (user) => user.connectedUsers, { onDelete: 'CASCADE' })
  user: User;
  @CreateDateColumn()
  time_connected: Date;
}
