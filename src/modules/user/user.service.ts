import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async getPayloadUser(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        created_at: true,
      },
    });
    if (!user) throw new NotFoundException('The user not founded!');
    return user;
  }
}
