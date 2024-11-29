import { UserRepository } from './UserProduct/repositories/userRepository';
import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { PrismaUserRepository } from './UserProduct/repositories/Prisma/prismaUserRepository';
import { UserController } from './UserProduct/Controllers/user.controller';

@Module({
  imports: [],
  controllers: [ UserController], 
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AppModule {}
