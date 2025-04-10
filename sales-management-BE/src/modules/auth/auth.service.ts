import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { LoginInput } from './dto/login.input';
import { User } from '../../entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(username: string, password: string){
    try {
      // Validate the user by checking the email and password
      const user = await this.userService.validateUser(username, password);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT tokens (access and refresh)
      const accessToken = this.generateToken(user);
      const refreshToken = this.generateRefreshToken(user);

      // Return response object
      return {
        success: true,
        message: 'Login successful',
        accessToken,
        refreshToken,
        user,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async validateToken(token: string): Promise<User> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findOne(payload.sub);
      return user;
    } catch (error) {
      return null;
    }
  }

  generateToken(user: User) {
    const payload = { 
      email: user.email, 
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(user: User): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, {
      expiresIn: '7d', // Set refresh token expiration time
    });
  }
}
