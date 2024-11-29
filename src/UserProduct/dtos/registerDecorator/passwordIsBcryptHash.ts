import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import * as bcrypt from 'bcrypt';

// Validador customizado para verificar se o campo é um hash de senha bcrypt válido
export function IsBcryptHash(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsBcryptHash',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          return bcrypt.getRounds(value) > 0; 
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid bcrypt hash`;
        },
      },
    });
  };
}
