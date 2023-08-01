import { Result } from 'neverthrow'
import { CustomerNotFoundException } from './exceptions/customer.exception'
import Customer from './customer'
import { CustomerUpdate } from './interfaces/customerUpdate.interface'

// Principio Solid: Inversion Dependency
// Design Pattern: Facade
export interface CustomerRepository {
   insert(customer: Customer): Promise<Customer>
   list(): Promise<Customer[]>
   listOne(guid: string): Promise<Result<Customer, CustomerNotFoundException>>
   update(guid: string, user: Partial<CustomerUpdate>): Promise<Result<Customer, CustomerNotFoundException>>
   delete(guid: string): Promise<Result<Customer, CustomerNotFoundException>>
}
