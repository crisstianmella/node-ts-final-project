import { CustomerProperties } from '../../../domain/customer'
import { DTO } from './dto-interface'

interface CustomerDTO {
   guid: string
   address: string
   dni: string
   userId: string
}

export type CustomerUpdateDTO = CustomerDTO

export class CustomerUpdateMapping extends DTO<CustomerProperties, CustomerUpdateDTO> {
   execute(data: CustomerProperties): CustomerUpdateDTO {
      return {
         guid: data.guid,
         address: data.address,
         dni: data.dni,
         userId: data.userId,
      }
   }
}
