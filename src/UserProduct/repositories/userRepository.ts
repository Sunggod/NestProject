import { Cart, Product } from "@prisma/client";

export abstract class UserRepository {
    abstract create(
      name: string,
      email: string,
      password: string,
      products: Product[], // Corrigido para aceitar um array
      cart: Cart[]
    ): Promise<void>; // Tipo de retorno ajustado para consistência
  }
  