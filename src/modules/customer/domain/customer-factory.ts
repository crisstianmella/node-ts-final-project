import { v4 as uuidv4 } from 'uuid'
import Customer, { CustomerProperties } from './customer'
import {
   CustomerAddressRequiredException,
   CustomerDniRequiredException,
   CustomerUserIdRequiredException,
} from './exceptions/customer.exception'
import { Result, err, ok } from 'neverthrow'

export type CustomerResult = Result<
   Customer,
   CustomerUserIdRequiredException | CustomerAddressRequiredException | CustomerDniRequiredException
>

//Design Pattern: Abstract Factory
export default class CustomerFactory {
   async create(address: string, dni: string, userId: string): Promise<CustomerResult> {
      if (!userId || userId.trim() === '') {
         return err(new CustomerUserIdRequiredException())
      }

      if (!address || address.trim() === '') {
         return err(new CustomerAddressRequiredException())
      }

      if (!dni || dni.trim() === '') {
         return err(new CustomerDniRequiredException())
      }

      //Design Pattern: Factory Method
      const customerProperties: CustomerProperties = {
         address,
         dni,
         userId,
         guid: uuidv4(),
      }

      const customer = new Customer(customerProperties)
      return ok(customer)
   }
}
