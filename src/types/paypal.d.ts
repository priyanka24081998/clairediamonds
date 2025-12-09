export interface PaypalActions {
  order: {
    create: (order: { purchase_units: { amount: { value: string } }[] }) => Promise<string>;
    capture: () => Promise<OrderResponse>;
  };
}

export interface PaypalButtonsInstance {
  createOrder: (data: unknown, actions: PaypalActions) => Promise<string>;
  onApprove: (data: unknown, actions: PaypalActions) => Promise<void>;
  onError?: (err: unknown) => void;
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
  status: string;
}
