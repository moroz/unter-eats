export interface PaymentIntent {
  __typename: "PaymentIntent";
  clientSecret: string;
  stripeId: string;
  id: string;
}
