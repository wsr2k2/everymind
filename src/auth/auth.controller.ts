import { Body, Controller, Get, Post, Req, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { GetUser } from './get-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signin')
    async signIn(
        @Body() loginUserDto: LoginUserDto,
    ): Promise<{ token: string }> {
        return await this.authService.signIn(loginUserDto)
    }

    @ApiBearerAuth()
    @Get('/logged')
    @UseGuards(AuthGuard())
    getMe(@GetUser() user: User): User {
        return user
    }
}
