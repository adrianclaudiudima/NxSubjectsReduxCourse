export interface CartCheckoutModel {
  subtotal: number;
  serviceCharge: number;
  serviceChargePercentage: number;
  vatRate: number;
  vatRatePercentage: number;
  total: number;
}

export interface CartCheckoutPaymentFeeModel extends CartCheckoutModel {
  paymentFee: number;
}
