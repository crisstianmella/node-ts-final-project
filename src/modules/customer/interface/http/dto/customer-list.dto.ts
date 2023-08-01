import { CustomerProperties } from '../../../domain/customer'
import { DTO } from './dto-interface'

interface CustomerDTO {
   guid: string
   address: string
   dni: string
   userId: string
}

export type CustomerListDTO = CustomerDTO[]

export class CustomerListMapping extends DTO<CustomerProperties[], CustomerListDTO> {
   execute(data: CustomerProperties[]): CustomerListDTO {
      return data.map((customer: CustomerProperties) => {
         return {
            guid: customer.guid,
            address: customer.address,
            dni: customer.dni,
            userId: customer.userId,
         }
      })
   }
}
