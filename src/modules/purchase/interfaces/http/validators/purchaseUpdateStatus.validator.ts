import { IsString, IsNotEmpty } from 'class-validator'

export class PurchaseUpdateStatusValidator {
   // Design Pattern: Decorator
   @IsString({ message: 'Status must be a string' })
   @IsNotEmpty({ message: 'Status must not be empty' })
   status: string
}
