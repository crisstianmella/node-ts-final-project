import Purchase from '../domain/purchase'
import { PurchaseUpdate } from '../domain/interfaces/purchaseUpdate'
import { PurchaseRepository } from './../domain/purchase.repository'
import { PurchaseEntity } from './purchase.entity'
import DataBaseBootstrap from '../../../bootstrap/database.bootstrap'
import { err, ok, Result } from 'neverthrow'
import { PurchaseNotFoundException } from '../domain/exceptions/purchase.exception'

// Implementacion del Design Pattern: FACADE
// Principio SOLID: Liskov Sustitution ->Hereda la Facade de UserRepository y luego se implementa.
export default class PurchaseInfrastructure implements PurchaseRepository {
   async insert(purchase: Purchase): Promise<Purchase> {
      const purchaseInsert = new PurchaseEntity()

      const { guid, customerId, paymentMethod, status, active } = purchase.properties()
      Object.assign(purchaseInsert, {
         guid,
         customerId,
         paymentMethod,
         status,
         active,
      })

      await DataBaseBootstrap.dataSource.getRepository(PurchaseEntity).save(purchaseInsert)
      return purchase
   }

   async list(): Promise<Purchase[]> {
      console.log(PurchaseEntity)
      const repo = DataBaseBootstrap.dataSource.getRepository(PurchaseEntity)

      const result = await repo.find({ where: { active: true } })
      return result.map((el: PurchaseEntity) => {
         return new Purchase({
            guid: el.guid,
            customerId: el.customerId,
            paymentMethod: el.paymentMethod,
            status: el.status,
            active: el.active,
         })
      })
   }
   async listOne(guid: string): Promise<Result<Purchase, PurchaseNotFoundException>> {
      const repo = DataBaseBootstrap.dataSource.getRepository(PurchaseEntity)
      const result = await repo.findOne({ where: { guid } })

      if (!result) {
         return err(new PurchaseNotFoundException())
      } else {
         return ok(
            new Purchase({
               guid: result.guid,
               customerId: result.customerId,
               paymentMethod: result.paymentMethod,
               status: result.status,
               active: result.active,
            }),
         )
      }
   }

   async update(guid: string, purchase: Partial<PurchaseUpdate>): Promise<Result<Purchase, PurchaseNotFoundException>> {
      const repo = DataBaseBootstrap.dataSource.getRepository(PurchaseEntity)

      const purchaseFound = await repo.findOne({ where: { guid } })

      if (purchaseFound) {
         Object.assign(purchaseFound, purchase)
         const purchaseEntity = await repo.save(purchaseFound)

         return ok(
            new Purchase({
               guid: purchaseEntity.guid,
               customerId: purchaseEntity.customerId,
               paymentMethod: purchaseEntity.paymentMethod,
               status: purchaseEntity.status,
               active: purchaseEntity.active,
            }),
         )
      } else {
         return err(new PurchaseNotFoundException())
      }
   }

   async delete(guid: string): Promise<Result<Purchase, PurchaseNotFoundException>> {
      const repo = DataBaseBootstrap.dataSource.getRepository(PurchaseEntity)

      const purchaseFound = await repo.findOne({ where: { guid } })

      if (purchaseFound) {
         purchaseFound.active = false
         const purchaseEntity = await repo.save(purchaseFound)

         return ok(
            new Purchase({
               guid: purchaseEntity.guid,
               customerId: purchaseEntity.customerId,
               paymentMethod: purchaseEntity.paymentMethod,
               status: purchaseEntity.status,
               active: purchaseEntity.active,
            }),
         )
      } else {
         return err(new PurchaseNotFoundException())
      }
   }
}
