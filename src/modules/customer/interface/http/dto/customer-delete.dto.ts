import { CustomerProperties } from '../../../domain/customer'
import { DTO } from './dto-interface'

interface CustomerDTO {
   guid: string
   address: string
   dni: string
   userId: string
}

export type CustomerDeleteDTO = CustomerDTO

export class CustomerDeleteMapping extends DTO<CustomerProperties, CustomerDeleteDTO> {
   execute(data: CustomerProperties): CustomerDeleteDTO {
      return {
         guid: data.guid,
         address: data.address,
         dni: data.dni,
         userId: data.userId,
      }
   }
}
