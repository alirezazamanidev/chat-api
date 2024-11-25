import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "../base.entity";
import { Room } from "./room.entity";
import { User } from "../user/user.entity";
@Entity()
export class Message extends Base {
    @Column()
    roomId: string;
  
    @Column()
    text: string;
  
    @ManyToOne(() => Room, (roomEntity) => roomEntity.messages)
    room: Room;
  
    @Column()
    senderId: string;
    @ManyToOne(() => User, (user) => user.messages)
    @JoinColumn([{ name: 'senderId', referencedColumnName: 'id' }])
    sendere: User;
}