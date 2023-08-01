import { validate as uuidValidate } from 'uuid'
import { ValueObject } from './vo.class'
import { CustomerGuidInvalidException } from '../exceptions/customer.exception'
import { err, ok, Result } from 'neverthrow'

interface GuidProps {
   value: string
}

type GuidResult = Result<GuidVO, CustomerGuidInvalidException>

export class GuidVO extends ValueObject<GuidProps> {
   private constructor(props: GuidProps) {
      super(props)
   }

   static create(guid: string): GuidResult {
      if (!uuidValidate(guid)) {
         return err(new CustomerGuidInvalidException())
      }

      return ok(new GuidVO({ value: guid }))
   }

   get value(): string {
      return this.props.value
   }
}
