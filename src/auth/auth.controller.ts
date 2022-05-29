import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) loginUserDto: LoginUserDto,
    ): Promise<{ token: string }> {
        return await this.authService.signIn(loginUserDto)
    }
}
