import { PurchaseProperties } from './../../../domain/purchase'
import { DTO } from './dto-interface'

export interface PurchaseDTO {
   guid: string
   customerId: string
   paymentMethod: string
   status: string
   active: boolean
}

export type PurchaseInsertOneDTO = PurchaseDTO

export class PurchaseInsertMapping extends DTO<PurchaseProperties, PurchaseInsertOneDTO> {
   execute(data: PurchaseProperties): PurchaseInsertOneDTO {
      return {
         guid: data.guid,
         customerId: data.customerId,
         paymentMethod: data.paymentMethod,
         status: data.status,
         active: data.active,
      }
   }
}
