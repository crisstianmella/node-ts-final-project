import Customer from '../domain/customer'
import { CustomerUpdate } from '../domain/interfaces/customerUpdate.interface'
import { CustomerRepository } from '../domain/customer.repository'
//import { EmailVO } from '../domain/value-objects/email.vo'
import { CustomerEntity } from './customer.entity'
import DataBaseBootstrap from '../../../bootstrap/database.bootstrap'
import { err, ok, Result } from 'neverthrow'
import { CustomerNotFoundException } from '../domain/exceptions/customer.exception'

// Implementacion del Design Pattern: FACADE
// Principio SOLID: Liskov Sustitution ->Hereda la Facade de UserRepository y luego se implementa.
export default class CustomerInfrastructure implements CustomerRepository {
   async insert(customer: Customer): Promise<Customer> {
      const customerInsert = new CustomerEntity()

      const { guid, address, dni, userId, active } = customer.properties()
      Object.assign(customerInsert, {
         guid,
         address,
         dni,
         userId,
         active,
      })

      await DataBaseBootstrap.dataSource.getRepository(CustomerEntity).save(customerInsert)
      return customer
   }

   async list(): Promise<Customer[]> {
      console.log(CustomerEntity)
      const repo = DataBaseBootstrap.dataSource.getRepository(CustomerEntity)

      const result = await repo.find({ where: { active: true } })
      return result.map((el: CustomerEntity) => {
         return new Customer({
            guid: el.guid,
            address: el.address,
            dni: el.dni,
            userId: el.userId,
            active: el.active,
         })
      })
   }

   async listOne(guid: string): Promise<Result<Customer, CustomerNotFoundException>> {
      const repo = DataBaseBootstrap.dataSource.getRepository(CustomerEntity)

      const result = await repo.findOne({ where: { guid } })

      if (!result) {
         return err(new CustomerNotFoundException())
      } else {
         return ok(
            new Customer({
               guid: result.guid,
               address: result.address,
               dni: result.dni,
               userId: result.userId,
               active: result.active,
            }),
         )
      }
   }

   async update(guid: string, customer: Partial<CustomerUpdate>): Promise<Result<Customer, CustomerNotFoundException>> {
      const repo = DataBaseBootstrap.dataSource.getRepository(CustomerEntity)

      const customerFound = await repo.findOne({
         where: { guid },
      })

      if (customerFound) {
         Object.assign(customerFound, customer)
         const customerEntity = await repo.save(customerFound)

         return ok(
            new Customer({
               guid: customerEntity.guid,
               address: customerEntity.address,
               dni: customerEntity.dni,
               userId: customerEntity.userId,
               active: customerEntity.active,
            }),
         )
      } else {
         return err(new CustomerNotFoundException())
      }
   }

   async delete(guid: string): Promise<Result<Customer, CustomerNotFoundException>> {
      const repo = DataBaseBootstrap.dataSource.getRepository(CustomerEntity)

      const customerFound = await repo.findOne({
         where: { guid },
      })

      if (customerFound) {
         customerFound.active = false
         const customerEntity = await repo.save(customerFound)

         return ok(
            new Customer({
               guid: customerEntity.guid,
               address: customerEntity.address,
               dni: customerEntity.dni,
               userId: customerEntity.userId,
               active: customerEntity.active,
            }),
         )
      } else {
         return err(new CustomerNotFoundException())
      }
   }
}
