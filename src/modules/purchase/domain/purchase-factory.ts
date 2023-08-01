import { v4 as uuidv4 } from 'uuid'
import Purchase, { PurchaseProperties } from './purchase'
import {
   PurchaseCustomerIdInvalidException,
   PurchaseCustomerIdRequiredException,
   PurchasePaymentMethodInvalidException,
   PurchasePaymentMethodRequiredException,
} from './exceptions/purchase.exception'
import { Result, err, ok } from 'neverthrow'

export type PurchaseResult = Result<
   Purchase,
   | PurchaseCustomerIdInvalidException
   | PurchaseCustomerIdRequiredException
   | PurchasePaymentMethodInvalidException
   | PurchasePaymentMethodRequiredException
>

//Design Pattern: Abstract Factory
export default class PurchaseFactory {
   async create(customerId: string, paymentMethod: string): Promise<PurchaseResult> {
      if (!customerId || customerId.trim() === '') {
         return err(new PurchaseCustomerIdRequiredException())
      }

      if (customerId.length < 10) {
         return err(new PurchaseCustomerIdInvalidException())
      }

      if (!paymentMethod || paymentMethod.trim() === '') {
         return err(new PurchasePaymentMethodRequiredException())
      }

      if (paymentMethod.length < 5) {
         return err(new PurchasePaymentMethodInvalidException())
      }

      //Design Pattern: Factory Method

      const purchaseProperties: PurchaseProperties = {
         customerId,
         paymentMethod,
         guid: uuidv4(),
      }

      const purchase = new Purchase(purchaseProperties)
      return ok(purchase)
   }
}
