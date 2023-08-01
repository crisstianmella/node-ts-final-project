import { DomainExceptionCode } from '../enums/domainException.enum'

// Design Pattern: Singleton
export abstract class DomainException extends Error {
   constructor(message?: string) {
      super(message)
      this.name = DomainExceptionCode.DEFAULT_DOMAIN_EXCEPTION
   }
}
