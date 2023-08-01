import { DomainException } from './domain.exception'
import { DomainExceptionCode } from '../enums/domainException.enum'

export class PurchaseCustomerIdRequiredException extends DomainException {
   constructor() {
      super(PurchaseCustomerIdRequiredException.getMessage())
      this.name = DomainExceptionCode.PURCHASE_CUSTOMER_ID_REQUIRED
   }

   static getMessage() {
      return 'Customer ID is required'
   }
}

export class PurchasePaymentMethodRequiredException extends DomainException {
   constructor() {
      super(PurchasePaymentMethodRequiredException.getMessage())
      this.name = DomainExceptionCode.PURCHASE_PAYMENT_METHOD_REQUIRED
   }

   static getMessage() {
      return 'Payment Method is required'
   }
}

export class PurchaseCustomerIdInvalidException extends DomainException {
   constructor() {
      super(PurchaseCustomerIdInvalidException.getMessage())
      this.name = DomainExceptionCode.PURCHASE_CUSTOMER_ID_INVALID
   }

   static getMessage() {
      return 'Customer ID is invalid'
   }
}

export class PurchaseCustomerIdNotFoundException extends DomainException {
   constructor() {
      super(PurchaseCustomerIdNotFoundException.getMessage())
      this.name = DomainExceptionCode.PURCHASE_CUSTOMER_NOT_FOUND
   }

   static getMessage() {
      return 'Customer not found'
   }
}

export class PurchasePaymentMethodInvalidException extends DomainException {
   constructor() {
      super(PurchasePaymentMethodInvalidException.getMessage())
      this.name = DomainExceptionCode.PURCHASE_PAYMENT_METHOD_INVALID
   }

   static getMessage() {
      return 'Payment method is invalid'
   }
}

export class PurchaseGuidInvalidException extends DomainException {
   constructor() {
      super(PurchaseGuidInvalidException.getMessage())
      this.name = DomainExceptionCode.PURCHASE_GUID_INVALID
   }

   static getMessage() {
      return 'Guid is invalid'
   }
}

export class PurchaseNotFoundException extends DomainException {
   constructor() {
      super(PurchaseNotFoundException.getMessage())
      this.name = DomainExceptionCode.PURCHASE_NOT_FOUND
   }

   static getMessage() {
      return 'Purchase not found'
   }
}
