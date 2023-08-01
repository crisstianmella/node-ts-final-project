import { PurchaseRepository } from '../domain/purchase.repository'
import { PurchaseUpdate } from '../domain/interfaces/purchaseUpdate'
import Purchase from '../domain/purchase'

export default class PurchaseApplication {
   // Principio SOLID: Dependency inversion
   // Design Pattern: Dependency Injection
   constructor(private readonly purchaseRepository: PurchaseRepository) {}

   insert(purchase: Purchase) {
      return this.purchaseRepository.insert(purchase)
   }

   list() {
      return this.purchaseRepository.list()
   }

   listOne(guid: string) {
      return this.purchaseRepository.listOne(guid)
   }

   update(guid: string, purchase: Partial<PurchaseUpdate>) {
      return this.purchaseRepository.update(guid, purchase)
   }

   delete(guid: string) {
      return this.purchaseRepository.delete(guid)
   }
}
