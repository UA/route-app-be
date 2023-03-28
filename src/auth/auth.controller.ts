import { Controller, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login-input.dto';
import { LoginOutputDto } from './dto/login-output-dto';
// import { SignupInputDto } from './dto/signup-input.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('/signup')
  // async signUp(@Body() signupInputDto: SignupInputDto): Promise<void> {
  //   return this.authService.signUp(signupInputDto);
  // }

  @Post('/login')
  login(@Body() loginInputDto: LoginInputDto): Promise<LoginOutputDto> {
    return this.authService.login(loginInputDto);
  }
}
