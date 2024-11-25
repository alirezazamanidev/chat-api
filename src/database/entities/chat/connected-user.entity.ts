import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { Base } from '../base.entity';
import { User } from '../user/user.entity';
@Entity()
export class ConnectedUser extends Base {
  @Column()
  userId: string;
  @Column()
  socketId: string;
  @ManyToOne(() => User, (user) => user.connectedUsers, { onDelete: 'CASCADE' })
  user: User;
  @CreateDateColumn()
  time_connected: Date;
}
