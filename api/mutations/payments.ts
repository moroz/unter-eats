import { gql, useMutation } from "@apollo/client";
import { PaymentIntent } from "@interfaces";

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($amount: Int!) {
    result: createPaymentIntent(amount: $amount) {
      clientSecret
    }
  }
`;

export interface CreatePaymentIntentMutationResult {
  result: PaymentIntent;
}

export interface CreatePaymentIntentMutationVariables {
  amount: number;
}

export const useCreatePaymentIntentMutation = () =>
  useMutation<
    CreatePaymentIntentMutationResult,
    CreatePaymentIntentMutationVariables
  >(CREATE_PAYMENT_INTENT);
