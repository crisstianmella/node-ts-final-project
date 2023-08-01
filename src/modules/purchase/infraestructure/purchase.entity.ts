import { Column, Entity, PrimaryColumn } from 'typeorm'
import { StatusPurchare } from '../domain/enums/purchaseStatus.enum'

@Entity({ name: 'purchase' })
export class PurchaseEntity {
   @PrimaryColumn()
   guid: string

   @Column()
   customerId: string

   @Column()
   paymentMethod: string

   @Column({ type: 'enum', enum: StatusPurchare })
   status: StatusPurchare

   @Column()
   active: boolean
}
