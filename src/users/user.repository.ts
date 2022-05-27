import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(
        createUserDto: CreateUserDto
    ): Promise<User> {
        const { name, email, phone, password } = createUserDto;

        const user = this.create();
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.salt = await bcrypt.genSalt();
        user.password =await this.hashPassword(password, user.salt)
        try {
            await user.save()
            delete user.password;
            delete user.salt;
            return user;
        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException('Email already exists, try another!')
            } else {
                throw new InternalServerErrorException(
                  'Erro ao salvar o usuário no banco de dados',
                )
            }
        }
    }
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }
}