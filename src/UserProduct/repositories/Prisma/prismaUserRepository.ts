import { Injectable } from '@nestjs/common';
import { UserRepository } from '../userRepository';
import { PrismaService } from 'src/database/prisma.service';
import { Cart, Product } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  private readonly saltRounds = 10;
  // PrismaUserRepository
async create(
  name: string,
  email: string,
  password: string,
  products: Product[] = [],
  cart: Cart[] = []
): Promise<any> { // Alterando o tipo de retorno para algo genérico
  const hashedPassword = await bcrypt.hash(password, this.saltRounds);
  
  const user = await this.prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      products: {
        connect: products.map((product) => ({
          id: product.id,
        })),
      },
      cart: {
        create: cart.map((cartItem) => ({
          id: cartItem.id,
        })),
      },
    },
    select: { 
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });

  return user;
}
}