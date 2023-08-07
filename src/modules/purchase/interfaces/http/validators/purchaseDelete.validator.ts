import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class PurchaseDeleteValidator {
   // Design Pattern: Decorator
   @IsString({ message: 'Guid must be a string' })
   @IsNotEmpty({ message: 'Guid must not be empty' })
   @MinLength(10, { message: 'Min Length must be greater than 10' })
   guid: string
}
