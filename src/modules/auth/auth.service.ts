import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/auth.dto';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    let { username, password } = dto;

    let user = await this.userRepo.findOneBy({ username });

    if (!user) {
      user = this.userRepo.create({
        hashedPassword: hashSync(password, 10),
        username,
      });
      user = await this.userRepo.save(user);
    }
    if (user && !compareSync(password, user.hashedPassword))
      throw new UnauthorizedException(
        'username or password has been incorect!',
      );
    
      let token = this.createJwtToken(user.id);
      return {
        message: 'loggedIn successFully!',
        token
      };
    }
  

   createJwtToken(userId: string) {
    try {
      return this.jwtService.sign(
        { userId },
        { secret: process.env.SECRET_JWT_KEY,expiresIn:'7d' },
        
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
