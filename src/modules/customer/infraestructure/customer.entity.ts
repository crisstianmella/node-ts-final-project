import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'customer' })
export class CustomerEntity {
   @PrimaryColumn()
   guid: string

   @Column({ type: 'varchar', length: 100 })
   address: string

   @Column({ type: 'varchar', length: 100 })
   dni: string

   @Column({ type: 'varchar', length: 100 })
   userId: string

   @Column({ type: 'boolean', default: true })
   active: boolean
}
