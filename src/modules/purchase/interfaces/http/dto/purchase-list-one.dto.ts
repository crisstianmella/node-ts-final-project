import { PurchaseProperties } from './../../../domain/purchase'
import { DTO } from './dto-interface'

export interface PurchaseOneDTO {
   guid: string
   customerId: string
   paymentMethod: string
   status: string
   active: boolean
}

export type PurchaseListOneDTO = PurchaseOneDTO

export class PurchaseListOneMapping extends DTO<PurchaseProperties, PurchaseListOneDTO> {
   execute(data: PurchaseProperties): PurchaseListOneDTO {
      return {
         guid: data.guid,
         customerId: data.customerId,
         paymentMethod: data.paymentMethod,
         status: data.status,
         active: data.active,
      }
   }
}
