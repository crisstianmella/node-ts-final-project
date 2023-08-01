import { DomainException } from './domain.exception'
import { DomainExceptionCode } from '../enums/domainException.enum'

export class CustomerUserIdRequiredException extends DomainException {
   constructor() {
      super(CustomerUserIdRequiredException.getMessage())
      this.name = DomainExceptionCode.CUSTOMER_USER_ID_REQUIRED
   }

   static getMessage() {
      return 'User ID is required'
   }
}

export class CustomerAddressRequiredException extends DomainException {
   constructor() {
      super(CustomerAddressRequiredException.getMessage())
      this.name = DomainExceptionCode.CUSTOMER_ADDRESS_REQUIRED
   }

   static getMessage() {
      return 'Address is required'
   }
}

export class CustomerDniRequiredException extends DomainException {
   constructor() {
      super(CustomerDniRequiredException.getMessage())
      this.name = DomainExceptionCode.CUSTOMER_DNI_REQUIRED
   }

   static getMessage() {
      return 'DNI is required'
   }
}

export class CustomerGuidInvalidException extends DomainException {
   constructor() {
      super(CustomerGuidInvalidException.getMessage())
      this.name = DomainExceptionCode.CUSTOMER_GUID_INVALID
   }

   static getMessage() {
      return 'Guid is invalid'
   }
}

export class CustomerNotFoundException extends DomainException {
   constructor() {
      super(CustomerNotFoundException.getMessage())
      this.name = DomainExceptionCode.CUSTOMER_NOT_FOUND
   }

   static getMessage() {
      return 'Customer not found'
   }
}
