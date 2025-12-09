export interface PaypalActions {
  order: {
    create: (data: unknown) => Promise<string>;
    capture: () => Promise<OrderResponse>;
  };
}

export interface OrderResponse {
  id: string;
  payer: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
  };
  purchase_units: Array<{
    amount: {
      value: string;
      currency_code: string;
    };
  }>;
}

export interface PaypalButtonsInstance {
  createOrder: (data: unknown, actions: PaypalActions) => Promise<string>;
  onApprove: (data: unknown, actions: PaypalActions) => Promise<void>;
  onError?: (err: unknown) => void;
  style?: {
    layout?: string;
    color?: string;
    shape?: string;
    label?: string;
  };
}
