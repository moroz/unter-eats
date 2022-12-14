import { PaymentIntent } from "./payments";

export interface LineItemParams {
  productId: string;
  quantity: number;
}

export enum DeliveryType {
  Delivery = "DELIVERY",
  Pickup = "PICKUP"
}

export interface OrderParams {
  email: string;
  phoneNo: string;
  firstName: string;
  deliveryType: DeliveryType;
  shippingAddress: string;
  lineItems: LineItemParams[];
  lastName?: string | null;
  remarks?: string | null;
  metadata?: string | null;
}

export interface LineItem {
  productId: string;
  quantity: number;
}

export interface Order {
  __typename: "Order";
  email: string;
  phoneNo: string;
  firstName: string;
  deliveryType: DeliveryType;
  shippingAddress: string;
  lineItems: LineItem[];
  lastName?: string | null;
  remarks?: string | null;
  paymentIntent: PaymentIntent;
}
