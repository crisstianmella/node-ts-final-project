import { Result } from 'neverthrow'
import { PurchaseNotFoundException } from './exceptions/purchase.exception'
import Purchase from './purchase'
import { PurchaseUpdate } from './interfaces/purchaseUpdate'

// Principio Solid: Inversion Dependency
// Design Pattern: Facade
export interface PurchaseRepository {
   insert(purchase: Purchase): Promise<Purchase>
   list(): Promise<Purchase[]>
   listOne(guid: string): Promise<Result<Purchase, PurchaseNotFoundException>>
   update(guid: string, purchase: Partial<PurchaseUpdate>): Promise<Result<Purchase, PurchaseNotFoundException>>
   delete(guid: string): Promise<Result<Purchase, PurchaseNotFoundException>>
}
