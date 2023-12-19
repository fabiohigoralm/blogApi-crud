import { AuthDto } from './dto/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
    private userService: UserService
  ) { }

  async signIn(authDto: AuthDto) {
    const user = await this.userService.signIn(authDto.email).then((user) => {
      return user ? user : (() => {
        throw new Error();
      })();
    }).then((user) => {
      return user.password == authDto.password ? user : (() => {
        throw new Error();
      })()
    }).catch((err) => {
      throw new UnauthorizedException();
    });

    const payload = { id: user.id, email: user.email, name: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async checkToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token.replace("Bearer ", ""));
      return decoded;
    } catch (err) {
      return false;
    }
  }

}
