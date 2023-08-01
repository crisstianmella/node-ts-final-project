import { validate as uuidValidate } from 'uuid'
import { ValueObject } from './vo.class'
import { PurchaseGuidInvalidException } from '../exceptions/purchase.exception'
import { err, ok, Result } from 'neverthrow'

interface GuidProps {
   value: string
}

type GuidResult = Result<GuidVO, PurchaseGuidInvalidException>

export class GuidVO extends ValueObject<GuidProps> {
   private constructor(props: GuidProps) {
      super(props)
   }

   static create(guid: string): GuidResult {
      if (!uuidValidate(guid)) {
         return err(new PurchaseGuidInvalidException())
      }

      return ok(new GuidVO({ value: guid }))
   }

   get value(): string {
      return this.props.value
   }
}
