import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { Base } from '../base.entity';

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
}
