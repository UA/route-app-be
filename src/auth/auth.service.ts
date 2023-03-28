import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../db/entities/user.entity';
import { LoginInputDto } from './dto/login-input.dto';
import { LoginOutputDto } from './dto/login-output-dto';
import { SignupInputDto } from './dto/signup-input.dto';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  
  async signUp(signupInputDto: SignupInputDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(signupInputDto.password, salt);
    signupInputDto.password = hashedPassword;
    await this.userModel.create(signupInputDto)
  }

  login = async (loginInputDto: LoginInputDto): Promise<LoginOutputDto> => {
    const { email, password } = loginInputDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (isPasswordMatched) {
      const token = await this.jwtService.signAsync({ id: user.id });       
        return {
          id: user.id,
          firstName: user.firstName, 
          lastName: user.lastName, 
          email: user.email, 
          role:user.role,
          token: token
        };
    }else {
        throw new UnauthorizedException('Invalid email or password');
    }
  };

  async validateUser(payload: JwtPayload) {
    const { id } = payload;
    return await this.userModel.findById(id);
  }
  
}
