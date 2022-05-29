import { Body, Controller, Get, Post, Req, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { GetUser } from './get-user.decorator';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) loginUserDto: LoginUserDto,
    ): Promise<{ token: string }> {
        return await this.authService.signIn(loginUserDto)
    }

    @Get('/logged')
    @UseGuards(AuthGuard())
    getMe(@GetUser() user: User): User {
        return user
    }
}
