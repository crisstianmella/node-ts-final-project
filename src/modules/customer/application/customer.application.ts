import { CustomerUpdate } from '../domain/interfaces/customerUpdate.interface'
import Customer from '../domain/customer'
import { CustomerRepository } from '../domain/customer.repository'

export default class CustomerApplication {
   // Principio SOLID: Dependency inversion
   // Design Pattern: Dependency Injection
   constructor(private readonly customerRepository: CustomerRepository) {}

   insert(customer: Customer) {
      return this.customerRepository.insert(customer)
   }

   list() {
      return this.customerRepository.list()
   }

   listOne(guid: string) {
      return this.customerRepository.listOne(guid)
   }

   update(guid: string, customer: Partial<CustomerUpdate>) {
      return this.customerRepository.update(guid, customer)
   }

   delete(guid: string) {
      return this.customerRepository.delete(guid)
   }
}
