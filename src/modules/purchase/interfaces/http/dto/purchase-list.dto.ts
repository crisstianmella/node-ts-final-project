import { PurchaseProperties } from './../../../domain/purchase'
import { DTO } from './dto-interface'

export interface PurchaseDTO {
   guid: string
   customerId: string
   paymentMethod: string
   status: string
   active: boolean
}

export type PurchaseListDTO = PurchaseDTO[]

export class PurchaseListMapping extends DTO<PurchaseProperties[], PurchaseListDTO> {
   execute(data: PurchaseProperties[]): PurchaseListDTO {
      return data.map((purchase: PurchaseProperties) => {
         return {
            guid: purchase.guid,
            customerId: purchase.customerId,
            paymentMethod: purchase.paymentMethod,
            status: purchase.status,
            active: purchase.active,
         }
      })
   }
}
