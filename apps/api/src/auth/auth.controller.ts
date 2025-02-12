import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  async signup(@Body() body: AuthDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login an existing user' })
  async login(@Body() body: AuthDto) {
    return this.authService.login(body.email, body.password);
  }
}
