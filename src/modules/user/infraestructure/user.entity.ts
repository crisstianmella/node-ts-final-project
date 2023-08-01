import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'users' })
export class UserEntity {
   @PrimaryColumn()
   guid: string

   @Column({ type: 'varchar', length: 100 })
   name: string

   @Column({ type: 'varchar', length: 100 })
   lastname: string

   @Column({ type: 'varchar', length: 100 })
   email: string

   @Column({ type: 'varchar', length: 100 })
   password: string

   @Column({ type: 'varchar', length: 100 })
   city: string

   @Column({ type: 'varchar', length: 100 })
   province: string

   @Column({ type: 'varchar', length: 100 })
   refreshToken: string

   @Column({ type: 'boolean', default: true })
   active: boolean
}
