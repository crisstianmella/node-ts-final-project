import { NextFunction, Request, Response } from 'express'
import { IError } from '../helpers/ierror'
import CustomerFactory from '../../domain/customer-factory'
import CustomerApplication from '../../application/customer.application'
import { GuidVO } from '../../domain/value-objects/guid.vo'
import { CustomerInsertMapping } from './dto/customer-insert.dto'
import { CustomerListMapping } from './dto/customer-list.dto'
import { CustomerListOneMapping } from './dto/customer-list-one.dto'
import { CustomerUpdateMapping } from './dto/customer-update.dto'
import { CustomerDeleteMapping } from './dto/customer-delete.dto'

export default class {
   //Anonymous class
   //Design Patterns: : Dependency injection
   constructor(private application: CustomerApplication) {
      //Design Patterns: : Mediator
      this.insert = this.insert.bind(this)
      this.list = this.list.bind(this)
      this.listOne = this.listOne.bind(this)
      this.update = this.update.bind(this)
      this.delete = this.delete.bind(this)
   }

   async insert(req: Request, res: Response, next: NextFunction) {
      const { address, dni, userId } = req.body

      const userResult = await new CustomerFactory().create(address, dni, userId)

      if (userResult.isErr()) {
         const err: IError = new Error(userResult.error.message)
         err.status = 400
         return next(err)
      } else {
         console.log(userResult.value)
         const data = await this.application.insert(userResult.value)
         const result = new CustomerInsertMapping().execute(data.properties())
         res.status(201).json(result)
      }
   }

   async list(_req: Request, res: Response) {
      const list = await this.application.list()
      const result = new CustomerListMapping().execute(list.map(customer => customer.properties()))
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

      const customerResult = await this.application.listOne(guid)

      if (customerResult.isErr()) {
         return res.status(404).send(customerResult.error.message)
      } else if (customerResult.isOk()) {
         const result = new CustomerListOneMapping().execute(customerResult.value.properties())
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
         const result = new CustomerUpdateMapping().execute(dataResult.value.properties())
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
         const result = new CustomerDeleteMapping().execute(dataResult.value.properties())
         res.json(result)
      }
   }
}
