import { Controller, Post, Body } from '@nestjs/common';
import { UserRepository } from '../repositories/userRepository';
import { CreateUserBody } from '../dtos/CreateUserBody.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() user: CreateUserBody) {
    const newUser = await this.userRepository.create(
      user.name,
      user.email,
      user.password,
      user.products,
      user.cart
    );
    return newUser; // Retorna o usuário criado
  }
}
