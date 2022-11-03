import { gql, useMutation } from "@apollo/client";
import { MutationResult, Order, OrderParams } from "@interfaces";

export const CREATE_ORDER = gql`
  mutation CreateOrder($params: OrderParams!) {
    result: createOrder(params: $params) {
      success
      errors {
        key
        message
      }
      data {
        id
        grandTotal
        email
        paymentIntent {
          orderId
          stripeId
          clientSecret
        }
      }
    }
  }
`;

export interface CreateOrderMutationResult {
  result: MutationResult<Order>;
}

export interface CreateOrderMutationVariables {
  params: OrderParams;
}

export const useCreateOrderMutation = () =>
  useMutation<CreateOrderMutationResult, CreateOrderMutationVariables>(
    CREATE_ORDER
  );
