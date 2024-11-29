import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../Controllers/user.controller';
import { PrismaService } from '../../database/prisma.service';
import { PrismaUserRepository } from '../repositories/Prisma/prismaUserRepository';
import { UserRepository } from '../repositories/userRepository';
import { CreateUserBody } from '../dtos/CreateUserBody.dto';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

describe('UserController', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  // Variável para armazenar o ID do usuário criado durante o teste
  let createdUserId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        PrismaService,
        {
          provide: UserRepository,
          useClass: PrismaUserRepository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    prismaService = module.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    // Limpeza de dados após todos os testes
    if (createdUserId) {
      await prismaService.user.delete({
        where: { id: createdUserId },
      });
    }
    await prismaService.$disconnect();
    await app.close();
  });

  it('should create a user with a hashed password', async () => {
    const password = 'testPassword';

    const createUserDto: CreateUserBody = {
      name: 'John Doe',
      email: randomBytes(256).toString(),
      password: password,
      products: [],
      cart: [],
    };

    // Realizar a requisição POST para criar o usuário
    const response = await request(app.getHttpServer())
      .post('/user')
      .send(createUserDto)
      .expect(201);

    // Verifique o que foi retornado pela API
    console.log(response.body); // Para depurar e ver a estrutura da resposta

    createdUserId = response.body.id; // Armazenar o ID do usuário criado

    // Verificar se o usuário foi criado e a senha foi devidamente criptografada
    expect(response.body).toHaveProperty('name', createUserDto.name);
    expect(response.body).toHaveProperty('email', createUserDto.email);
    expect(response.body.password).not.toBe(createUserDto.password);
    expect(await bcrypt.compare(createUserDto.password, response.body.password)).toBe(true);
  });

});
