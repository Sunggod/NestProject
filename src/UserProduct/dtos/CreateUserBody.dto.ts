import { IsString, IsNotEmpty, Length, IsArray, IsOptional, IsHash } from "class-validator";
import { messagesValidation } from "../constants/userMessageValidationConstants";
import { Cart, Product } from "@prisma/client";
import { IsBcryptHash } from "./registerDecorator/passwordIsBcryptHash";

export class CreateUserBody {
  @IsString({ message: messagesValidation.name.messageString })
  @IsNotEmpty({ message: messagesValidation.name.messageEmpty })
  @Length(3, 12, { message: messagesValidation.name.messageLength })
  name: string;

  @IsString({ message: messagesValidation.email.messageString })
  @IsNotEmpty({ message: messagesValidation.email.messageEmpty })
  @Length(10, 60, { message: messagesValidation.email.messageLength })
  email: string;
  @IsBcryptHash({
    message: messagesValidation.password.messageHashBcrypt,
  })
  @IsString({ message: messagesValidation.password.messageString })
  @IsNotEmpty({ message: messagesValidation.password.messageEmpty })
  @Length(3, 12, { message: messagesValidation.password.messageLength })
  password: string;

  @IsOptional()
  @IsArray({
    message:messagesValidation.products.messageArray
  })
  products: Product[];

  @IsOptional()
  @IsArray({
    message:messagesValidation.cart.messageArray
  })
  cart:Cart[]
}
