import { CustomerProperties } from '../../../domain/customer'
import { DTO } from './dto-interface'

interface CustomerDTO {
   address: string
   dni: string
   userId: string
   guid: string
}

export type CustomerInsertOneDTO = CustomerDTO

export class CustomerInsertMapping extends DTO<CustomerProperties, CustomerInsertOneDTO> {
   execute(data: CustomerProperties): CustomerInsertOneDTO {
      return {
         address: data.address,
         dni: data.dni,
         userId: data.userId,
         guid: data.guid,
      }
   }
}
