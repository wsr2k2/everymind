import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserRepository } from 'src/users/user.repository';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signIn(loginUserDto: LoginUserDto) {
        const user = await this.userRepository.loginUser(loginUserDto);

        if (user === null) {
            throw new UnauthorizedException('Email or password is not correct')
        }

        const jwtPayload = {
            id: user.id,
        }
        const token = await this.jwtService.sign(jwtPayload);

        return { token }
    }
}
