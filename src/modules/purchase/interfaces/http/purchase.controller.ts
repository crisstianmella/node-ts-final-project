import { NextFunction, Request, Response } from 'express'
import { IError } from '../helpers/ierror'
import PurchaseFactory from '../../domain/purchase-factory'
import PurchaseApplication from '../../application/purchase.application'
import { GuidVO } from '../../domain/value-objects/guid.vo'
import { PurchaseInsertMapping } from './dto/purchase-insert.dto'
import { PurchaseListMapping } from './dto/purchase-list.dto'
import { PurchaseListOneMapping } from './dto/purchase-list-one.dto'
import { PurchaseUpdateMapping } from './dto/purchase-update.dto'
import { PurchaseDeleteMapping } from './dto/purchase-delete.dto'

export default class {
   //Anonymous class
   //Design Patterns: : Dependency injection
   constructor(private application: PurchaseApplication) {
      //Design Patterns: : Mediator
      this.insert = this.insert.bind(this)
      this.list = this.list.bind(this)
      this.listOne = this.listOne.bind(this)
      this.update = this.update.bind(this)
      this.delete = this.delete.bind(this)
   }

   async insert(req: Request, res: Response, next: NextFunction) {
      const { customerId, paymentMethod } = req.body

      const userResult = await new PurchaseFactory().create(customerId, paymentMethod)

      if (userResult.isErr()) {
         const err: IError = new Error(userResult.error.message)
         err.status = 400
         return next(err)
      } else {
         const data = await this.application.insert(userResult.value)
         const result = new PurchaseInsertMapping().execute(data.properties())
         res.status(201).json(result)
      }
   }

   async list(_req: Request, res: Response) {
      const list = await this.application.list()
      const result = new PurchaseListMapping().execute(list.map(purchase => purchase.properties()))
      res.json(result)
   }

   async listOne(req: Request, res: Response, next: NextFunction) {
      const { guid } = req.params

      const guidResult = GuidVO.create(guid)
      if (guidResult.isErr()) {
         const err: IError = new Error(guidResult.error.message)
         err.status = 400
         return next(err)
      }

      const purchaseResult = await this.application.listOne(guid)

      if (purchaseResult.isErr()) {
         return res.status(404).send(purchaseResult.error.message)
      } else if (purchaseResult.isOk()) {
         const result = new PurchaseListOneMapping().execute(purchaseResult.value.properties())
         return res.json(result)
      }
   }

   async update(req: Request, res: Response, next: NextFunction) {
      const { guid } = req.params
      const fieldsToUpdate = req.body

      const guidResult = GuidVO.create(guid)
      if (guidResult.isErr()) {
         const err: IError = new Error(guidResult.error.message)
         err.status = 400
         return next(err)
      }

      const dataResult = await this.application.update(guid, fieldsToUpdate)
      if (dataResult.isErr()) {
         const err: IError = new Error(dataResult.error.message)
         err.status = 404
         return next(err)
      } else {
         const result = new PurchaseUpdateMapping().execute(dataResult.value.properties())
         res.json(result)
      }
   }

   async delete(req: Request, res: Response, next: NextFunction) {
      const { guid } = req.params

      const guidResult = GuidVO.create(guid)
      if (guidResult.isErr()) {
         const err: IError = new Error(guidResult.error.message)
         err.status = 400
         return next(err)
      }

      const dataResult = await this.application.delete(guid)
      if (dataResult.isErr()) {
         const err: IError = new Error(dataResult.error.message)
         err.status = 404
         return next(err)
      } else {
         const result = new PurchaseDeleteMapping().execute(dataResult.value.properties())
         res.json(result)
      }
   }
}
