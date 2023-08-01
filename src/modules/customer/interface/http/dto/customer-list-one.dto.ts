import { CustomerProperties } from '../../../domain/customer'
import { DTO } from './dto-interface'

interface CustomerDTO {
   guid: string
   address: string
   dni: string
   userId: string
}

export type CustomerListOneDTO = CustomerDTO

export class CustomerListOneMapping extends DTO<CustomerProperties, CustomerListOneDTO> {
   execute(data: CustomerProperties): CustomerListOneDTO {
      return {
         guid: data.guid,
         address: data.address,
         dni: data.dni,
         userId: data.userId,
      }
   }
}
