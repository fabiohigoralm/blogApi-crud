import { Body, Controller, Headers, Request, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { Token } from './dto/token';

@ApiTags('Sign in')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiResponse({
    type: Token,
    status: 201,
    description: 'Created',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',

  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiOperation({ summary: 'Sign in' })
  @Public()
  @Post('sign-in')
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }
}
